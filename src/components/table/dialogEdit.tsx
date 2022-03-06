import * as React from 'react';
import style from './dialog-edit.less';
import classNames from 'classnames';
import {i18n} from "../../i18n/i18n";
import {Observable} from 'rxjs';
import 'reflect-metadata';

import ModalYesNoDialog from '../common/modal-yes-no-dialog.tsx';
import GridRow from './grid-row';
import {IAttendands, IConfigForms, IRowAttendands} from './forms';

interface IDialogEditRowProps {
    title:          string;
    data:           any;
    isOpen:         boolean;
    callback:       Function;
    configForms:    IConfigForms;
    formId:         string;
    referenceData:  Array<IConfigForms>;
}

interface IDialogEditRowStates {
    object:     any;
    config:     IRowAttendands;
    disabled:   boolean;
}

export default class DialogEditRow extends React.Component<IDialogEditRowProps, IDialogEditRowStates> {

    constructor(props: IDialogEditRowProps) {
        super(props);

        const data      = this.props.data ? JSON.parse(JSON.stringify(this.props.data)) : []    ;
        const config    = this.props.configForms[this.props.formId];

        this.state = {
            object:         data,
            config:         config,
            disabled:       true,
        };

        this.onChangeValue      = this.onChangeValue.bind(this);
        this.areDifferentValues = this.areDifferentValues.bind(this);
    }

    areDifferentValues(): boolean {
        return Object.entries(this.props.data).toString() !== Object.entries(this.state.object).toString();
    }

    onChangeValue(newData: any, isValid: boolean) {
        const object = this.state.object;
        object[newData.target] = newData.value;
        const differentValues = this.areDifferentValues();
        const changed = isValid && differentValues;
        this.setState({ object, disabled: !changed });
    }

    getDates(): JSX.Element {
        return (
            <div className={classNames(style.container, style.column)}>
                {this.state.config.ATTS.map((r: IAttendands, idx: number) =>
                    <GridRow label={i18n(r.NAME_I18N)}
                             value={this.state.object[r.KEY]}
                             onChange={this.onChangeValue}
                             configForms={this.props.configForms}
                             configItem={r}
                             options={r.OPTS}
                             readOnly={r.READONLY}
                             referenceData={r.REFERENCE ? this.props.referenceData[r.REFERENCE.formid] : null}
                             key={idx}
                    />
                )}
            </div>
        )
    }

    render() {
        const component = this.getDates();
        console.log(this.state, this.props);
        return(
            <ModalYesNoDialog title={this.props.title}
                              component={component}
                              displayModal={this.props.isOpen}
                              disabled={this.state.disabled}
                              callback={(action: boolean) => this.props.callback(action ? this.state.object : null)} />
        )
    }
}
