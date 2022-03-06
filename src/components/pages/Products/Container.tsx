import * as React from 'react';
import style from './admin.less';
import {NavLink} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import routes from '../../../routes';
import {Observable} from 'rxjs';
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

interface IContainerPageState {
    isHome:     boolean;
    isProducts: boolean;
    isProduct:  number;
    path:       string;
}

export default class ContainerPage extends React.Component<{}, IContainerPageState> {

    constructor(props: any) {
        super(props);

        const isHome = this.props.match.path === '/';
        const notProductDetail = !isHome
            && this.props.match.params
            && this.props.match.params.products === 'products'
            && this.props.match.isExact;
        const path = this.props.location.pathname;  // /online/home/products/423232
        const isProduct = !notProductDetail ? this.getProduct(path) : 0;

        this.state = {
            isHome:     isHome,
            isProducts: notProductDetail,
            isProduct:  +isProduct,
            path:       this.props.location.pathname,
        };
    }

    getProduct(path: string): string {
        const regex = /^([\D]online[\D]home[\D]products[\D])([0-9]*)$/;
        const found = path.match(regex);
        return found ? found[2] : '0';
    }

    shouldComponentUpdate(nextProps, nextState) {
        const isHome = this.props.match.path === '/';
        const notProductDetail = !isHome
            && nextProps.match.params
            && nextProps.match.params.products === 'products'
            && nextProps.match.isExact;
        const path = nextProps.location.pathname;  // /online/home/products/423232
        const isProduct = !notProductDetail ? this.getProduct(path) : 0;

        if (this.state.path !== nextProps.location.pathname) {
            this.setState({path: nextProps.location.pathname, isProduct});
            console.log("products container return true");
            return true;
        } else {
            console.log("products container return false");
            return false;
        }
    }

    render() {
        return (
            <Container maxWidth='xl' style={{maxWidth: '100%', paddingLeft: 0, paddingRight: 0}}>
                {/* <CssBaseline /> */}
                <Box sx={{ marginTop: 9}} style={{marginTop: '93px'}}>
                    <SliderComponent {...this.props} {...this.state} />
                    {!this.state.isProduct
                        ? <ListProductsPage {...this.props} />
                        : <ProductDetails {...this.props} {...this.state} />
                    }
                </Box>
            </Container>
        )
    }
}
