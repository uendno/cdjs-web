import {createStore, applyMiddleware, compose} from 'redux';
import promise from 'redux-promise';
import reducers from '../reducers';
import {showError} from '../helpers/alert';

const wrappedThunk = ({dispatch, getState}) => next => async (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  } else if (typeof action === 'object' && typeof action.func === 'function') {
    try {
      const identity = action.identity;

      dispatch({
        type: action.type,
        identity,
      });

      const data = await action.func(dispatch, getState) || {};

      dispatch({
        type: `${action.type}_COMPLETE`,
        data,
        identity,
      });

      return data;
    } catch (error) {
      console.error(error);

      showError('Oops!', error.response ? error.response.message : error.message);

      if (error.response && error.statusCode === 401) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }

      return dispatch({
        type: `${action.type}_ERROR`,
        message: error.message,
      });
    }
  }

  return next(action);
};


const configureStore = () => {
  const middlewares = [wrappedThunk, promise];

  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
      reducers,
      composeEnhancers(applyMiddleware(...middlewares))
    );
  }
  return createStore(
    reducers,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
