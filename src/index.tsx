import './polyfills.ts';
import './rxjs.ts';
import './i18n/locales.ts';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "reflect-metadata";

import * as moment from 'moment';
moment.locale(environment.locale);
import {environment} from './enviroment/enviroment';
import ApplicationVersion from './version';
const info = ApplicationVersion();

import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { Provider } from "inversify-react";
import { container } from "./inversify.config";

import AppRouter from './AppRouter';

console.log(`%c🛳 BlueSkyVacantion %c\n name: ${info.name} \n version: ${info.id} \n date: ${info.build} \n branch: ${info.branch} %c\n Copyright © Daniel-Ionut Hariga`,
    'font-size: 40px; color: #2196f3; font-family: "Segoe UI Symbol";',
    'font-size: 16px; color: #ab0000; font-family: "Segoe UI Symbol";',
    'font-size: 16px; color: #000; font-family: "Segoe UI Symbol";',);

import {AppContainer} from 'react-hot-loader';

const App = () => (
    <Provider container={container}>
        <AppContainer>
            <AppRouter />
        </AppContainer>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
