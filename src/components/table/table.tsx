import * as React from 'react';
import style from './table.less';
import classNames from 'classnames';
import {i18n} from "../../i18n/i18n";
import {Observable} from 'rxjs';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import {AuthorizedApiService} from '../../services/authorized_api_service';
import {ApiService} from '../../services/api_service';
import {encodePostBody} from '../../services/api_service';
import DialogEditRow from "./dialogEdit";

interface TableProps {
    data:           any;
    formId:         string;
    configForms:    any;
    callback?:      Function;
}

interface TableStates {
    data:           Array<any>,
    orig_data:      Array<any>,
    configForms:    any;
    editData:       any;
}

export default class Table extends React.Component<TableProps, TableStates> {

    @resolve(ApiService)                private apiService: ApiService;
    @resolve(AuthorizedApiService)      private authorizedApiService: AuthorizedApiService;

    constructor(props: TableProps) {
        super(props);


        const data_formated = this.parseData(this.props.data, this.props.configForms, this.props.formId);
        this.state = {
            data:           data_formated,
            orig_data:      this.props.data,
            configForms:    this.props.configForms,
            editData:       null,
        };
        this.onClickDelete  = this.onClickDelete.bind(this);
        this.onClickAddEdit = this.onClickAddEdit.bind(this);
        this.saveCallback   = this.saveCallback.bind(this);
    }

    componentDidMount() {}

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.data && JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)
                || JSON.stringify(nextProps.configForms) !== JSON.stringify(this.props.configForms)) {
            const data_formated = this.parseData(nextProps.data, nextProps.configForms, nextProps.formId);
            this.setState({
                orig_data:  nextProps.data,
                data:       data_formated,
                configForms: nextProps.configForms,
            });
        }
    }

    parseData(data: any, allConfigs: any, formId: string): Array<any> {
        if (!data || !allConfigs) {
            return [];
        }
        const currentConf = allConfigs[formId];

        const dataFormated = JSON.parse(JSON.stringify(data));
        dataFormated.map((d: any) => {
            Object.keys(d).map((k) => {
                if (d && !d.DisplayTranslatedData) {
                    d.DisplayTranslatedData = {};
                }
                const keyConf = currentConf.ATTS.find((a: any) => a.KEY === k);
                if (keyConf && keyConf.OPTS) {
                    const opt = keyConf.OPTS.find((f: any) => f.VALUE.toString() === d[k].toString());
                    d['DisplayTranslatedData'][k] = i18n(opt.TITEL_I18N);
                } else {
                    d['DisplayTranslatedData'][k] = d[k];
                }
            });
        });
        return dataFormated;
    }

    onClickDelete(data: any) {
        const body = this.state.orig_data.find((f) => f.tid === data.tid);
        const payload = encodePostBody(body);
        this.authorizedApiService.post('delFormItem', {formid: this.props.formId}, payload)
            .subscribe((res) => {
                if (this.props.callback) {
                    this.props.callback();
                }
            });
    }

    onClickAddEdit(data?: any) {

    }

    saveCallback(action: boolean) {
        if (action) {
            // save
            debugger;
            this.setState({editData: null});
        } else {
            this.setState({editData: null});
        }
    }


    render() {
        return(
            <React.Fragment>
                <div className={classNames(style.container, style.column)}>
                    <table>
                        <thead>
                            <tr>
                                {this.state.configForms && this.state.configForms[this.props.formId].ATTS
                                    .map((kName: string, m: number) =>
                                    <th key={m} className={style.th}>
                                        <div>{i18n(kName.NAME_I18N)}</div><div><input /></div>
                                    </th>)
                                }
                                <th className={style.th}>Count: {this.state.data.length} <br/>
                                    <span onClick={() => this.setState({editData: []})}>Add</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((tr, i: number) =>
                                <tr key={i}>
                                    {this.state.configForms && this.state.configForms[this.props.formId].ATTS
                                        .map((k: any, m: number) => <td key={i + '_' + m}>{tr.DisplayTranslatedData[k.KEY]}</td>)}
                                    <td key={i + '_'}>
                                        <span onClick={() => this.setState({editData: tr})} >Edit &nbsp;</span>
                                        | <span onClick={() => this.onClickDelete(tr)}>&nbsp;Delete</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {this.state.editData && <DialogEditRow title={this.state.editData ? 'Edit': 'Add'}
                                                       data={this.state.editData}
                                                       isOpen={this.state.editData !== null}
                                                       callback={this.saveCallback}
                                                       configForms={this.props.configForms}
                                                       formId={this.props.formId}
                />}
            </React.Fragment>
        )
    }
}