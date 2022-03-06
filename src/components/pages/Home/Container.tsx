import * as React from 'react';
import style from './admin.less';
import {NavLink} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import routes from '../../../routes';

import {AuthorizedApiService} from '../../../services/authorized_api_service';
import 'reflect-metadata';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import SliderComponent from '../../slider/SliderComponent';
import ListHomePage from './ListHome';


export default class ContainerPage extends React.Component<{}, {w: string, h: string}> {

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        debugger;
        return (
            <Container maxWidth='xl' style={{maxWidth: '100%', paddingLeft: 0, paddingRight: 0}}>
                {/* <CssBaseline /> */}
                <Box sx={{ marginTop: 9}} style={{marginTop: '93px'}}>
                    <SliderComponent callback={(w, h) => this.setState({w: w + 'px', h: h + 'px'})} {...this.props} />
                    <ListHomePage {...this.props} />
                </Box>
            </Container>
        )
    }
}
