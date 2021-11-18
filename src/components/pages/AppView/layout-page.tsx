import * as React from 'react';
import routes from '../../../routes';
import PageLayout from '../ui/layout/page-layout';
import {missingI18n} from '../../../i18n/i18n';
import NavigationTiles from '../ui/navigation/navigation-tiles';

const LayoutPage: React.StatelessComponent<{}> = (props: {}) => {
    return (
        <PageLayout title='INTERAUTOMATION InLine Web'></PageLayout>
    );
};

export default LayoutPage;
