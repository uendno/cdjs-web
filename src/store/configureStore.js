import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise';
import reducers from '../reducers';

const configureStore = () => {

    const middlewares = [thunk, promise];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }


    return createStore(
        reducers,
        applyMiddleware(...middlewares)
    );
};

export default configureStore;
