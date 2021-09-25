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
import classNames from 'classnames';
import style from './contact_us.less';
import {MDBInput} from 'mdb-react-ui-kit';
import Icon from '../ui/utils/icon';

export default class ConatctUs extends React.PureComponent<{}, {}> {

    @resolve(CounterService)        private counterService: CounterService;
    @resolve(AuthenticationService) private authenticationService: AuthenticationService;

    @resolve(ApiService)                private ApiService: ApiService;
    @resolve(VersionService)            private VersionService: VersionService;
    @resolve(HttpClient)                private HttpClient: HttpClient;
    @resolve(SnackbarService)           private SnackbarService: SnackbarService;
    @resolve(LocalConfigurationService) private LocalConfigurationService: LocalConfigurationService;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // this.authenticationService.login('daniel', 'pass')
        //     .subscribe((res: any) => {
        //         // debugger;
        //         console.log(res);
        //     });
    }

    componentDidUpdate(prevProps, prevState) {
        // logger.info('Example of logger');
        // this._counterService.getData().subscribe((res) => {
        //     console.log("RESULT: ", res);
        // });
    }

    onChangeInput(ev: React.ReactEventHandler<InputEvent>): void {
        const target = ev.target;
        const value = target.value;
        console.log(value);
    }

    public render() {
        return (
            <React.Fragment>
                <div className={style.container}>
                
                    <h1 className={style.title}>Contact Us</h1>
                    <div className={style.caption}>Feel free to contact us at any time that you find convenient. You will receive a response in the shortest time possible. If you have your innovative ideas about developing or implementing a software project, Elinext will gladly provide you with a team of seasoned professionals at a reasonable rate.</div>


                    <div className={style.formGroup}>
                        <div className={style.column}>
                            <div className={style.row}>
                                <div className={style.icon}><Icon name={'user'}/></div>
                                <MDBInput label='First Name' id='formFirstNmae' type='text' onChange={(ev: any) => this.onChangeInput(ev)}/>
                            </div>
                            <div className={style.row}>
                                <div className={style.icon}><Icon name={'envelope'}/></div>
                                <MDBInput label='E-mail' id='formEnvelope' type='text' onChange={(ev: any) => this.onChangeInput(ev)}/>
                            </div>
                            <div className={style.row}>
                                <div className={style.icon}><Icon name={'phone-alt'}/></div>
                                <MDBInput label='Phone Number' id='formPhoneNumber' type='text' onChange={(ev: any) => this.onChangeInput(ev)}/>
                            </div>
                        </div>
                        <div className={style.column}>
                            <div className={style.row}>
                                <div className={style.icon}><Icon name={'user'}/></div>
                                <MDBInput label='Last Number' id='formLastName' type='text' onChange={(ev: any) => this.onChangeInput(ev)}/>
                            </div>
                            <div className={style.row}>
                                <div className={style.icon}><Icon name={'phone-alt'}/></div>
                                <MDBInput label='Company' id='formCompany' type='text' onChange={(ev: any) => this.onChangeInput(ev)}/>
                            </div>
                            <div className={style.row}>
                                <div className={style.icon}><Icon name={'pencil-alt'}/></div>
                                <MDBInput label='Message' type="textarea" id='formPhoneNumber' onChange={(ev: any) => this.onChangeInput(ev)}/>
                            </div>

                        </div>
                    </div>
                    <div className={style.formGroup}>
                        <div className={style.column}>
                            <div className={style.row}>
                                <Icon name={'paperclip'}/> Attach File
                            </div>
                            <div className={style.row}>
                                <div>
                                    <div>
                                        <input type='checkbox' />
                                    </div>
                                    <div>
                                        I agree with the use of my personal data and information by Elinext as it is said in the Privacy and Cookie Policy.
                                    </div>               
                                </div>
                            </div>
                            <div className={style.row}>
                                <button type="button" className="btn btn-outline-primary" data-mdb-ripple-color="dark">
                                <Icon name={'paper-plane'}/>Send Message</button>
                            </div>
                        </div>
                    </div>
            
                </div>
            </React.Fragment>
        );
    }
};


