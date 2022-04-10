export function getProduct(path: string): string {
    const regex = /^([\D]online[\D]home[\D]products[\D])([a-zA-Z0-9]*)$/;
    const found = path.match(regex);
    return found ? found[2] : null as any;
}

export function getProductId(props, nextProps, state): {[key: string]: any} {

    console.log(props, nextProps, state);


    const isHome = props.match.path === '/';
    let notProductDetail = null;
    if (nextProps) {
        notProductDetail = !isHome
            && nextProps.match.params
            && nextProps.match.params.products === 'products'
            && nextProps.match.isExact;

        const path = nextProps ? nextProps.location.pathname : props.location.pathname;  // /online/home/products/423232
        const isProduct = !notProductDetail ? getProduct(path) : null;
        return {path: props.location.pathname, isProduct};
    } else {
        const path = props.location.pathname;  // /online/home/products/423232
        const isProduct = getProduct(path);
        console.log('2', isProduct, path);
        return {path: props.location.pathname, isProduct};
    }
}
