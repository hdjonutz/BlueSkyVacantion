import * as React from 'react';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import { AuthorizedApiService } from '../../../services/authorized_api_service';
import Icon from '../ui/utils/icon';
import style from './login_page.less';
import classNames from 'classnames';

import {
    MDBBtn,
    MDBInput, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle
} from 'mdb-react-ui-kit';
import {ApiService} from '../../../services/api_service';
import { Observable } from 'rxjs';
import {Logger} from '../../../util/logger';
const logger = Logger.create('RegisterPage');

interface RegisterPageState {
    data:           {[key: string]: string};
    displayModal:   boolean;
}

export default class RegisterPage extends React.Component<{}, RegisterPageState> {

    @resolve(ApiService)                private apiService: ApiService;
    @resolve(AuthorizedApiService)      private authorizedApiService: AuthorizedApiService;

    private data: {[key: string]: string} = {};

    constructor(props: any) {
        super(props);
        this.state = {
            data: {},
            displayModal: false,
        };

        this.registerUser = this.registerUser.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    checkData(): boolean {
        const _state: any = this.state.data;
        const regexEmail = /^\S{3,}@\S{3,}.\S{3,}$/;
        // Minimum eight characters, at least one letter, one number and one special character:
        const regexPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        
        const objEmail = new RegExp(regexEmail);
        const objPass = new RegExp(regexPass);
        const pass = _state.pass;
        const email = _state.email;
        
        if (email.match(objEmail) && pass.match(objPass) && _state.pass && _state.new_pass) {
            const partsEmail = objEmail.exec(email) || [];
            const partsPass = objPass.exec(pass) || [];
            return partsEmail.length > 0 && partsPass.length > 0;
        } else {
            return false;
        }
        return true;
    }

    onChangeInput(event: React.BaseSyntheticEvent) {
        const target = event.target; 
        const id = target.getAttribute('id');
        const value = target.value;
        const data = this.state.data;
        data[id] = value;
        this.setState({ data });
    }

    registerUser() {
        if (true || this.checkData()) {
            const data: any = this.state.data;
            data.isAdmin    = 1; // 0-Admin, 1-Benutzer

            const payload = JSON.stringify(this.state.data);
            this.apiService
                .post<any>('setUser', {}, payload) /*formid: Ids.USERS*/
                .subscribe((response: any) => {

                    if (response.data['email_sended'] === true) {
                        logger.info('Register in successfully', response.data['access_token']);
                        this.setState({
                            displayModal: true
                        })
                    } else {
                        logger.warn('Email was send to Activate account!');
                        return Observable.of(null);
                    }
                });
            // this.authorizedApiService
            //     .post<any>('setFormItem', {formid: Ids.USERS}, payload)
            //     .subscribe((res) => {
            //         console.log(res);
            //     });
        } else {

        }
    }

    toggleShow() {
        this.setState({displayModal: false});
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
                                            <div className={classNames(style.plumPlate, style.btn, style.formHeader)} ><Icon name={'user'} />Register</div>
                                        </div>
                                    </div>
                                    
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={'icon'}><Icon name={'user'}/></div>
                                            <MDBInput label='Nachname' id='name' style={{paddingLeft: '40px'}} onChange={(ev: any) => this.onChangeInput(ev)}/>
                                        </div>
                                    </div>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={'icon'}><Icon name={'user'}/></div>
                                            <MDBInput label='Vorname' id='vorname' style={{paddingLeft: '40px'}} onChange={(ev: any) => this.onChangeInput(ev)}/>
                                        </div>
                                    </div>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={'icon'}><Icon name={'envelope'}/></div>
                                            <MDBInput label='E-mail' id='email' style={{paddingLeft: '40px'}} onChange={(ev: any) => this.onChangeInput(ev)}/>
                                        </div>
                                    </div>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={'icon'}><Icon name={'key'}/></div>
                                            <MDBInput label='Password' id='pass' style={{paddingLeft: '40px'}} onChange={(ev: any) => this.onChangeInput(ev)}/>
                                        </div>
                                    </div>
                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('col-md-12 col-lg-12', style.colMd)}>
                                            <div className={'icon'}><Icon name={'key'}/></div>
                                            <MDBInput label='Retype password' id='new_pass' style={{paddingLeft: '40px'}} onChange={(ev: any) => this.onChangeInput(ev)}/>
                                        </div>
                                    </div>

                                    <div className={classNames('row', style.colRow)}>
                                        <div className={classNames('d-grid gap-2')}>
                                            <MDBBtn outline className={classNames('mx-2', style.plumPlate, style.btn, style.up)} color='white' onClick={this.registerUser}>
                                                Register
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
                {this.state.displayModal &&
                <MDBModal staticBackdrop tabIndex='-1' show={this.state.displayModal}>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Information</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={this.toggleShow.bind(this)}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>An E-Mail to activate the account has been sent!</MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={this.toggleShow.bind(this)}>
                                    Close
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
                }
            </React.Fragment>
        );
    }
};

//  https://mdbootstrap.com/previews/templates/admin-dashboard/html/pages/login.html
