import * as React from 'react';
import 'reflect-metadata';
import {CounterService} from '../../../services/CounterService';
import { resolve } from 'inversify-react';
import {Logger} from '../../../util/logger';
import ReactTooltip from 'react-tooltip';
import {AuthenticationService} from '../../../services/authentication_service';
import {LocalConfigurationService} from "../../../services/local_configuration_service";
import {ApiService} from "../../../services/api_service";
import {VersionService} from "../../../services/version_service";
import {HttpClient} from "../../../services/http_client";
import {SnackbarService} from "../../../services/snackbar_service";

const logger = Logger.create('Counter');


export default class Page_one extends React.PureComponent<{}, {}> {

    @resolve(CounterService)        private counterService: CounterService;
    @resolve(AuthenticationService) private authenticationService: AuthenticationService;

    @resolve(ApiService)                private ApiService: ApiService;
    @resolve(VersionService)            private VersionService: VersionService;
    @resolve(HttpClient)                private HttpClient: HttpClient;
    @resolve(SnackbarService)           private SnackbarService: SnackbarService;
    @resolve(LocalConfigurationService) private LocalConfigurationService: LocalConfigurationService;


    // @lazyInject("counterService") private readonly counterService: ICounterService<string>;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        logger.info('Example of logger');
        this.counterService.getData().subscribe((res) => {
            console.log("RESULT: ", res);
        });

        this.LocalConfigurationService.get().subscribe(() => {
            debugger;
        });


        console.log(this);
        debugger;

        this.authenticationService.login('daniel', 'pass')
            .subscribe((res) => {
                debugger;
                console.log(res);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        // logger.info('Example of logger');
        // this._counterService.getData().subscribe((res) => {
        //     console.log("RESULT: ", res);
        // });
    }

    public render() {
        return (
            <React.Fragment>
                <div style={{display: 'flex', flex: 1}}>
                    Page_one
                    <p data-tip="hello world here is a tooltip">Tooltip</p>
                    <ReactTooltip />
                </div>
            </React.Fragment>
        );
    }
};
