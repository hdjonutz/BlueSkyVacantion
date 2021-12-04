import * as React from 'react';
import style from './dialog-edit.less';
// import classNames from 'classnames';
import {i18n} from '../../i18n/i18n';
import {IConfigForms, IAttendands, IReference, validityFormLength} from './forms';
import classNames from 'classnames';

interface IGridRowProps {
    label:          string;
    value:          any;
    onChange:       Function;
    configForms:    IConfigForms;
    configItem:     IAttendands;
    options:        any;
    readOnly:       any;
    referenceData:  Array<any>;
}

interface IGridRowStates {
    value:      string;
    isValid:    boolean;
}

export default class GridRow extends React.PureComponent<IGridRowProps, IGridRowStates> {
    private oridData = this.props.value;
    constructor(props: IGridRowProps) {
        super(props);
        this.state = {
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
        // const isMultiplsSelect = this.props.configItem && this.props.configItem.TYPE === 22;
        const lenghtType    = validityFormLength(this.props.configItem.TYPE);

        if (lenghtType.type === 'number') {
            return isTid || (!isNaN(value) && (required ? value !== null : true));
        } else if (lenghtType.type === 'binary') {
            if (required) {
                return value && value.toString().length > 0 && parseInt(value, 2) >= 1;
            } else {
                return true;
            }
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
        console.log(this.state.value, this.oridData);
        const isChanged = (this.state.value ? this.state.value.toString() : this.state.value)
                            !== (this.oridData ? this.oridData.toString() : this.oridData);

        if (this.props.configItem.TYPE === 10) {
            return <input disabled={disabled}
                          type={'checkbox'}
                          checked={this.state.value ? this.state.value.toString() === '1' : false}
                          value={this.state.value || ''}
                          className={classNames(this.state.isValid ? '' : style.notValid,
                               isChanged ? style.changed: '')}
                          onChange={(el) => this.updateValue(el.target.checked ? '1' : '0')} />;
        } else {
            return <input disabled={disabled}
                          value={this.state.value || ''}
                          className={classNames(this.state.isValid ? '' : style.notValid,
                               isChanged ? style.changed: '')}
                          onChange={(el) => this.updateValue(el.target.value)} />;
        }
    }
    filterByRelatedFilter(referenceData: Array<any>, reference: IReference): Array<JSX.Element>{
        const keyToSave     = reference.saveKey;
        const keyDisplay    = reference.displayKey;
        const keyFilter     = reference.filter[0].f_name_;
        const keyValue      = reference.filter[0].f_value;
        // const keyOperatior  = reference.filter[0].f_operator;

        const tmp = referenceData.filter((f) => f[keyFilter] === keyValue);

        return tmp.map((o: any, idx: number) =>
                <option key={idx}
                        value={o[keyToSave]} >
                    {o[keyDisplay]}
                </option>
            )
    }

    getSelect() {
        console.log(this.state.value, this.props.options);
        const disabled = this.props.readOnly === 1; // key
        const isChanged = (this.state.value ? this.state.value.toString() : this.state.value)
                            !== (this.oridData ? this.oridData.toString() : this.oridData);
        const reference = this.props.configItem && this.props.configItem.REFERENCE;
        const isMultiplsSelect = this.props.configItem && this.props.configItem.TYPE === 22;

        return <select disabled={disabled}
                       multiple={isMultiplsSelect}
                       className={classNames(this.state.isValid ? '' : style.notValid,
                           isChanged ? style.changed : '',
                           isMultiplsSelect ? style.multiSelect : ''
                       )}
                       defaultValue={(this.state.value !== null && this.state.value !== undefined)
                           ? this.state.value.toString()
                           : this.props.options[0].VALUE}
                       onChange={(el) => {
                           const value = isMultiplsSelect
                               ? Array.from(el.target.options)
                                   .map((el) => el.selected ? '1' : '0')
                                   .join('')
                               : el.target.value;
                           this.updateValue(value);
                       }} >
                        {!reference && this.props.options.map((o: any, idx: number) =>
                            <option key={idx}
                                    value={o.VALUE} >
                                {i18n(o.TITEL_I18N)}
                                </option>
                        )}
                        {reference && this.filterByRelatedFilter(this.props.referenceData, reference)}
            </select>
    }

    getTextArea() {
    }

    getImage() {
    }

    getInputType(): JSX.Element {
        console.log(this.props.options);
        return this.props.options || this.props.configItem.REFERENCE
            ? this.getSelect()
            : this.getInput()
    }

    render() {
        return (
            <div className={style.flex}>
                <div className={style.full}>{this.props.label}</div>
                <div className={style.full}>
                    {this.getInputType()}
                </div>
            </div>
        )
    }
}
