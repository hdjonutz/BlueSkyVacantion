import * as React from 'react';
import { CounterService } from '../../../services/CounterService';
import { resolve } from 'inversify-react';
import {Logger} from '../../../util/logger';
// import MDBDatepicker from 'mdb-react-ui-kit/modules/MDBDatepicker';
import {
    MDBBtn, MDBCard, MDBRipple, MDBIcon, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';

const logger = Logger.create('Counter');


export default class Page_two extends React.PureComponent<{}, {}> {

    @resolve(CounterService)
    private _counterService: CounterService;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps, prevState) {
        logger.info('Example of logger');
        this._counterService.getData().subscribe((res) => {
            console.log(res);
        });
    }

    public render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                Page_two
                <div>
                    <MDBBtn>Primary</MDBBtn>
                    <MDBBtn className='mx-2' color='secondary'>
                        Secondary
                    </MDBBtn>
                    <MDBBtn color='success'>Success</MDBBtn>
                    <MDBBtn className='mx-2' color='danger'>
                        Danger
                    </MDBBtn>
                    <MDBBtn color='warning'>Warning</MDBBtn>
                    <MDBBtn className='mx-2' color='info'>
                        Info
                    </MDBBtn>
                    <MDBBtn className='text-dark' color='light'>
                        Light
                    </MDBBtn>
                    <MDBBtn className='mx-2' color='dark'>
                        Dark
                    </MDBBtn>
                    <MDBBtn color='link'>Link</MDBBtn>
                </div>
                <br/>
                <div>
                    <MDBBtn outline>Primary</MDBBtn>
                    <MDBBtn outline className='mx-2' color='secondary'>
                        Secondary
                    </MDBBtn>
                    <MDBBtn outline color='success'>
                        Success
                    </MDBBtn>
                    <MDBBtn outline className='mx-2' color='danger'>
                        Danger
                    </MDBBtn>
                    <MDBBtn outline color='warning'>
                        Warning
                    </MDBBtn>
                    <MDBBtn outline className='mx-2' color='info'>
                        Info
                    </MDBBtn>
                    <MDBBtn outline color='light'>
                        Light
                    </MDBBtn>
                    <MDBBtn outline className='mx-2' color='dark'>
                        Dark
                    </MDBBtn>
                    <MDBBtn outline color='link'>
                        Link
                    </MDBBtn>
                </div>
                <br/>
                <div>
                    <MDBBtn floating tag='a'>
                        <MDBIcon fas icon='download' />
                    </MDBBtn>
                    <MDBBtn floating size='lg' tag='a'>
                        <MDBIcon fab icon='facebook-f' />
                    </MDBBtn>
                    <MDBBtn className='mx-2' tag='a' color='success' outline floating>
                        <MDBIcon fas icon='star' />
                    </MDBBtn>
                    <MDBBtn color='danger' tag='a' floating>
                        <MDBIcon fas icon='magic' />
                    </MDBBtn>
                    <MDBBtn className='ms-2' tag='a' color='dark' floating>
                        <MDBIcon fab icon='apple' />
                    </MDBBtn>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/new/standard/nature/111.jpg' fluid alt='...' />
                            <a>
                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                            </a>
                        </MDBRipple>
                        <MDBCardBody>
                            <MDBCardTitle>Card title</MDBCardTitle>
                            <MDBCardText>
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </MDBCardText>
                            <MDBBtn href='#'>Button</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                    <div className="form-group">
                        <MDBInput label="Large input" size="lg" />
                        <MDBInput label="Medium input" />
                        <MDBInput label="Small input" size="sm" />
                    </div>
                </div>

            </div>
        );
    }
};
