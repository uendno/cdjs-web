import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from '../reducers';

const configureStore = () => {

    const middlewares = [thunk, promise];


    if (process.env.NODE_ENV !== 'production') {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        return createStore(
            reducers,
            composeEnhancers(applyMiddleware(...middlewares))
        );
    } else {
        return createStore(
            reducers,
            applyMiddleware(...middlewares)
        );
    }

};

export default configureStore;
