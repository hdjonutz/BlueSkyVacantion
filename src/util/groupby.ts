/**
 * Group data props from props
 * @param props
 * @return {Array<Struct<T>>}
 */

export interface Struct<T> {
    key: string;
    items: Array<T>
}

export function groupBy<T>(
    key: string | number,
    items: ReadonlyArray<T>,
    bool?: boolean
): Array<Struct<T>> | {[key: string]: Array<T>}  {
    const arrayGroups: Array<Struct<T>> = [];
    const groups: {[key: string]: Array<T>} = (items || []).reduce((group: {[key: string]: Array<T>}, item: any) => {
        if (Array.isArray(item)) {
            item.forEach((subItem) => {
                const value = subItem[key];
                group[value] = [...group[value] || [], subItem];
            })
        } else {
            const value = item[key];
            group[value] = [...group[value] || [], item];
        }
        return group;
    }, {});

    for (const gr in groups) {
        if (groups.hasOwnProperty(gr)) {
            arrayGroups.push({key: gr, items: groups[gr]})
        }
    }
    return bool ? groups : arrayGroups;
}
