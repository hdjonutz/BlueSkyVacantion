import * as React from 'react';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import {Logger} from '../../../util/logger';
import ReactTooltip from 'react-tooltip';
import {AuthenticationService} from '../../../services/authentication_service';
import {LocalConfigurationService} from "../../../services/local_configuration_service";
import {encodePostBody, ApiService} from "../../../services/api_service";
import {VersionService} from "../../../services/version_service";
import {AuthorizedApiService} from "../../../services/authorized_api_service";
import {SnackbarService} from "../../../services/snackbar_service";
import classNames from 'classnames';
import style from './contact_us.less';
import {MDBBtn, MDBInput, MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter} from 'mdb-react-ui-kit';
import {Observable} from 'rxjs';
import Icon from '../ui/utils/icon';

export default class ConatctUs extends React.PureComponent<{}, {displayModal: boolean}> {
    
    @resolve(AuthorizedApiService)      private authorizedApiService: AuthorizedApiService;
    @resolve(ApiService)                private apiService: ApiService;

    private contentEmail: any = {};

    constructor(props: any) {
        super(props);
        this.state = {
            displayModal: false
        };
    }

    onChangeInput(ev: React.ReactEventHandler<InputEvent>): void {
        const target = ev.target;
        const value = target.value;
        const id = target.getAttribute('id');
        this.contentEmail[id] = value;
    }

    onClickSubmitValues(): void{
        // if (checkUS) {
        //     this.formFirstName 
        //     this.formLastName
        //     this.formEmail
        //     this.formMessage
        // }
        
        const tmp = Object.keys(this.contentEmail).map((k) => ({key: k, value: this.contentEmail[k]}));
        debugger;

            const observable = Observable
                .from([this.contentEmail].map((item: any) => encodePostBody(item)) as Array<string>)
                .mergeMap((payload: string) => this.apiService
                    .post<any>('sendEmail', {}, payload)
                    .catch((error) => Observable.of(null))
                ).subscribe((res: any) => {
                    if (res.data.result) {
                        this.setState({displayModal: true});
                    }
                });
    }

    public render() {
        return (
            <React.Fragment>
                <div className={classNames('container d-flex justify-content-center flex-column bg-image', style.debugContainer)}
                    style={{backgroundImage:'url(assets/images/contact_us_world_3d.jpg)'}} >

                    <div className={classNames('row', style.colRow)}>
                        <div className={classNames('col-md-10 col-lg-10 offset-md-2 offset-lg-2', style.colMd)}>
                            <h1 className={style.title}>Contact Us</h1>
                        </div>
                    </div>
                    <div className={classNames('row', style.colRow)}>
                        <div className={classNames('col-md-10 col-lg-10 offset-md-2 offset-lg-2', style.colMd)}>
                            Feel free to contact us at any time that you find convenient. You will receive a response in the shortest time possible. If you have your innovative ideas about developing or implementing a software project, Elinext will gladly provide you with a team of seasoned professionals at a reasonable rate.
                        </div>
                    </div>

                    <div className={classNames('row', style.colRow)}>
                        <div className={classNames('col-md-4 col-lg-4 offset-md-2 offset-lg-2', style.colMd)}>
                            <div className={'icon'}><Icon name={'user'}/></div>
                            <MDBInput label='First Name' id='formFirstName' type='text' onChange={(ev: any) => this.onChangeInput(ev)} /*className={'is-valid was-validated'}*/ >
                                <div className='valid-feedback'>Looks good. | Please enter First Name.</div>
                            </MDBInput>
                        </div>
                        <div className={classNames('col-md-4 col-lg-4', style.colMd)}>
                            <div className={'icon'}><Icon name={'user'}/></div>
                            <MDBInput label='Last Number' id='formLastName' type='text' onChange={(ev: any) => this.onChangeInput(ev)} className={'invalid was-validated'} >
                                <div className='invalid-feedback'>Please enter Last Number.</div>
                            </MDBInput>
                        </div>
                    </div>

                    <div className={classNames('row', style.colRow)}>
                        <div className={classNames('col-md-4 col-lg-4 offset-md-2 offset-lg-2', style.colMd)}>
                            <div className={'icon'}><Icon name={'envelope'}/></div>
                            <MDBInput label='E-mail' id='formEmail' type='text' onChange={(ev: any) => this.onChangeInput(ev)} >
                                <div className='invalid-feedback'>Please enter E-mail.</div>
                            </MDBInput>
                        </div>
                        <div className={classNames('col-md-4 col-lg-4', style.colMd)}>
                            <div className={'icon'}><Icon name={'city'}/></div>
                            <MDBInput label='Company Name' id='formCompanyName' type='text' onChange={(ev: any) => this.onChangeInput(ev)} />
                        </div>
                    </div>

                    <div className={classNames('row', style.colRow)}>
                        <div className={classNames('col-md-4 col-lg-4 offset-md-2 offset-lg-2', style.colMd)}>
                            <div className={'icon'}><Icon name={'phone-alt'}/></div>
                            <MDBInput label='Phone Number' id='formPhoneNumber' type='text' onChange={(ev: any) => this.onChangeInput(ev)}/>
                        </div>
                        <div className={classNames('col-md-4 col-lg-4', style.colMd)}>
                            <div className={'icon'}><Icon name={'pencil-alt'}/></div>
                            <MDBInput label='Message' id='formMessage' rows="4" style={{paddingLeft: '40px'}} type='textarea' onChange={(ev: any) => this.onChangeInput(ev)} textarea/>
                        </div>
                    </div>

                    <div className={classNames('row', style.colRow)}>                        
                        <div className={classNames('col-md-2 offset-md-4', style.colMd)}>
                            <Icon name={'paperclip'}/> Attach File
                        </div>
                        <div className={classNames('col-md-6', style.colMd)}>
                            <fieldset className="form-group">
                                <input type="checkbox" className="filled-in" id="checkbox2" />
                                <label htmlFor="checkbox2">I agree with the use of my personal data and information by Elinext as it is said in the Privacy and Cookie Policy.</label>
                            </fieldset>
                        </div>
                    </div>

                    <div className={classNames('row', style.colRow)}>
                        <div className={classNames('col-md-12 offset-md-6', style.colMd)}>
                        <MDBBtn outline className='mx-2' color='secondary'  onClick={() => this.onClickSubmitValues()}>
                            <Icon name={'paper-plane'}/>
                            Send Message
                        </MDBBtn>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};


