import * as React from 'react';
import ContainerPage from './Container';
import Layout from '../../AppView/layout-page';

// export default class  extends React.Component<{}, {}> {
//     constructor(props: any) {
//         super(props);
//
//         this.state = {};
//     }
//
//     render() {
//         debugger;
//         return (
//             <Layout>
//                 <ContainerPage />
//             </Layout>
//         )
//     }
// }

const ProductsPage = (props) => {
    return (
        <Layout>
            <ContainerPage {...props} />
        </Layout>
    )
}
export default ProductsPage;

