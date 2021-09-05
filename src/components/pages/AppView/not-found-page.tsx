import * as React from 'react';
import {RouteComponentProps, Link} from 'react-router-dom';
// import PageLayout from '../ui/layout/page-layout';
// import {missingI18n} from '../../../i18n/i18n';
// import ErrorDisplay from '../ui/utils/error-display';

/**
 * Default page that is displayed if no route was found for a given url
 * @param props
 * @return {any}
 * @constructor
 */
const NotFoundPage: React.StatelessComponent<RouteComponentProps<{}>> = (props: RouteComponentProps<{}>) => {
    return (
        <div>Page not found</div>
    );
};

export default NotFoundPage;
