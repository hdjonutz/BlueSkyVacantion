import * as React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import style from './app-view.less';
import {i18n, missingI18n} from '../../../i18n/i18n';
import NotFoundPage from './not-found-page';
import HomePage from './home-page';
import {MenuRoutes, RoutesService} from '../../services/routes_service';
import {ChildRoute, MenuGroup, MenuItem} from '../ui/navigation/routes';
import Page_one from "../page_one/page_one";
import Page_two from "../page_two/page_two";
import Page_three from "../page_three/page_three";
import LoginPage from "../login_page/login_page";
import {NavLink} from 'react-router-dom';
import * as classNames from 'classnames';
import { MDBBtn } from 'mdb-react-ui-kit';

interface AppViewProps {
    routes: ReadonlyArray<MenuGroup>;
}

interface AppViewState {
    isSlave: boolean;
    hasSlave: boolean;
    isDocked: boolean;
    isOpen: boolean;
    selectedTab: number;
    activeGroup: number;
    menuRoutes?: MenuRoutes;
    interactionCount: number;
}

export default class AppView extends React.Component<AppViewProps, AppViewState> {
    private routesService = new RoutesService();
    constructor(props: AppViewProps) {
        super(props);

        const isDocked = window.localStorage.getItem('InLine.AppView.IsMenuDocked') == null
            ? false
            : JSON.parse(window.localStorage.getItem('InLine.AppView.IsMenuDocked'));

        this.onOpenChanged = this.onOpenChanged.bind(this);
        this.onDockedChanged = this.onDockedChanged.bind(this);
        this.onSelectTab = this.onSelectTab.bind(this);
        this.onShortcut = this.onShortcut.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onCloseMenu = this.onCloseMenu.bind(this);
        this.onUnselectGroup = this.onUnselectGroup.bind(this);
        this.onOpenSlaveTab = this.onOpenSlaveTab.bind(this);
        this.state = {
            isSlave: false,
            hasSlave: false,
            isDocked,
            isOpen: false,
            selectedTab: 0,
            activeGroup: null,
            interactionCount: 0,
        };
    }

    componentDidMount() {
        const menuRoutes = this.routesService.filterMenuRoutes(this.props.routes);
        this.setState({menuRoutes});

    }

    componentWillUnmount() {
    }

    renderRouteActiveListeners(groups: ReadonlyArray<MenuGroup>): ReadonlyArray<React.ReactElement<any>> {
        return groups.map((g, i) => {
            // TODO: Hier haben wir aktuell noch ein Problem mit einem sich ständig ändernden callback!

            return (
                <RouteActiveListener
                    key={g.path}
                    path={g.path}
                    onActivate={() => this.setState({selectedTab: i + 1, activeGroup: i})}
                />
            );
        });
    }

    renderTabs(groups: ReadonlyArray<MenuGroup>): ReadonlyArray<React.ReactElement<any>> {
        return groups.map((g, i) => {
            if (g.icon) {
                return (
                    <TabbedSidebarButton
                        key={g.path}
                        isActive={this.state.activeGroup === i}
                        title={g.titleI18n ? i18n(g.titleI18n) : g.title}
                        icon={g.icon}
                    />
                );
            } else {
                return (
                    <TabbedSidebarButton
                        key={g.path}
                        isActive={this.state.activeGroup === i}
                        title={g.titleI18n ? i18n(g.titleI18n) : g.title}
                        iconPath={g.iconPath}
                    />
                );
            }
        });
    }

    renderGroups(groups: ReadonlyArray<MenuGroup>): ReadonlyArray<JSX.Element<any>> {
        // debugger;
        return groups.map((g) => g.items.map((item) =>
                <NavLink className={classNames(style.link)}
                         activeClassName={style.activeRoute}
                         to={item.path}>
                             <MDBBtn outline className='mx-2' color='secondary'>
                                {item.title}{item.titleI18n}
                            </MDBBtn>
                         </NavLink>
            )
        );
    }

    renderItems(items: ReadonlyArray<MenuItem>): ReadonlyArray<React.ReactElement<any>> {
        return items.map((i) => {
            if (i.icon) {
                return (
                    <MenuLink
                        key={i.path}
                        icon={i.icon}
                        disabled={i.disabled}
                        path={i.path}
                    >
                        {i.titleI18n ? i18n(i.titleI18n) : i.title}
                    </MenuLink>
                );
            } else {
                return (
                    <MenuLink
                        key={i.path}
                        iconPath={i.iconPath}
                        disabled={i.disabled}
                        path={i.path}
                    >
                        {i.titleI18n ? i18n(i.titleI18n) : i.title}
                    </MenuLink>
                );
            }
        });
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

    renderPermissionDeniedRoutes(routes: ReadonlyArray<MenuItem>): Array<React.ReactElement<any>> {
        return routes.map((route) => (
            <Route
                key={route.path}
                strict={route.strict}
                path={route.path}
                component={PermissionDeniedPage}
            />
        ));
    }

    renderUnlicencedRoutes(routes: ReadonlyArray<MenuItem>): Array<React.ReactElement<any>> {
        return routes.map((route) => (
            <Route
                key={route.path}
                strict={route.strict}
                path={route.path}
                component={NotLicensedPage}
            />
        ));
    }

    renderLogo() {
        return (
            <div>
                <MediaQuery maxHeight={800}>
                    {(matches: boolean) =>
                        <TabbedSidebarLink
                            title={missingI18n('Startseite')}
                            icon='interautomation'
                            iconSize={matches ? 30 : 38}
                            className={style.logo}
                            path='/'
                        />
                    }
                </MediaQuery>
            </div>
        );
    }

    render() {
        const gruppen = this.state.menuRoutes ? this.state.menuRoutes.groups : [];

        return (
            <React.Fragment>
                <div className={style.layout}>
                    <div style={{position: 'absolute', top:'20px', }}>{this.renderGroups(gruppen)}</div>
                    <div className={style.main}>
                        {this.state.menuRoutes && <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route exact path='/page1' component={Page_one} />
                            <Route exact path='/page2' component={Page_two} />
                            <Route exact path='/page3' component={Page_three} />
                            <Route exact path='/login' component={LoginPage} />
                            {/* <Route path='/slave/' component={SlaveHomePage} /> */}

                            {this.renderRoutes(this.state.menuRoutes.groups)}

                            <Route component={NotFoundPage} />
                        </Switch>}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private onSelectTab(index: number): void {
        this.setState({selectedTab: index});
    }

    private onOpenChanged(isOpen: boolean): void {
        this.setState({isOpen});
    }

    private onDockedChanged(isDocked: boolean): void {
        this.setState({isDocked});

        window.localStorage.setItem('InLine.AppView.IsMenuDocked', JSON.stringify(isDocked));
    }

    private onShortcut(action: string): void {
        switch (action) {
            case 'close':
                this.setState({isOpen: false});
                break;
            case 'search':
                this.setState({isOpen: true, selectedTab: 0});
                break;
            case 'konami':
                document.documentElement.classList.remove(style.shake);
                setTimeout(() => document.documentElement.classList.add(style.shake), 0);
                break;
        }
    }

    private onLogout(): void {
        this.authenticationService
            .logout()
            .subscribe((success) => console.log('Logout', success));
    }

    private onOpenSlaveTab(): void {
        this.slaveService.openSlaveTab();
    }

    private onCloseMenu(): void {
        this.setState({isOpen: false});
    }

    private onUnselectGroup(): void {
        this.setState({activeGroup: null});
    }
}
