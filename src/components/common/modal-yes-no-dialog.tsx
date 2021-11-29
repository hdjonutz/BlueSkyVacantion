import * as React from 'react';
import 'reflect-metadata';
import {MDBBtn, MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter} from 'mdb-react-ui-kit';

interface ModalYesNoDialogProps {
    title:          string;
    component:      any;
    displayModal:   boolean;
    disabled:       boolean;
    callback:       Function;
}

export default class ModalYesNoDialog extends React.PureComponent<ModalYesNoDialogProps, {displayModal: boolean, message: string}> {

    constructor(props: any) {
        super(props);
        this.state ={
            displayModal:   this.props.displayModal
        };
        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow(action?: boolean) {
        this.setState({displayModal: false});
        if (this.props.callback) {
            this.props.callback(action);
        }
    }

    public render() {
        return (
            <MDBModal staticBackdrop tabIndex='-1' show={this.state.displayModal}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{this.props.title}</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => this.toggleShow()}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>{this.props.component}</MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={() => this.toggleShow()}>
                                Close
                            </MDBBtn>
                            <MDBBtn color='secondary' disabled={this.props.disabled} onClick={() => this.toggleShow(true)}>
                                Save
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        );
    }
}

export function showDialogAsComponent (title: string, component: JSX.Element, data: any, displayModal: boolean, callback: Function) {
    return <ModalYesNoDialog title={title} component={component} data={data} displayModal={displayModal} callback={callback} />
}