import * as React from 'react';
import style from './dialog-edit.less';
import classNames from 'classnames';
import {i18n} from "../../i18n/i18n";
import {IConfigForms, IAttendands, validityFormLength} from './forms';



interface GridRowProps {
    label:      string;
    value:      string;
    onChange:   Function;
    configForms: IConfigForms;
    configItem: IAttendands;
    options:    any;
    readOnly:   any;
}

interface GridRowStates {
    value:  string;
}

export default class GridRow extends React.PureComponent<GridRowProps, GridRowStates> {
    constructor(props: any) {
        super(props);
        this.state={
            value:  this.props.value
        };

        this.getInput   = this.getInput.bind(this);
        this.getSelect  = this.getSelect.bind(this);
    }

    checkValidity(value: any) {
        const lenghtType = validityFormLength(this.props.configItem.TYPE);

        if (lenghtType.type === 'number') {
            return !isNaN(value);
        } else if ([25, 50, 100].indexOf(+lenghtType.type) >= 0) {
            return value.length <= +lenghtType.type;
        } else if (lenghtType.type === Infinity) {
            return true;
        }
        return false;
    }

    getInput() {
        const disabled = this.props.readOnly === 1; // key
        const isValid = this.checkValidity(this.state.value);
        return <input disabled={disabled}
               value={this.state.value}
               className={isValid ? '' : style.notValid}
               onChange={(el) => this.props.onChange({value: el.target.value, target: this.props.configItem.KEY})} />;
    }

    getSelect() {
        const disabled = this.props.readOnly === 1; // key
        const isValid = this.checkValidity(this.state.value);
        return <select disabled={disabled}
                       className={isValid ? '' : style.notValid}
                       defaultValue={this.state.value.toString()}
                       onChange={(el) => this.props.onChange({value: el.target.value, target: this.props.configItem.KEY})} >
                        {this.props.options.map((o, idx) =>
                            <option key={idx}
                                    value={o.VALUE} >
                                {i18n(o.TITEL_I18N)}
                                </option>
                        )
                    }
            </select>
    }

    getTextArea() {

    }

    getImage() {

    }
    render() {
        return (
            <div className={style.flex}>
                <div className={style.full}>{this.props.label}</div>
                <div className={style.full}>
                    {this.props.options
                        ? this.getSelect()
                        : this.getInput()
                    }
                </div>
            </div>
        )
    }
}
