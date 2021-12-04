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
import {IAttendands} from "./forms";

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
    referenceData:  any;
}

export default class Table extends React.Component<TableProps, TableStates> {

    private formIdData = {};

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
            referenceData:  null,
        };
        this.onClickDelete  = this.onClickDelete.bind(this);
        this.saveCallback   = this.saveCallback.bind(this);
    }

    componentDidUpdate(prevProps: TableProps, prevState: TableStates, snapshot) {

        if (prevProps.data && JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)
            || JSON.stringify(prevProps.configForms) !== JSON.stringify(this.props.configForms)) {

            const data_formated = this.parseData(this.props.data, this.props.configForms, this.props.formId);

            if (this.props.configForms) {
                const currentConfig = this.props.configForms[this.props.formId];
                const formsIdReference: Array<string> = currentConfig.ATTS
                    .filter((f: IAttendands) => f.REFERENCE)
                    .map((m: IAttendands) => m.REFERENCE.formid);

                formsIdReference.map((formId: string, idx: number) => {
                    Observable.combineLatest(
                        this.apiService.get('getFormData', {formid: formId}).map((res) => res.data || []),
                    ).subscribe((items) => {
                        this.formIdData[formId] = items[0];
                        debugger;
                        if (formsIdReference.length === idx + 1) {
                            this.setState({
                                orig_data:      this.props.data,
                                data:           data_formated,
                                configForms:    this.props.configForms,
                                referenceData:  this.formIdData,
                            });
                        }
                    });
                })
            }
        }
    }

    // componentWillUpdate(nextProps: TableProps, nextState: TableStates) {}

    parseData(data: any, allConfigs: any, formId: string): Array<any> {
        if (!data || !allConfigs) {
            return [];
        }
        const currentConf = allConfigs[formId];
        const dataFormated = JSON.parse(JSON.stringify(data));

        dataFormated.map((d: any) => {
            Object.keys(d).map((k) => {
                const isMultiSelect = currentConf.ATTS.find((att: IAttendands) => att.KEY === k).TYPE === 22;
                const keyConf       = currentConf.ATTS.find((a: any) => a.KEY === k);

                if (d && !d.DisplayTranslatedData) {
                    d.DisplayTranslatedData = {};
                }

                if (keyConf && keyConf.OPTS) {
                    const opt = keyConf.OPTS.find((f: any) => f.VALUE.toString() === d[k].toString());
                    if ( isMultiSelect ) {
                        d[k].toString().split('').map((e: string, idx: number) => {
                            if (e === '1') {
                                d.DisplayTranslatedData[k] = d.DisplayTranslatedData[k] ? d.DisplayTranslatedData[k] : '';
                                d.DisplayTranslatedData[k] += keyConf.OPTS[idx].TITEL_I18N
                                    ? i18n(keyConf.OPTS[idx].TITEL_I18N)
                                    : opt.TITEL;
                                d.DisplayTranslatedData[k] += ', \n';
                            }
                        });
                    } else {
                        d.DisplayTranslatedData[k] = i18n(opt.TITEL_I18N) || opt.TITEL;
                    }
                } else {
                    d.DisplayTranslatedData[k] = d[k];
                }
            });
        });
        return dataFormated;
    }

    onClickDelete(data: any) {
        const body = this.state.orig_data.find((f) => f.tid === data.tid);
        const payload = encodePostBody(body);
        this.apiService.post('delFormItem', {formid: this.props.formId}, payload)
            .subscribe((res) => {
                if (this.props.callback) {
                    this.props.callback();
                }
            });
    }

    saveCallback(data: any) {
        if (data) {
            // save
            let payload = data;
            payload.tid = payload.tid || 0;
            payload = encodePostBody(payload);
            this.authorizedApiService.post('setFormItem', {formid: this.props.formId}, payload)
                .subscribe((res) => {
                    if (this.props.callback) {
                        this.props.callback();
                    }
                });

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
                                    .map((kName: any, m: number) =>
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
                                                       referenceData={this.state.referenceData}
                                                       isOpen={this.state.editData !== null}
                                                       callback={this.saveCallback}
                                                       configForms={this.props.configForms}
                                                       formId={this.props.formId}
                />}
            </React.Fragment>
        )
    }
}