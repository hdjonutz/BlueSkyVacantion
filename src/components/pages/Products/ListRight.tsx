import * as React from 'react';

import 'reflect-metadata';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import style from './listRight.less';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

import CardPage from './Card';
import CardAbout from './CardAbout';
import CardLastOffer from './../common/CardLastOffer';
import CardPartnerSay from './CardPartnerSay';
import {chunkArrayInGroups} from '../../../util/helpers';

interface IListRightProps {
    details?: any;
    products?: any;
}
interface IListRightStates {
    productsDetails: any;
    details:        any;
    products:       any;
}

export default class ListRight extends React.Component<IListRightProps, IListRightStates> {

    constructor(props: any) {
        super(props);

        this.state = {
            productsDetails:    [],
            products:           [],
            details:            [],
        };
    }

    componentDidUpdate(prevProps: Readonly<IListRightProps>, prevState: Readonly<IListRightStates>, snapshot?: any) {
        if ((JSON.stringify(prevState.products) !== JSON.stringify(prevProps.products) && prevProps.products)
            || (JSON.stringify(prevState.details) !== JSON.stringify(prevProps.details) && prevProps.details)) {
            const products = JSON.parse(JSON.stringify(this.props.products));
            products.map((prod) => {
                const details = this.props.details.filter((d) => d.product_id === prod.product_id);
                if (details) {
                    prod.details = details;
                }
                return prod;
            });
            this.setState({productsDetails: products, products: this.props.products, details: this.props.details});
        }
    }

    render() {
        const styledHomeRightSide = {maxWidth: '100%', paddingLeft: 0, paddingRight: 0, position: 'relative'};
        const styledContainer = {
            maxWidth: '1070px',
            paddingLeft: 0,
            paddingRight: 0,
            position: 'relative',
            marginLeft: 0
        };
        const arr = chunkArrayInGroups(this.state.productsDetails, 3);
        return (
            <Container style={styledHomeRightSide}>
                <CssBaseline />
                <Box sx={{ flexGrow: 1 }}>
                    <Container component='main' style={styledContainer}>
                        <CssBaseline />
                        {arr.map((h) => {
                            return<React.Fragment>
                                <Box>
                                    <Grid container spacing={2}>
                                        {h[0] && <CardLastOffer jacht={h[0]} />}
                                        {h[1] && <CardLastOffer jacht={h[1]} />}
                                        {h[2] && <CardLastOffer jacht={h[2]} />}
                                    </Grid>
                                </Box>
                                <h4 />
                            </React.Fragment>
                        })}
                        <hr />
                    </Container>
                </Box>
            </Container>
        )
    }
}
