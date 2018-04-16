import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css';
import 'react-treeview/react-treeview.css';
import 'moment-duration-format';
import style from './index.css';
import App from './components/App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import {createWS} from './services/socket';

console.log(style);

const store = configureStore();
createWS(store.dispatch, store.getState);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
