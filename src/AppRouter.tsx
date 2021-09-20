
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
import './AppRouter.less';
import {HashRouter} from 'react-router-dom';
import routes from './routes';
import AppView from "./components/pages/AppView/app-view";

class AppRouter extends React.Component {

    render() {
        // return (
        //     <Provider container={container}>
        //         <Layout>
        //             <Route exact path='/' component={Home} />
        //             <Route path='/page1' component={Page_one} />
        //             <Route path='/page2' component={Page_two} />
        //             <Route path='/page3' component={Page_three} />
        //         </Layout>
        //     </Provider>
        //     )
        return (
            <React.Fragment>
                {/* !this.state.isAuthenticated && <LoginView /> */}
                <HashRouter getUserConfirmation={this.getUserConfirmation as any}>
                    {/*(this.state.isAuthenticated || this.state.wasAuthenticated)*/ true && <AppView routes={routes} />}
                </HashRouter>
            </React.Fragment>
        );
    }
    private getUserConfirmation(message: string, callback: (allowTransition: boolean) => void): void {
        const onConfirm = () => callback(true);
        const onCancel = () => callback(false);
        callback(true);


        /* showComponentAsDialog((onAfterClose) => (
            <ConfirmDialog
                onAfterClose={onAfterClose}
                onConfirm={onConfirm}
                onCancel={onCancel}
                text={message}
            />
        )); */
    }
}

export default AppRouter;
