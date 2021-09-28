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
import {Observable, Subscription} from 'rxjs';
import Icon from '../ui/utils/icon';
import { Form } from 'reactstrap';
import { off } from 'local-storage';

interface IContactUsStates {
    displayModal:   boolean;
    contentEmail:   any;
    file:           File;
    wasChecked:     boolean;
    credintials:    boolean;
}

export default class ConatctUs extends React.Component<{}, IContactUsStates> {
    
    @resolve(AuthorizedApiService)      private authorizedApiService: AuthorizedApiService;
    @resolve(ApiService)                private apiService: ApiService;
    private inputUpload:                any;
    private observable:                 Subscription;

    constructor(props: any) {
        super(props);
        this.state = {
            displayModal:   false,
            contentEmail:   {},
            file:           null,
            wasChecked:     false,
            credintials:    false,
        };
        this.onClickSubmitValues = this.onClickSubmitValues.bind(this);
    }

    componentWillUnmount() {
        if (this.observable) {
            this.observable.unsubscribe();
        }
    }

    onChangeInput(ev: React.ReactEventHandler<InputEvent>): void {
        const target = ev.target;
        const value = target.value;
        const id = target.getAttribute('id');
        const contentEmail = this.state.contentEmail;
        contentEmail[id] = target.type === 'checkbox' ? target.checked : value;
        this.setState({contentEmail: contentEmail}, () => console.log(this.state));
    }

    onClickSubmitValues(): void{        
        const tmp = Object.keys(this.state.contentEmail).map((k) => ({key: k, value: this.state.contentEmail[k]}));
        this.setState({wasChecked: true});
        if (this.state.contentEmail && this.state.contentEmail.privacy) {} else {
            return;
        }

        this.observable = Observable
            .from([this.state.contentEmail].map((item: any) => encodePostBody(item)) as Array<string>)
            .mergeMap((payload: string) => this.apiService
                .post<any>('sendEmail', {}, payload)
                .catch((error) => Observable.of(null))
            ).subscribe((res: any) => {
                if (res.data.result) {
                    this.setState({displayModal: true, contentEmail: {}, wasChecked: false});
                }
            });
    }

    toggleShow() {
        this.setState({displayModal: false, contentEmail: {}});
    }

    onFileSelected(file: File) {
        if (!!file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                // nothing
            };
            fileReader.readAsText(file.slice());
        }
        this.setState({file: file});
    }

    renderFormRow (idValue: string, icon: string, label: string, ok?: string, error?: string, offset?: string): JSX.Element {
        const stateEmail = this.state.contentEmail;
        const classNameValue = stateEmail && stateEmail[idValue] && stateEmail[idValue] != '' ? 'is-valid': 'is-invalid';
        const messageValue = classNameValue === 'is-valid' ? 'valid-feedback' : 'invalid-feedback';
        const messageText = classNameValue === 'is-valid' ? ok : error;

        return <div className={classNames('col-md-4 col-lg-4 ' + offset, style.colMd)}>
                            <div className={'icon'}><Icon name={icon}/></div>
                            <MDBInput   label={label}
                                        id={idValue}
                                        type='text'
                                        value={stateEmail && stateEmail[idValue] || ''}
                                        onChange={(ev: any) => this.onChangeInput(ev)}
                                        className={this.state.wasChecked ? classNameValue: ''} >
                                {this.state.wasChecked && <div className={messageValue}>{!ok ? '' : messageText}</div>}
                            </MDBInput>
                        </div>
    }

    public render() {
        const stateEmail = this.state.contentEmail;
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
                        {this.renderFormRow('formFirstName', 'user', 'First Name', 'Looks good.', 'Please enter First Name.', 'offset-md-2 offset-lg-2')}
                        {this.renderFormRow('formLastName', 'user', 'Last Name', 'Looks good.', 'Please enter Last Number.')}
                    </div>

                    <div className={classNames('row', style.colRow)}>
                        {this.renderFormRow('formEmail', 'envelope', 'E-mail', 'Looks good.', 'Please enter E-mail.', 'offset-md-2 offset-lg-2')}
                        {this.renderFormRow('formCompanyName', 'city', 'Company Name')}
                    </div>

                    <div className={classNames('row', style.colRow)}>
                        {this.renderFormRow('formPhoneNumber', 'phone-alt', 'Phone Number', 'Looks good.', 'Please enter Phone Number.', 'offset-md-2 offset-lg-2')}
                        <div className={classNames('col-md-4 col-lg-4', style.colMd)}>
                            <div className={'icon'}><Icon name={'pencil-alt'}/></div>
                            <MDBInput label='Message' id='formMessage' rows="4" style={{paddingLeft: '40px'}} type='textarea' value={stateEmail && stateEmail.formMessage || ''} onChange={(ev: any) => this.onChangeInput(ev)} textarea/>
                        </div>
                    </div>

                    <div className={classNames('row', style.colRow)}>                        
                        <div className={classNames('col-md-2 offset-md-4', style.colMd)} onClick={() => this.inputUpload.click()}>
                            <Icon name={'paperclip'}/> Attach File 
                            <span>{this.inputUpload && this.inputUpload.files && this.inputUpload.files[0] && ': ' + this.inputUpload.files[0].name}</span>
                            <input ref={(ref: any) => this.inputUpload = ref}
                                   type={'file'}
                                   multiple={false} onChange={(e: any) => {this.onFileSelected(e.target.files[0])}}
                                   style={{display: 'none'}} />
                        </div>
                        <div className={classNames('col-md-6', style.colMd)}>
                            <fieldset className="form-group">
                                <input type="checkbox" id="privacy" onChange={(ev: any) => this.onChangeInput(ev)} />
                                <label htmlFor="privacy" className={this.state.wasChecked && !this.state.contentEmail.privacy ? 'invalid-feedback-privacy' : ''}>I agree with the use of my personal data and information by Elinext as it is said in the Privacy and Cookie Policy.</label>
                            </fieldset>
                        </div>
                    </div>

                    <div className={classNames('row', style.colRow)}>
                        <div className={classNames('col-md-12 offset-md-6', style.colMd)}>
                        <MDBBtn outline className='mx-2' color='secondary'  onClick={() => this.onClickSubmitValues()}>
                            <Icon name={'paper-plane'} />
                            Send Message
                        </MDBBtn>
                        </div>
                    </div>
                </div>
                {this.state.displayModal && 
                    <MDBModal staticBackdrop tabIndex='-1' show={this.state.displayModal}>
                    <MDBModalDialog>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>Modal title</MDBModalTitle>
                          <MDBBtn className='btn-close' color='none' onClick={this.toggleShow.bind(this)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>The E-mail was send!</MDBModalBody>
              
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


