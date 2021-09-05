/**
 * Extract data props from props (all props starting with "data-"
 * @param props
 * @return {Partial<T>}
 */
export function extractDataProps<T>(props: T): Partial<T> {
    const dataProps: Partial<T> = {};

    Object
        .keys(props)
        .filter((key) => key.startsWith('data-'))
        .forEach((key: keyof T) => dataProps[key] = props[key]);

    return dataProps;
}
