import * as React from 'react';
import style from './dialog-edit.less';
import classNames from 'classnames';
import {i18n} from '../../i18n/i18n';
import 'reflect-metadata';

import ModalYesNoDialog from '../common/modal-dialog-yes-no';
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
    isOpen:     boolean;
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
            isOpen:         this.props.isOpen
        };

        this.onChangeValue      = this.onChangeValue.bind(this);
        this.areDifferentValues = this.areDifferentValues.bind(this);
    }

    shouldComponentUpdate(nextProps: Readonly<IDialogEditRowProps>, nextState: Readonly<IDialogEditRowStates>, nextContext: any): boolean {
        if (this.state.isOpen !== nextProps.isOpen || this.state.disabled !== nextState.disabled) {
            this.setState({isOpen: nextProps.isOpen});
            return true;
        } else {
            return false;
        }
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
        debugger;
        return (
            <div className={classNames(style.container, style.column)}>
                {this.state.config.ATTS.map((r: IAttendands, idx: number) => {
                    {console.log(idx)}
                    return <GridRow label={i18n(r.NAME_I18N)}
                             value={this.state.object[r.KEY]}
                             onChange={this.onChangeValue}
                             configForms={this.props.configForms}
                             configItem={r}
                             options={r.OPTS}
                             readOnly={r.READONLY}
                             referenceData={r.REFERENCE ? this.props.referenceData[r.REFERENCE.formid] : null}
                             key={idx}
                    />
                })}
            </div>
        )
    }

    parseValues() {
        const data = this.state.object;
        const tmp = [];
        Object.keys(data).map((k) => {
            if (k !== 'DisplayTranslatedData' && k !== 'tid') {
                const conf = this.state.config.ATTS.find((a) => a.KEY === k);
                if (conf && conf.TYPE === 23) {  // *DATE_BIGINT*
                    tmp[k] = !isNaN(+data[k]) ? +data[k] : data[k].setHours(0, 0, 0, 0);
                } else {
                    tmp[k] = data[k];
                }
            } else {
                tmp[k] = data[k];
            }
        });
        return tmp;
    }

    render() {
        const component = this.getDates();
        console.log(this.state, this.props);
        return(
            <ModalYesNoDialog title={this.props.title}
                              component={component}
                              displayModal={this.props.isOpen}
                              disabledSaveBtn={this.state.disabled}
                              data={this.state}
                              callback={(action: boolean) => {
                                  this.setState({isOpen: false});
                                  const parseValues = this.parseValues();
                                  debugger;
                                  this.props.callback(action ? parseValues : null);
                              }} />
        )
    }
}
