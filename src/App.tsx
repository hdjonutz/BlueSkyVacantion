
import 'reflect-metadata';
import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Page_one from './components/pages/page_one/page_one';
import Page_two from "./components/pages/page_two/page_two";
import Page_three from "./components/pages/page_three/page_three";

import { Provider } from 'inversify-react';
import { container } from './inversify.config';
import './App.less';


export default () => (
    <Provider container={container}>
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/page1' component={Page_one} />
            <Route path='/page2' component={Page_two} />
            <Route path='/page3' component={Page_three} />
        </Layout>
    </Provider>
);
