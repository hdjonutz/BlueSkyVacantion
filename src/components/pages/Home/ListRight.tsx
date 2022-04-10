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

import CardAbout from './CardAbout';
import CardLastOffer from './../common/CardLastOffer';
import CardPartnerSay from './CardPartnerSay';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';
import {chunkArrayInGroups} from '../../../util/helpers';

interface IListRightProps {
    details?: any;
    products?: any;
}
interface IListRightStates {
    productsDetails: any;
}

export default class ListRight extends React.Component<IListRightProps, IListRightStates> {

    private hoWeAre = 'This impressive paella is a perfect party dish and a fun meal to' +
        ' cook together with your guests. Add 1 cup of frozen peas along with' +
        ' the mussels, if you like.';

    private values = 'This impressive paella is a perfect party dish and a fun meal to' +
        ' cook together with your guests. Add 1 cup of frozen peas along with' +
        ' the mussels, if you like.';

    private services = 'This impressive paella is a perfect party dish and a fun meal to' +
        ' cook together with your guests. Add 1 cup of frozen peas along with' +
        ' the mussels, if you like.';

    constructor(props: any) {
        super(props);
        this.state = {
            productsDetails: []
        };
    }

    componentDidUpdate(prevProps: Readonly<IListRightProps>, prevState: Readonly<IListRightStates>, snapshot?: any) {
        if ((JSON.stringify(this.props.products) !== JSON.stringify(prevProps.products) && prevProps.products)
            || (JSON.stringify(this.props.details) !== JSON.stringify(prevProps.details) && prevProps.details)) {
            const products = JSON.parse(JSON.stringify(this.props.products));
            products.map((prod) => {
                const details = this.props.details.filter((d) => d.product_id === prod.product_id);
                if (details) {
                    prod.details = details;
                }
                return prod;
            });
            this.setState({productsDetails: products});
        }
    }

    render() {
        const arr = chunkArrayInGroups(this.state.productsDetails.slice(0, 3), 3);

        return (
            <Container style={{maxWidth: '100%', paddingLeft: 0, paddingRight: 0, position: 'relative'}}>
                <CssBaseline />
                <Box sx={{ flexGrow: 1 }} className={style.rightSide}>
                    <Container component='main'
                               style={{maxWidth: '1070px', paddingLeft: 0, paddingRight: 0, position: 'relative', marginLeft: 0}}>
                        <CssBaseline />
                        <Box>
                            <Grid container spacing={2}>
                                <CardAbout title={'Wo we are'} description={this.hoWeAre} >
                                    <ContactSupportIcon sx={{ width: 96, height: 96, bgcolor: '#ffffff', color: '#f44336'}} />
                                </CardAbout>

                                <CardAbout title={'Our philosophy & values'} description={this.values} >
                                    <PsychologyIcon sx={{ width: 96, height: 96, bgcolor: '#ffffff', color: '#f44336'}}/>
                                </CardAbout>

                                <CardAbout title={'Our services'} description={this.services} >
                                    <DesignServicesIcon sx={{ width: 96, height: 96, bgcolor: '#ffffff', color: '#f44336'}}/>
                                </CardAbout>
                            </Grid>
                        </Box>
                        <hr />
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <h2>Latest Offers</h2>
                            <NavLink to={'/online/home/products'} style={{textDecoration: 'none'}}>
                                <Button className='mx-2' variant='outlined'>Get all Offerts</Button>
                            </NavLink>
                        </div>
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
                        <h2>What Our Pertners Say</h2>
                        <Box>
                            <Grid container spacing={2}>
                                <CardPartnerSay />
                            </Grid>
                        </Box>

                    </Container>
                </Box>
            </Container>
        )
    }
}
