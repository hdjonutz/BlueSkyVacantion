import React, { useState } from 'react';
import {i18n} from '../../i18n/i18n';
import {ApiServiceStatus, ApiServiceState} from '../../services/api_service_status';
import {showComponentAsDialog} from '../pages/ui/dialog/dialog';
import {
    MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";

interface ApiErrorDialogProps {
    status: ApiServiceStatus;

    onAfterClose(): void;
}

interface ApiErrorDialogState {
    isOpen: boolean;
}


export default function ApiErrorDialog() {
    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    return (
        <React.Fragment>
            {/* <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn> */}
            <MDBModal show={basicModal} getOpenState={(e: any) => setBasicModal(e)} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{ApiServiceState.formatMessage(this.props.status.state)}</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>

                        <MDBModalBody>
                            <strong>{i18n('kommunikations_fehler.anfrage')}</strong>
                            <pre className={style.details}>{this.props.status.lastMethod} {this.props.status.lastUrl}</pre>
                            <strong>{i18n('kommunikations_fehler.antwort')}</strong>
                            <pre className={style.details}>{this.props.status.responseMessage}</pre>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </React.Fragment>
    );
}

// https://www.valentinog.com/blog/hooks/

// export default class ApiErrorDialog extends React.Component<ApiErrorDialogProps, ApiErrorDialogState> {
//
//     constructor(props: ApiErrorDialogProps) {
//         super(props);
//
//         this.state = {isOpen: true};
//     }
//
//     const [basicModal, setBasicModal] = useState(false);
//
//     const toggleShow = () => setBasicModal(!basicModal);
//
//     render() {
//         // return (
//         //     <ModalDialog
//         //         onAfterClose={this.props.onAfterClose}
//         //         title={ApiServiceState.formatMessage(this.props.status.state)}
//         //         isOpen={this.state.isOpen}
//         //         width={1000}
//         //         buttons={[
//         //             {
//         //                 title: i18n('aktionen.schliessen'),
//         //                 autoFocus: true,
//         //                 onClick: () => this.setState({isOpen: false}),
//         //             }
//         //         ]}
//         //     >
//         //         <strong>{i18n('kommunikations_fehler.anfrage')}</strong>
//         //         <pre className={style.details}>{this.props.status.lastMethod} {this.props.status.lastUrl}</pre>
//         //         <strong>{i18n('kommunikations_fehler.antwort')}</strong>
//         //         <pre className={style.details}>{this.props.status.responseMessage}</pre>
//         //     </ModalDialog>
//         // );
//         return (
//             <MDBModal show={basicModal} getOpenState={(e: any) => setBasicModal(e)} tabIndex='-1'>
//                 <MDBModalDialog>
//                     <MDBModalContent>
//                         <MDBModalHeader>
//                             <MDBModalTitle>Modal title</MDBModalTitle>
//                             <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
//                         </MDBModalHeader>
//                         <MDBModalBody>...Somthimg to here ....etc</MDBModalBody>
//
//                         <MDBModalFooter>
//                             <MDBBtn color='secondary' onClick={toggleShow}>
//                                 Close
//                             </MDBBtn>
//                             <MDBBtn>Save changes</MDBBtn>
//                         </MDBModalFooter>
//                     </MDBModalContent>
//                 </MDBModalDialog>
//             </MDBModal>
//         )
//     }
// }

export function showApiErrorDialog(status: ApiServiceStatus): void {
    showComponentAsDialog((onAfterClose) => <ApiErrorDialog status={status} onAfterClose={onAfterClose} />)
}
