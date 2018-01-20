import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css';
import './index.css';
import App from './components/App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import {createWS} from './helpers/socket';
import 'moment-duration-format';
import {getAccessToken} from './reducers';
import * as graphQLHelper from './helpers/graphql';

const store = configureStore();
const accessToken = getAccessToken(store.getState());
graphQLHelper.createClient(accessToken);

createWS(store.dispatch, store.getState);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
