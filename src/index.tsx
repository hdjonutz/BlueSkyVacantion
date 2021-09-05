import './polyfills.ts';
import './rxjs.ts';
import './i18n/locales.ts';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';

import * as moment from 'moment';
moment.locale(environment.locale);
import {environment} from './enviroment/enviroment';
import ApplicationVersion from './version';
const info = ApplicationVersion();

import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import App from './App';

// Create browser history to use in the Redux store
const baseUrl = window.location.pathname;
const history = createBrowserHistory({
    basename: baseUrl ? baseUrl : '/BlueSkyVacantion/dist/',
});

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

console.log(`%c🛳 BlueSkyVacantion %c\n name: ${info.name} \n version: ${info.id} \n date: ${info.build} \n branch: ${info.branch} %c\n Copyright © Daniel-Ionut Hariga`,
    'font-size: 40px; color: #2196f3; font-family: "Segoe UI Symbol";',
    'font-size: 16px; color: #ab0000; font-family: "Segoe UI Symbol";',
    'font-size: 16px; color: #000; font-family: "Segoe UI Symbol";',);

// ReactDOM.render(
//     <Provider store={store}>
//         <ConnectedRouter history={history}>
//             <App />
//         </ConnectedRouter>
//     </Provider>,
//     document.getElementById('root'));

import {AppContainer} from 'react-hot-loader';

ReactDOM.render(<AppContainer><App /></AppContainer>, document.getElementById('root'));
