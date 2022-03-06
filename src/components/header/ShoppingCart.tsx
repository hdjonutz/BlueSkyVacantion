import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../Layout/Theme';

import 'reflect-metadata';
import Button from '@mui/material/Button';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { resolve } from 'inversify-react';

import routes from '../../routes';

export default class ShoppingCartLink extends React.Component<{}, {toShoppingCart: string}> {
    
    private routes: any = routes;
    constructor(props: any) {
        super (props);

        this.state = {
            toShoppingCart: '',
        }
    }

    componentDidMount() {
        if (routes) {
            const items = [].concat.apply([], this.routes.map((r: any) => r.items)) as Array<any>;
            this.setState({
                toShoppingCart: items.find((r) => r.title === 'ShoppingCart').path,
            });
        }
    }

    render () {
        return(
            <Button href={'#' + this.state.toShoppingCart}><ShoppingCart /></Button>
        )
    }
}