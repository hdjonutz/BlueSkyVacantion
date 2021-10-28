import * as React from 'react';
import 'reflect-metadata';
import {MDBBtn, MDBInput, MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter} from 'mdb-react-ui-kit';
import {showComponentAsDialog} from "../pages/ui/dialog/dialog";

interface ModalInfoDialogProps {
    message:        string;
    displayModal:   boolean;
    callback:       Function;
}

export default class ModalInfoDialog extends React.PureComponent<ModalInfoDialogProps, {displayModal: boolean, message: string}> {

    constructor(props: any) {
        super(props);
        this.state={
            displayModal:   this.props.displayModal,
            message:        this.props.message,
        };
        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow() {
        this.setState({displayModal: false});
        if (this.props.callback) {
            this.props.callback();
        }
    }

    public render() {
        return (<MDBModal staticBackdrop tabIndex='-1' show={this.state.displayModal}>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Information</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={this.toggleShow.bind(this)}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>{this.props.message}</MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={this.toggleShow.bind(this)}>
                                    Close
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
        );
    }
}

export function showDialogInfo (message: string, displayModal: boolean, callback: Function) {
    return <ModalInfoDialog message={message} displayModal={displayModal} callback={callback} />
}