import * as React from 'react';
import style from './dialog-edit.less';
// import classNames from 'classnames';
import {i18n} from "../../i18n/i18n";
import {IConfigForms, validityFormLength} from './forms';
import classNames from "classnames";

interface GridRowProps {
    label:      string;
    value:      any;
    onChange:   Function;
    configForms: IConfigForms;
    configItem: IAttendands;
    options:    any;
    readOnly:   any;
}

interface GridRowStates {
    value:      string;
    isValid:    boolean;
}

export default class GridRow extends React.PureComponent<GridRowProps, GridRowStates> {
    private oridData = this.props.value;
    constructor(props: any) {
        super(props);
        this.state={
            value:      this.props.value,
            isValid:    this.checkValidity(this.props.value),
        };

        this.getInput   = this.getInput.bind(this);
        this.getSelect  = this.getSelect.bind(this);
    }

    // componentDidUpdate(nextProps: GridRowProps, nextState: GridRowStates) {
    //     if (this.props.value !== nextProps.value){
    //         this.setState({value: nextProps.value});
    //     }
    // }

    updateValue(value: any) {
        const isValid = this.checkValidity(value);
        this.setState({value, isValid});
        this.props.onChange({value: value, target: this.props.configItem.KEY}, isValid);
    }

    checkValidity(value: any) {
        const isTid         = this.props.configItem.KEY === 'tid';
        const required      = this.props.configItem.REQUIRED === 'REQUIRED';
        const lenghtType    = validityFormLength(this.props.configItem.TYPE);

        if (lenghtType.type === 'number') {
            return isTid || (!isNaN(value) && (required ? value !== null : true));
        } else if ([25, 50, 100].indexOf(+lenghtType.type) >= 0) {
            if (required) {
                return value && value.length > 0 && value.length <= +lenghtType.type;
            } else {
                return value ? value.length <= +lenghtType.type : true;
            }
        } else if (lenghtType.type === Infinity) {
            return true;
        }
        return false;
    }

    getInput() {
        const disabled = this.props.readOnly === 1; // key
        const isChanged = this.state.value.toString() !== this.oridData.toString();
        return <input disabled={disabled}
               value={this.state.value || ''}
               className={classNames(this.state.isValid ? '' : style.notValid,
                   isChanged ? style.changed: '')}
               onChange={(el) => this.updateValue(el.target.value)} />;
    }

    getSelect() {
        console.log(this.state.value, this.props.options);
        const disabled = this.props.readOnly === 1; // key
        const isChanged = this.state.value.toString() !== this.oridData.toString();
        return <select disabled={disabled}
                       className={classNames(this.state.isValid ? '' : style.notValid,
                           isChanged ? style.changed: '')}
                       defaultValue={(this.state.value !== null || this.state.value !== undefined)
                           ? this.state.value.toString()
                           : this.props.options[0].VALUE}
                       onChange={(el) => this.updateValue(el.target.value)} >
                        {this.props.options.map((o: any, idx: number) =>
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
