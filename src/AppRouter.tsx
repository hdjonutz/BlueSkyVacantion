import 'reflect-metadata';
import * as React from 'react';
import './AppRouter.less';
import {HashRouter} from 'react-router-dom';
import routes from './routes';
import AppView from "./components/pages/AppView/app-view";

class AppRouter extends React.Component {

    render() {
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
