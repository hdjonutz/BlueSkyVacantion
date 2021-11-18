import * as React from 'react';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import {AuthenticationService} from '../../../services/authentication_service';
import {ApiService} from '../../../services/api_service';
import Icon from '../ui/utils/icon';
import style from './login_page.less';
import classNames from 'classnames';
import {Subscription} from 'rxjs';

import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import {Logger} from '../../../util/logger';
import {showDialogInfo} from "../../common/modal-info-dialog";
const logger = Logger.create('LoginPage');
 
interface LoginPageStates {
    email:              string;
    password:           string;
    displayModal:       boolean;
    messageToDisplay:   string;
}

export default class LoginPage extends React.PureComponent<{}, LoginPageStates> {
    private subscription: Subscription;
    private goHome = 'http://localhost:81/BlueSkyVacantion/dist/';

    @resolve(AuthenticationService) private authenticationService: AuthenticationService;
    @resolve(ApiService)            private apiService: ApiService;
    

    constructor(props: any) {
        super(props);
        this.state = {
            email:              '',
            password:           '',
            displayModal:       false,
            messageToDisplay:   '',
        };
        this.callback   = this.callback.bind(this);
        this.login      = this.login.bind(this);
    }

    componentDidMount() {
        const arr = window.location.hash.split('&');
        if (arr) {
            const str = arr.find((a) => a.indexOf('access_token') >= 0);
            if (str) {
                const token = str.replace('access_token=','');
                this.authenticationService.activateAccount(token).subscribe((res) => {                    
                    if (new Date().getTime() > res.expirate) {
                        const info = 'token has expired, pleace make a new request for activation';
                        this.setState({displayModal: true, messageToDisplay: info});
                    } else {
                        const data = JSON.stringify({ access_token: token});
                        this.apiService.post<any>('activateAccount', {}, data)
                        .subscribe((response: any) => {
                            if (response.data['activated'] === true) {
                                logger.info('Register in successfully!');
                                const info = 'Your account has been successfully activated!';
                                this.setState({displayModal: true, messageToDisplay: info});
                            }
                        });
                    }
                });
            }
        }
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    login() {
        const _that = this;
        this.subscription = this.authenticationService.login(this.state.email, this.state.password)
            .subscribe((res: any) => {
                debugger;
                if (res) {
                    this.setState({email: '', password: ''});
                    location.href = _that.goHome;
                } else {
                    this.setState({displayModal: true, messageToDisplay: 'somthing was bad!!! password or email'});
                }
            });
        
    }

    onChangeInput(ev: React.SyntheticEvent) {
        const target:any = ev.target;
        const value = target.value;
        const attName = target.getAttribute('id');
        if (attName === 'formEmail') {
            this.setState({email: value});
        } else if( attName === 'formPassword') {
            this.setState({password: value});
        }
    }

    callback() {
        this.setState({displayModal: false, messageToDisplay: ''});
    }

    public render() {
        return (
            <React.Fragment>
                <div className={style.view} style={{backgroundImage:'url(assets/images/login2.jpg)'}}>
                    <div style={{display: 'flex', flex: 1}} className={classNames(style.container, style.mask)}>
                        
                        <img src={'assets/images/atenas_01.jpg'} style={{height:'20px', width: '20px'}}/>
                        <img src={'assets/svg/download.svg'} style={{height:'20px', width: '20px'}}/>
                        <Icon name={'download'} />
                        
                        <div className={classNames('container d-flex justify-content-center flex-column bg-image', style.debugContainer)}>
                            
                            <div className={classNames(style.card, 'col-xl-5 col-lg-6 col-md-10 col-sm-12 mx-auto mt-5')}>
                                <div className={style.cardBody}>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={classNames(style.plumPlate, style.btn, style.formHeader)} ><Icon name={'user'} />Log In</div>
                                        </div>
                                    </div>
                                    
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={'icon'}><Icon name={'user'}/></div>
                                            <MDBInput label='E-mail' id='formEmail' style={{paddingLeft: '40px'}} value={this.state.email} onChange={(ev: any) => this.onChangeInput(ev)}/>
                                        </div>
                                    </div>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={'icon'}><Icon name={'key'}/></div>
                                            <MDBInput label='Password' id='formPassword' style={{paddingLeft: '40px'}} value={this.state.password} onChange={(ev: any) => this.onChangeInput(ev)}/>
                                        </div>
                                    </div>

                                    <div className={classNames('row', style.colRow, style.passwordForgot)}>
                                        <div className={classNames('col-md-5 col-lg-5 offset-md-7 offset-lg-7', style.colMd)}>
                                            <NavLink to={'ForgotPasswordPage'}><b>&nbsp; Forgot password?</b></NavLink>
                                        </div>
                                    </div>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('d-grid gap-2')}>
                                            <MDBBtn outline className={classNames('mx-2', style.plumPlate, style.btn, style.up)} color='white' onClick={this.login.bind(this)}>
                                                Log In
                                            </MDBBtn>
                                        </div>
                                    </div>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={style.driver}></div>
                                        </div>    
                                    </div>
{/*
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-4 col-lg-4 offset-md-4 offset-lg-4', style.colMd)} style={{justifyContent: 'space-between', display: 'flex'}}>
                                            <Icon name={'twitter'} /><Icon name={'linkedin-in'} /><Icon name={'instagram'} />
                                        </div>
                                    </div>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={style.driver}></div>
                                        </div>    
                                    </div> 
*/}
                                    <div className={classNames('row', style.colRow, style.passwordForgot, style.centerRegister)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            Don't have an account?
                                            <NavLink to={'RegisterPage'}><b>&nbsp; Register here</b></NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.displayModal && <div>{showDialogInfo(this.state.messageToDisplay, this.state.displayModal, this.callback)}</div>}
            </React.Fragment>
        );
    }
};

//  https://mdbootstrap.com/previews/templates/admin-dashboard/html/pages/login.html
