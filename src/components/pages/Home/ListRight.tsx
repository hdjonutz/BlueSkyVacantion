import * as React from 'react';

import {Observable} from 'rxjs';
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
import CardLastOffer from './CardLastOffer';
import CardPartnerSay from './CardPartnerSay';

export default class ListRight extends React.Component<{}, {}> {

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

        this.state = {}
    }


    render() {
        return (
            <Container style={{maxWidth: '100%', paddingLeft: 0, paddingRight: 0, position: 'relative'}}>
                <CssBaseline />
                <Box sx={{ flexGrow: 1 }} className={style.rightSide}>
                    <Container component='main' style={{maxWidth: '1070px', paddingLeft: 0, paddingRight: 0, position: 'relative', marginLeft: 0}}>
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
                        <h2>Latest Offers</h2>
                        <Box>
                            <Grid container spacing={2}>
                                <CardLastOffer />
                                <CardLastOffer />
                                <CardLastOffer />
                            </Grid>
                        </Box>
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
