import * as React from 'react'
import style from './navigation-tiles.less';
import {RoutesService} from '../../../services/routes_service';
import MenuTile from '../../ui/navigation/menu-tile';
import {RouteComponentProps, withRouter} from 'react-router';
import {MenuEntry, MenuGroup} from './../../../../routes';

interface NavigationTilesProps {
    groupPath?: string;
    routes: ReadonlyArray<MenuGroup>;
}

interface NavigationTilesState {
    menuEntries?: ReadonlyArray<MenuEntry>;
}

class NavigationTiles extends React.Component<RouteComponentProps<{}> & NavigationTilesProps, NavigationTilesState> {
    private menuRoutesSubscription: Subscription;

    private routesService = new RoutesService();
    // @lazyInject(RoutesService) private routesService: RoutesService;

    state: NavigationTilesState = {};

    componentDidMount() {
        const menuEntries = this.routesService
            .filterMenuRoutes(this.props.routes)
            .map((menuRoutes) => {
                if (this.props.groupPath == null) {
                    return menuRoutes.groups;
                } else {
                    const group = menuRoutes.groups.find((g) => g.path === this.props.groupPath)
                    return group ? group.items : [];
                }
            })
            .map((menuEntries: ReadonlyArray<MenuEntry>) => menuEntries.filter((m) => m.path !== this.props.match.path))
            this.setState({menuEntries});
    }

    componentWillUnmount() {
        this.menuRoutesSubscription.unsubscribe();
    }

    render() {
        return (
            <div className={style.entries}>
                {this.state.menuEntries && this.state.menuEntries
                    .map((i) => <MenuTile key={i.path} entry={i}/>)}
            </div>
        );
    }
}

export default withRouter<NavigationTilesProps>(NavigationTiles);
