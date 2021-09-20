import * as React from 'react';
import style from './api-error-dialog.less';
import ModalDialog from '../ui/dialog/modal-dialog';
import {i18n} from '../../i18n/i18n';
import {ApiServiceStatus, ApiServiceState} from '../../services/api_service_status';
import {showComponentAsDialog} from '../ui/dialog/dialog';

interface ApiErrorDialogProps {
    status: ApiServiceStatus;

    onAfterClose(): void;
}

interface ApiErrorDialogState {
    isOpen: boolean;
}

export default class ApiErrorDialog extends React.Component<ApiErrorDialogProps, ApiErrorDialogState> {
    constructor(props: ApiErrorDialogProps) {
        super(props);

        this.state = {isOpen: true};
    }

    render() {
        return (
            <ModalDialog
                onAfterClose={this.props.onAfterClose}
                title={ApiServiceState.formatMessage(this.props.status.state)}
                isOpen={this.state.isOpen}
                width={1000}
                buttons={[
                    {
                        title: i18n('aktionen.schliessen'),
                        autoFocus: true,
                        onClick: () => this.setState({isOpen: false}),
                    }
                ]}
            >
                <strong>{i18n('kommunikations_fehler.anfrage')}</strong>
                <pre className={style.details}>{this.props.status.lastMethod} {this.props.status.lastUrl}</pre>
                <strong>{i18n('kommunikations_fehler.antwort')}</strong>
                <pre className={style.details}>{this.props.status.responseMessage}</pre>
            </ModalDialog>
        );
    }
}

export function showApiErrorDialog(status: ApiServiceStatus): void {
    showComponentAsDialog((onAfterClose) => <ApiErrorDialog status={status} onAfterClose={onAfterClose} />)
}
