import * as React from 'react';
import style from './admin.less';
import {NavLink} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import routes from '../../../routes';

import 'reflect-metadata';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import SliderComponent from '../../slider/SliderComponent';
import ListHomePage from './ListHome';
import {resolve} from 'inversify-react';
import {AuthenticationService} from '../../../services/authentication_service';
import {FormsService} from '../../../services/form_service';
import {combineLatest} from 'rxjs';
import {Ids} from '../../../formsIds';
import {map} from 'rxjs/operators';
import {inject} from 'inversify';
import {ApiService} from '../../../services/api_service';

interface IContainerStates {
    products: any;
    details: any;
}

export default class ContainerPage extends React.Component<{}, IContainerStates> {

    @resolve(FormsService)      private formsService: FormsService;
    @resolve(ApiService)        private apiService: ApiService;

    constructor(props: any) {
        super(props);
        this.state = {
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

    render() {
        return (
            <Container maxWidth='xl' style={{maxWidth: '100%', paddingLeft: 0, paddingRight: 0}}>
                {/* <CssBaseline /> */}
                <Box sx={{ marginTop: 9}} style={{marginTop: '93px'}}>
                    <SliderComponent callback={(w, h) => this.setState({w: w + 'px', h: h + 'px'})} {...this.props} />
                    <ListHomePage {...this.props} {...this.state} />
                </Box>
            </Container>
        )
    }
}
