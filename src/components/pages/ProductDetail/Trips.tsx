import * as React from 'react';
import 'reflect-metadata';

import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../../Layout/Theme';

import DetailLeft from './DetailLeft';
import DetailRight from './DetailRight';
import {getProductId} from '../Products/helpers';
import {combineLatest, of} from 'rxjs';
import {Ids} from '../../../formsIds';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {resolve} from 'inversify-react';
import {FormsService} from '../../../services/form_service';
import {ApiService, encodePostBody} from '../../../services/api_service';
import TabContext from '@mui/lab/TabContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import style from './trips.less';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import {groupBy} from '../../../util/groupby';
import {ReactNode} from 'react';
import CssBaseline from '@mui/material/CssBaseline';

interface ITripsDetailsState {
    value:          string;
    isProduct:      string;
    trips:          Readonly<any>;
    tripsDetails:   Readonly<any>;
}
interface ITripsDetailsProps {
    isProduct:  string;
}


export default class TripsDetails extends React.Component<ITripsDetailsProps, ITripsDetailsState> {

    private isProduct = '';
    @resolve(FormsService)      private formsService: FormsService;
    @resolve(ApiService)        private apiService: ApiService;

    constructor(props: any) {
        super(props);

        this.state = {
            value:          null as any,
            isProduct:      '',
            trips:          [],
            tripsDetails:   [],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<ITripsDetailsProps>, prevState: Readonly<ITripsDetailsState>, snapshot?: any) {
        if (this.props.isProduct && this.isProduct !== this.props.isProduct) {
            this.isProduct = this.props.isProduct;
            // const payload = encodePostBody({product_id: this.props.isProduct})
            const prodFilter =  JSON.stringify([{
                name:  'product_id',
                operator: 'EQL',
                value: this.props.isProduct
            }]);
            combineLatest(
                [of(null),
                    this.apiService.get('getFormData', {formid: Ids.PROD_TRIPS, filter: prodFilter})
                        .pipe(
                            map((res) => {
                                const data = res.data || [];
                                this.setState({trips: data, isProduct: this.props.isProduct});
                                return data;
                            }),
                            switchMap((trips) => this.apiService.get('getFormData',
                                {
                                    formid: Ids.PROD_TRIPS_DETAILS,
                                    filter: trips.length > 0
                                        ? JSON.stringify(trips.map((t) => ({ name:  'product_id', operator: 'EQL', value: t.trip_id})))
                                        : JSON.stringify([{ name:  'product_id', operator: 'EQL', value: 'thisShouldNotBeEmpty'}])
                                })
                                .pipe(
                                    map((tripDetails) => tripDetails.data || []))
                                )
                        )],
            ).subscribe(([configForms, trips]) => {
                const tripsDetails = groupBy('product_id', trips || []);
                this.setState({tripsDetails, value: tripsDetails && tripsDetails[0] && tripsDetails[0].key});
            });
        }
    }

    handleChange(event: React.SyntheticEvent, newValue: string) {
        this.setState({value: newValue});
    };

    findItem(item: any, label: string): string {
        const found = item.items.find((f) => f.label === label);
        return found ? found.value : '';
    }

    render() {
        return (
            <ThemeProvider theme={themeMeandro}>
                {this.state.tripsDetails.length > 0 && this.state.trips &&
                <Box flexGrow={2}
                     display={{ xs: 'none', sm: 'flex', flexDirection: 'row', flex: '1', display: 'flex'}} >
                    {this.state.value && <TabContext value={this.state.value}>
                        <Box>
                            <TabList onChange={this.handleChange}
                                     orientation='vertical'
                                     aria-label='lab API tabs example'
                                     style={{minWidth: '200px'}}
                                     className={style.tabsStyle}
                            >
                                {this.state.trips.map((t, idx) =>
                                    <Tab label={t.value} value={t.trip_id} className={style.tabsStyle} key={idx}/>)}
                            </TabList>
                        </Box>
                        {this.state.tripsDetails.length > 0 && this.state.tripsDetails.map((tD, idx) =>
                            <TabPanel value={tD.key} className={style.table} style={{backgroundColor: '#f5f1f0'}} key={idx}>
                                <Box sx={{ flexGrow: 1 }} >
                                    <Grid container spacing={1}>
                                        {/* name of trip */}
                                        <Grid item xs={12} md={12} lg={12} >
                                            <span>{this.findItem(tD, 'name')}</span>
                                        </Grid>
                                        {/* left */}
                                        <Grid item xs={12} md={12} lg={6} >
                                            <div className={style.left}>
                                                <img src={`assets/slider/products/${this.state.isProduct}/trips/${tD.items[0].product_id}/img.png`}
                                                     style={{maxWidth: '100%'}} />
                                            </div>
                                        </Grid>
                                        {/* right */}
                                        <Grid item xs={12} md={12} lg={6} >
                                            {this.findItem(tD, 'meeting_point')}<br/>
                                            {this.findItem(tD, 'time_interval')}<br/> <br/>
                                            <Box sx={{ flexGrow: 1 }} >
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12} md={6} lg={6}>
                                                        What's included:<br/>
                                                        {this.findItem(tD, 'included') !== '' && <small>
                                                            {JSON.parse(this.findItem(tD, 'included'))
                                                                .map((el, idx) => <span key={idx}>{el}<br/></span>)}
                                                        </small>}
                                                        <br/>
                                                    </Grid>
                                                    <Grid item xs={12} md={6} lg={6}>
                                                        What's not included:<br/>
                                                        {this.findItem(tD, 'not_included') !== '' && <small>
                                                            {JSON.parse(this.findItem(tD, 'not_included'))
                                                                .map((el, idx) => <span key={idx}>{el}<br/></span>)}
                                                        </small>}
                                                        <br/>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} >
                                        {this.findItem(tD, 'extra_infos') !== '' && <small className={style.textAlign}>
                                            {JSON.parse(this.findItem(tD, 'extra_infos'))
                                                .map((el, idx) => <span key={idx}>{el}<br/></span>)}
                                        </small>}
                                    </Grid>
                                </Box>
                            </TabPanel>
                        )}
                    </TabContext>}
                </Box>}
                {this.state.tripsDetails.length > 0 && this.state.trips &&
                    <Box flexGrow={2} display={{md: 'none', lg: 'none', xl: 'none'}}>
                    {this.state.tripsDetails.length > 0 && this.state.tripsDetails.map((tD, idx) =>
                        <Grid style={{backgroundColor: '#f5f1f0', padding: '16px'}} key={idx}>
                            {/* name of trip */}
                            <Grid item xs={12} md={12} lg={12} >
                                <span>{this.findItem(tD, 'name')}</span>
                            </Grid>
                            {/* left */}
                            <Grid item xs={12} md={12} lg={12} >
                                <div className={style.left}>
                                    <img src={`assets/slider/products/${this.state.isProduct}/trips/${tD.items[0].product_id}/img.png`}
                                         style={{maxWidth: '100%'}} />
                                </div>
                            </Grid>
                            {/* right */}
                            <Grid item xs={12} md={12} lg={12} >
                                {this.findItem(tD, 'meeting_point')}<br/>
                                {this.findItem(tD, 'time_interval')}<br/> <br/>
                            </Grid>
                            <Grid item xs={12} md={6} lg={12}>
                                What's included:<br/>
                                {this.findItem(tD, 'included') !== '' && <small>
                                    {JSON.parse(this.findItem(tD, 'included'))
                                        .map((el, idx) => <span key={idx}>{el}<br/></span>)}
                                </small>}
                                <br/>
                            </Grid>
                            <Grid item xs={12} md={6} lg={12}>
                                What's not included:<br/>
                                {this.findItem(tD, 'not_included') !== '' && <small>
                                    {JSON.parse(this.findItem(tD, 'not_included'))
                                        .map((el, idx) => <span key={idx}>{el}<br/></span>)}
                                </small>}
                                <br/>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} >
                                {this.findItem(tD, 'extra_infos') !== '' && <small className={style.textAlign}>
                                    {JSON.parse(this.findItem(tD, 'extra_infos'))
                                        .map((el, idx) => <span key={idx}>{el}<br/></span>)}
                                </small>}
                            </Grid>
                        </Grid>
                    )}
                </Box>}
            </ThemeProvider>
        )
    }
}
