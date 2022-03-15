import * as React from 'react';
import 'reflect-metadata';
import {
    MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";

interface ModalInfoDialogProps {
    message:        string;
    displayModal?:   boolean;
}

export default class ModalInfoDialog extends React.PureComponent<ModalInfoDialogProps, {displayModal: boolean}> {

    constructor(props: any) {
        super(props);
        this.state = {displayModal: this.props.displayModal};
    }
    toggleShow() {
        this.state = {displayModal: false};
    }
    public render() {
        return (
                <MDBModal staticBackdrop tabIndex={'-1'} show={this.state.displayModal}>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Information</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={this.toggleShow.bind(this)}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>{this.props.message}</MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={this.toggleShow.bind(this)}> Close </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
        );
    }
}

export function showDialogInfo (message: string): void {
    <ModalInfoDialog message={message} />;
}
