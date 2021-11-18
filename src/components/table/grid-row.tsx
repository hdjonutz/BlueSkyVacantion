import * as React from 'react';
import style from './dialog-edit.less';
import classNames from 'classnames';
import {i18n} from "../../i18n/i18n";

interface GridRowProps {
    label:      string;
    value:      string;
    onChange:   Function;
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
    }

    render() {
        const disabled = this.props.label === 'tid'; // key
        const isValid = false;
        return (
            <div className={style.flex}>
                <div className={style.full}>{this.props.label}</div>
                <div className={style.full}><input disabled={disabled}
                                                   value={this.state.value}
                                                   className={isValid ? '' : style.notValid}
                                                   onChange={(el) => this.props.onChange(el.target.value)}/></div>
            </div>
        )
    }
}
