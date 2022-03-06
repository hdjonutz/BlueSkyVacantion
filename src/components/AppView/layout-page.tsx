import React from 'react';
import LayoutPage from '../ui/layout/page-layout';
// import NavigationTiles from '../ui/navigation/navigation-tiles';

const Layout: React.FunctionComponent <{}> = (props: any) => { //React.StatelessComponent
    return (
        <LayoutPage
            footer={props.footer}
            header={props.header}
            children={props.children}>
        </LayoutPage>
    );
};

export default Layout;
