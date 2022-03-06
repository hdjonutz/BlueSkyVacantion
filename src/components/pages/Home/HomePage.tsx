import * as React from 'react';
import ContainerPage from './Container';
import Layout from '../../AppView/layout-page';


const HomePage = (props) => {
    return (
        <Layout>
            <ContainerPage {...props} />
        </Layout>
    )
}
export default HomePage;


