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
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import style from './trips.less';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import {groupBy} from '../../../util/groupby';

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
                                {/* <Tab label='Mykonos Crysta' value='_01' className={style.tabsStyle} />
                                <Tab label='Apollon and Artemis' value='_02' className={style.tabsStyle} /> */}
                            </TabList>
                        </Box>

                        {this.state.tripsDetails.length > 0 && this.state.tripsDetails.map((tD) =>
                            <TabPanel value={tD.key} className={style.table}>
                                <span>{tD.items.find((f) => f.label === 'name').value}</span>
                                <div className={style.row}>
                                    <div className={style.left}>
                                        <img src={`assets/slider/products/${this.state.isProduct}/trips/${tD.items[0].product_id}/img.png`}
                                             style={{height: '200px'}}/>
                                    </div>
                                    <div className={style.right}>
                                        {tD.items.find((f) => f.label === 'meeting_point').value}<br/>
                                        {tD.items.find((f) => f.label === 'time_interval').value}<br/><br/>
                                        <div className={style.rightBottom}>
                                            <div className={style.isIncluded}>
                                                What's included:<br/>
                                                <small>
                                                    {JSON.parse(tD.items.find((f) => f.label === 'included').value)
                                                        .map((el) => <>{el}<br/></>)}
                                                    {/* Sailing yacht charter<br/>
                                                    Fully licensed English-speaking skipper<br/>
                                                    Skipper’s assistant (sailor)<br/>
                                                    Lunch on board<br/>
                                                    Wine, beer and soft drinks<br/>
                                                    Snorkeling equipment<br/>
                                                    Fuel charges<br/> */}
                                                </small>
                                            </div>
                                            <div className={style.notIncluded}>
                                                What's not included:<br/>
                                                <small>
                                                    {JSON.parse(tD.items.find((f) => f.label === 'not_included').value)
                                                        .map((el) => <>{el}<br/></>)}
                                                    {/* Hotel pick-up and drop off service (available upon request)<br/>
                                                    Beach towels<br/>
                                                    Gratuities<br/> */}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <small className={style.textAlign}>
                                    {JSON.parse(tD.items.find((f) => f.label === 'extra_infos').value)
                                        .map((el) => <>{el}<br/></>)}
                                </small>
                            </TabPanel>
                        )}
                    </TabContext>
                </Box>
            </ThemeProvider>
        )
    }
}
