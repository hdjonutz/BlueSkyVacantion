import 'reflect-metadata';
import * as React from 'react';
import './AppRouter.less';
import routes from './routes';
import {HashRouter} from 'react-router-dom';
import AppView from './components/AppView/app-view';

class AppRouter extends React.Component {

    render() {
        return (
            <HashRouter getUserConfirmation={this.getUserConfirmation as any}>
                <AppView routes={routes} />
            </HashRouter>
        );
    }
    private getUserConfirmation(message: string, callback: (allowTransition: boolean) => void): void {
        const onConfirm = () => callback(true);
        const onCancel = () => callback(false);
        callback(true);
    }
}

export default AppRouter;
