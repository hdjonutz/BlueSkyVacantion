import * as React from 'react';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import {AuthenticationService} from '../../../services/authentication_service';
import {LocalConfigurationService} from "../../../services/local_configuration_service";
import Icon from '../ui/utils/icon';
import style from './login_page.less';
import classNames from 'classnames';

import {
    MDBBtn,
    MDBInput
  } from 'mdb-react-ui-kit';
  
 
export default class ForgotPasswordPage extends React.PureComponent<{}, {}> {

    @resolve(AuthenticationService) private authenticationService: AuthenticationService;

    constructor(props: any) {
        super(props);
        this.state = {
            login:          true,
            forgetPassword: false,
            register:       false
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

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
                                            <div className={classNames(style.plumPlate, style.btn, style.formHeader)} ><Icon name={'user'} />Change Password</div>
                                        </div>
                                    </div>
                                    
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={'icon'}><Icon name={'envelope'}/></div>
                                            <MDBInput label='E-mail' id='formEmail' style={{paddingLeft: '40px'}} onChange={(ev: any) => this.onChangeInput(ev)}/>
                                        </div>
                                    </div>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={'icon'}><Icon name={'key'}/></div>
                                            <MDBInput label='Password' id='formPassword' style={{paddingLeft: '40px'}} onChange={(ev: any) => this.onChangeInput(ev)}/>
                                        </div>
                                    </div>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={'icon'}><Icon name={'key'}/></div>
                                            <MDBInput label='Retype password' id='formPassword_' style={{paddingLeft: '40px'}} onChange={(ev: any) => this.onChangeInput(ev)}/>
                                        </div>
                                    </div>

                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('d-grid gap-2')}>
                                            <MDBBtn outline className={classNames('mx-2', style.plumPlate, style.btn, style.up)} color='white' >
                                                Send Token to E-mail
                                            </MDBBtn>
                                        </div>
                                    </div>
{/*
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={style.driver}></div>
                                        </div>    
                                    </div>

                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-4 col-lg-4 offset-md-4 offset-lg-4', style.colMd)} style={{justifyContent: 'space-between', display: 'flex'}}>
                                            <Icon name={'twitter'} /><Icon name={'linkedin-in'} /><Icon name={'instagram'} />
                                        </div>
                                    </div>
*/}
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
