import * as React from 'react';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import {AuthenticationService} from '../../../services/authentication_service';
import Icon from '../ui/utils/icon';
import style from './login_page.less';
import classNames from 'classnames';
import {Subscription} from 'rxjs';

import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';

 
export default class LoginPage extends React.PureComponent<{}, {email: string, password: string}> {
    private subscription: Subscription;
    private goHome: 'http://localhost:81/BlueSkyVacantion/dist/#/online/page1';

    @resolve(AuthenticationService) private authenticationService: AuthenticationService;

    constructor(props: any) {
        super(props);
        this.state = {
            email:      '',
            password:   '',
        };
    }
    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    login() {
        this.subscription = this.authenticationService.login(this.state.email, this.state.password)
            .subscribe((res: any) => {
                if (res) {
                    this.setState({email: '', password: ''});
                    location.href = this.goHome;
                    alert('everithing are ok');
                } else {
                    alert('somthing was bad!!! password or email');
                }
            });
    }

    onChangeInput(ev: React.SyntheticEvent) {
        const target:any = ev.target;
        const value = target.value;
        const attName = target.getAttribute('id');
        if (attName === 'formEmail') {
            this.setState({Email: value});
        } else if( attName === 'formPassword') {
            this.setState({password: value});
        }
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
                                            <MDBInput label='E-mail' id='formEmail' style={{paddingLeft: '40px'}} onChange={(ev: any) => this.onChangeInput(ev)}/>
                                        </div>
                                    </div>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={'icon'}><Icon name={'key'}/></div>
                                            <MDBInput label='Password' id='formPassword' style={{paddingLeft: '40px'}} onChange={(ev: any) => this.onChangeInput(ev)}/>
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
            </React.Fragment>
        );
    }
};

//  https://mdbootstrap.com/previews/templates/admin-dashboard/html/pages/login.html
