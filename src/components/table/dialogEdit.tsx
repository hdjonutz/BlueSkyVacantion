import * as React from 'react';
import style from './dialog-edit.less';
import classNames from 'classnames';
import {i18n} from "../../i18n/i18n";
import {Observable} from 'rxjs';
import 'reflect-metadata';

import ModalYesNoDialog from '../common/modal-yes-no-dialog';
import GridRow from './grid-row';
import {IConfigForms, IRowAttendands} from './forms';

interface DialogEditRowProps {
    title:          string;
    data:           any;
    isOpen:         boolean;
    callback:       Function;
    configForms:    IConfigForms;
    formId:         string;
}

interface DialogEditRowStates {
    object: any;
    config: IRowAttendands;
}

export default class DialogEditRow extends React.Component<DialogEditRowProps, DialogEditRowStates> {

    constructor(props: DialogEditRowProps) {
        super(props);

        this.state = {
            object:         JSON.parse(JSON.stringify(this.props.data)),
            config:         this.props.configForms[this.props.formId],
        };

        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue(newData: any) {
        const object = this.state.object;
        object[newData.target] = newData.value;
        this.setState({ object });
    }

    getDates(): JSX.Element {
        return (
            <div className={classNames(style.container, style.column)}>
                {this.state.config.ATTS.map((r, idx: number) =>
                    <GridRow label={i18n(r.NAME_I18N)}
                             value={this.state.object[r.KEY]}
                             onChange={this.onChangeValue}
                             configForms={this.props.configForms}
                             configItem={r}
                             options={r.OPTS}
                             readOnly={r.READONLY}
                             key={idx}
                    />
                )}
            </div>
        )
    }

    render() {
        console.log(this.state);
        debugger;
        const component = this.getDates();
        return(
            <ModalYesNoDialog title={this.props.title}
                              component={component}
                              displayModal={this.props.isOpen}
                              callback={(action: boolean) => this.props.callback(action ? this.state.object : null)} />
        )
    }
}
