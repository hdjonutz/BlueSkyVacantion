import {MenuGroup, MenuItem} from '../../components/pages/ui/navigation/routes';

export class MenuRoutes {
    constructor(public readonly groups: ReadonlyArray<MenuGroup>,
                public readonly unlicensedItems?: ReadonlyArray<MenuItem>,
                public readonly permissionDeniedItems?: ReadonlyArray<MenuItem>) {}
}
export class RoutesService {
    constructor() {}
    filterMenuRoutes(routes: ReadonlyArray<MenuGroup>): any {
        const unlicensedItems = new Array<MenuItem>();
        const permissionDeniedItems = new Array<MenuItem>();

        const gruppen = routes.map((gruppe) =>
            Object.assign({}, gruppe, {items: gruppe.items.filter((i) => {
                return true;
            })})).filter((gruppe) => gruppe.items.length > 0);

        return new MenuRoutes(gruppen, unlicensedItems, permissionDeniedItems);
    }
}
