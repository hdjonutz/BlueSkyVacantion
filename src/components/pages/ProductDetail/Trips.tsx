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
            value:          '_01',
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

    render() {
        return (
            <ThemeProvider theme={themeMeandro}>
                <Box sx={{ width: '100%', typography: 'body1'}} className={style.tripDetails}>
                    <TabContext value={this.state.value}>
                        <Box>
                            <TabList onChange={this.handleChange}
                                     orientation='vertical'
                                     aria-label='lab API tabs example'
                                     className={style.tabsStyle}
                            >
                                {this.state.trips.map((t) => <Tab label={t.value} value={t.trip_id} className={style.tabsStyle} />)}
                            </TabList>
                        </Box>

                        {this.state.tripsDetails.length > 0 && this.state.tripsDetails.map((tD) =>
                            <TabPanel value={tD.key} className={style.table}>
                                <Box sx={{ flexGrow: 1 }} >
                                    <Grid container spacing={2}>
                                        {/* name of trip */}
                                        <Grid item xs={12} md={12} lg={12} >
                                            <span>{tD.items.find((f) => f.label === 'name').value}</span>
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
                                            {tD.items.find((f) => f.label === 'meeting_point').value}<br/>
                                            {tD.items.find((f) => f.label === 'time_interval').value}<br/> <br/>
                                            <Box sx={{ flexGrow: 1 }} >
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12} md={6} lg={6}>
                                                        What's included:<br/>
                                                        <small>
                                                            {JSON.parse(tD.items.find((f) => f.label === 'included').value)
                                                                .map((el) => <>{el}<br/></>)}
                                                        </small>
                                                        <br/>
                                                    </Grid>
                                                    <Grid item xs={12} md={6} lg={6}>
                                                        What's not included:<br/>
                                                        <small>
                                                            {JSON.parse(tD.items.find((f) => f.label === 'not_included').value)
                                                                .map((el) => <>{el}<br/></>)}
                                                        </small>
                                                        <br/>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} >
                                        <small className={style.textAlign}>
                                            {JSON.parse(tD.items.find((f) => f.label === 'extra_infos').value)
                                                .map((el) => <>{el}<br/></>)}
                                        </small>
                                    </Grid>
                                </Box>
                            </TabPanel>
                        )}
                    </TabContext>
                </Box>
            </ThemeProvider>
        )
    }
}
