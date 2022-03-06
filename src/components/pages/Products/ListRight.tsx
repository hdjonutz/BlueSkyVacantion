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

    constructor(props: any) {
        super(props);

        this.state = {}
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
        return (
            <Container style={styledHomeRightSide}>
                <CssBaseline />
                <Box sx={{ flexGrow: 1 }}>
                    <Container component='main' style={styledContainer}>
                        <CssBaseline />
                        <Box>
                            <Grid container spacing={2}>
                                {Array.from(Array(9).keys()).map((i, k) => <CardLastOffer key={k} />) }
                            </Grid>
                        </Box>
                        <hr />
                    </Container>
                </Box>
            </Container>
        )
    }
}
