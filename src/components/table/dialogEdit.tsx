import * as React from 'react';
import style from './dialog-edit.less';
import classNames from 'classnames';
import {i18n} from "../../i18n/i18n";
import {Observable} from 'rxjs';
import 'reflect-metadata';

import ModalYesNoDialog from '../common/modal-yes-no-dialog';
import GridRow from './grid-row';

interface DialogEditRowProps {
    title:      string;
    data:       any;
    isOpen:     boolean;
    callback:   Function;
}

interface DialogEditRowStates {
    object: any;
}

export default class DialogEditRow extends React.Component<DialogEditRowProps, DialogEditRowStates> {

    constructor(props: DialogEditRowProps) {
        super(props);

        this.state = {
            object: JSON.parse(JSON.stringify(this.props.data)),
        };
    }

    onChangeValue(value: any) {
        debugger;
    }

    getDates(): JSX.Element {
        return (
            <div className={classNames(style.container, style.column)}>
                <GridRow label={'tid'} value={this.state.object['tid']} onChange={this.onChangeValue} />
                <GridRow label={'tid2'} value={this.state.object['name']} onChange={this.onChangeValue} />
                <GridRow label={'tid3'} value={this.state.object['vorname']} onChange={this.onChangeValue} />
                <GridRow label={'tid4'} value={this.state.object['email']} onChange={this.onChangeValue} />
                <GridRow label={'tid5'} value={this.state.object['pass']} onChange={this.onChangeValue} />
            </div>
        )
    }

    render() {
        const component = this.getDates();
        return(
            <ModalYesNoDialog title={this.props.title}
                              component={component}
                              displayModal={this.props.isOpen}
                              callback={this.props.callback} />
        )
    }
}
