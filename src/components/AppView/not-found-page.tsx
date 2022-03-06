import * as React from 'react';
import {RouteComponentProps, Link, NavLink} from 'react-router-dom';
import classNames from 'classnames';
import {MDBBtn} from 'mdb-react-ui-kit';
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
        <div style={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 0,
            minHeight: 0,
            verticalAlign: 'middle',
            flex: 1,
            background: '#E5EAF1',
            background: 'linear-gradient(50deg, #b9cce2 0%, #FAFCFF 50%, #b9cce2 100%)'
        }}>
            <div style={{position: 'relative'}}>
                <img style={{margin: '0 auto', width: '1080px' }} src={'assets/images/page_not_found.svg'} />

                <div style={{position: 'absolute', right: '41%', top: '60%'}}>
                    <NavLink to={'/online/home'}>
                        <MDBBtn outline className='mx-2' color='primary'>Home</MDBBtn>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
