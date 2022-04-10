import * as React from 'react';
import style from './admin.less';
import {NavLink} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import routes from '../../../routes';
import {AuthorizedApiService} from '../../../services/authorized_api_service';
import {ApiService} from '../../../services/api_service';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import {Ids} from '../../../formsIds';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import classNames from 'classnames';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../../Layout/Theme';

import FiltersPage from './Filters';
import SliderComponent from '../../slider/SliderComponent';
import ListProductsPage from './ListProducts';
import ProductDetails from '../ProductDetail/ProductDetails'
import {map} from 'rxjs/operators';
import {FormsService} from '../../../services/form_service';
import {combineLatest} from 'rxjs';
import {getProduct, getProductId} from './helpers';

interface IContainerPageState {
    isHome:     boolean;
    isProducts: boolean;
    isProduct:  string;
    path:       string;

    products:   any;
    details:    any;
}

export default class ContainerPage extends React.Component<{}, IContainerPageState> {

    @resolve(FormsService)      private formsService: FormsService;
    @resolve(ApiService)        private apiService: ApiService;

    constructor(props: any) {
        super(props);

        const isHome = this.props.match.path === '/';
        const notProductDetail = !isHome
            && this.props.match.params
            && this.props.match.params.products === 'products'
            && this.props.match.isExact;
        const path = this.props.location.pathname;  // /online/home/products/423232
        const isProduct = !notProductDetail ? getProduct(path) : null;

        this.state = {
            isHome:     isHome,
            isProducts: notProductDetail,
            isProduct:  isProduct as any,
            path:       this.props.location.pathname,

            products: [],
            details: [],
        };
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        combineLatest(
            [this.apiService.get('getFormData', {formid: Ids.PRODUCTS}).pipe(map((res) => res.data || [])),
                this.apiService.get('getFormData', {formid: Ids.PROD_ESENTIAL_DETAILS}).pipe(map((res) => res.data || []))],
        ).subscribe(([products, details]) => {
            this.setState({
                products,
                details
            });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        const isProduct = getProduct(nextProps.location.pathname);
        if (isProduct !== this.state.isProduct || JSON.stringify(nextState) !== JSON.stringify(this.state)) {
            this.setState({path: nextProps.location.pathname, isProduct: isProduct, isProducts: !isProduct});
        }
        return true;
    }

    render() {
        // const products = this.state.isProduct === '0'
        //     ? this.state.products
        //     : this.state.products.filter((f) => f.product_id === this.state.isProduct);

        return (
            <Container maxWidth='xl' style={{maxWidth: '100%', paddingLeft: 0, paddingRight: 0}}>
                {/* <CssBaseline /> */}
                <Box sx={{ marginTop: 9}} style={{marginTop: '93px'}}>
                    <SliderComponent {...this.props} {...this.state} />
                    {this.state.isProduct
                        ? <ProductDetails {...this.props} />
                        : <ListProductsPage {...this.props} {...this.state} />
                    }
                </Box>
            </Container>
        )
    }
}
