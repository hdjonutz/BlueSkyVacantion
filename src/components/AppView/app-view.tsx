import * as React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import style from './app-view.less';
import {i18n, missingI18n} from '../../i18n/i18n';
import NotFoundPage from './not-found-page';
import {NavLink, Link} from 'react-router-dom';
import classNames from 'classnames';
import {ChildRoute, MenuGroup} from '../../components/ui/navigation/routes';
import {MenuRoutes, RoutesService} from '../services/routes_service';
import FrontPage from '../pages/Front/FrontPage';
import HomePage from '../pages/Home/HomePage';
import Button from '@mui/material/Button';

interface AppViewProps {
    routes: ReadonlyArray<MenuGroup>;
}

interface AppViewState {
    // isSlave: boolean;
    // hasSlave: boolean;
    // isDocked: boolean;
    // isOpen: boolean;
    // selectedTab: number;
    // activeGroup: number;
    // interactionCount: number;
    menuRoutes: MenuRoutes;
}

export default class AppView extends React.Component<AppViewProps, AppViewState> {
    private routesService = new RoutesService();

    constructor(props: AppViewProps) {
        super(props);
        this.state = {
            menuRoutes: null,
        };
    }

    componentDidMount() {
        const menuRoutes = this.routesService.filterMenuRoutes(this.props.routes);
        this.setState({menuRoutes});
    }

    componentWillUnmount() {
    }

    renderGroups(groups: ReadonlyArray<MenuGroup>): ReadonlyArray<any> {
        return groups.map((g) => g.items.map((item: any) =>
                <NavLink className={classNames(style.link, item.display_btn === false ? style.hide : '')}
                         activeClassName={style.activeRoute}
                         to={item.path}>
                             <Button component={Link} to={item.path} variant="contained" color="primary">
                                {item.title}{item.titleI18n}
                             </Button>
                         </NavLink>
            )
        );
    }


    renderRoutes(groups: ReadonlyArray<MenuGroup>): Array<React.ReactElement<any>> {
        const routes = new Array<React.ReactElement<any>>();

        groups.forEach((g) => {
            routes.push(
                <Route
                    key={g.path}
                    exact
                    path={g.path}
                    render={(() => <Redirect to={g.defaultPath} />)}
                />
            );

            g.items.forEach((i) => {
                if (i.children) {
                    i.children.forEach((c) => routes.push(this.renderRoute(c)));
                }

                routes.push(this.renderRoute(i));
            });
        });
        return routes;
    }

    renderRoute(route: ChildRoute): React.ReactElement<any> {
        if (route.component) {
            return (
                <Route
                    key={route.path}
                    strict={route.strict}
                    path={route.path}
                    component={route.component}
                />
            );
        } else {
            return (
                <Route
                    key={route.path}
                    strict={route.strict}
                    path={route.path}
                    render={route.render}
                />
            );
        }
    }

    render(): React.ReactNode {
        const gruppen   = this.state.menuRoutes ? this.state.menuRoutes.groups : [];
        const paths 	= [].concat.apply([], this.props.routes.map((m) => m.items.map((p) => p.path)));
        const foundPath = paths.indexOf(location.hash.replace('#', '').replace('/', '')) >= 0;
        const notFound 	= !foundPath && location.hash.replace('#', '').replace('/', '') !== '';

        return (
            <React.Fragment>
                <div className={style.layout}>
                    <div style={{position: 'absolute', top:'200px', zIndex: 999}}>{this.renderGroups(gruppen)}</div>
                    <div className={style.main}>
                        {this.state.menuRoutes && <Switch>
                            {this.renderRoutes(this.state.menuRoutes.groups)}
                            {notFound && <Route component={NotFoundPage} />}
                            {!notFound && <Route component={HomePage} /> }
                        </Switch>}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private onLogout(): void {
        this.authenticationService
            .logout()
            .subscribe((success) => console.log('Logout', success));
    }
}
