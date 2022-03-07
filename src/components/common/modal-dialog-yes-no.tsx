import * as React from 'react';
import 'reflect-metadata';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {DialogContentText} from '@mui/material';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';

interface ModalYesNoDialogProps {
    title:          string;
    component:      any;
    displayModal:   boolean;
    callback:       Function;
    data:           any;
    disabled:       boolean;
}

export default class ModalYesNoDialog extends React.PureComponent<ModalYesNoDialogProps, {displayModal: boolean}> {

    constructor(props: any) {
        super(props);

        this.state = {
            displayModal:   this.props.displayModal,
        };
        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow(action?: boolean) {
        this.setState({displayModal: false});
        if (this.props.callback) {
            this.props.callback(action);
        }
    }

    // shouldComponentUpdate(nextProps: Readonly<ModalYesNoDialogProps>, nextState: Readonly<{ displayModal: boolean; message: string }>, nextContext: any): boolean {
    //     if (this.state.displayModal !== nextProps.displayModal) {
    //         this.setState({displayModal: nextProps.displayModal});
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    PaperComponent(props: PaperProps) {
        return (
            <Draggable
                handle='#draggable-dialog-title'
                cancel={'[class*="MuiDialogContent-root"]'}
            >
                <Paper {...props} />
            </Draggable>
        );
    }

    render() {
        console.log(this);
        return (
            <Dialog
                open={this.state.displayModal}
                onClose={() => {}}
                PaperComponent={this.PaperComponent}
                aria-labelledby='draggable-dialog-title'
            >
                <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
                    Subscribe
                    <IconButton
                        aria-label='close'
                        onClick={() => this.toggleShow()}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{
                                marginTop: 12,
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                minWidth: 450,
                        }}
                    >
                        {this.props.component}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => this.toggleShow()}>
                        Cancel
                    </Button>
                    <Button onClick={() => this.toggleShow(true)} disabled={this.props.disabled}>Save</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// export function showDialogAsComponent (title: string, component: JSX.Element, data: any, displayModal: boolean, callback: Function) {
//     return <ModalYesNoDialog title={title} component={component} data={data} displayModal={displayModal} callback={callback} />
// }
