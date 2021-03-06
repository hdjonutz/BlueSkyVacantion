import * as React from 'react';
import style from './table.less';
import classNames from 'classnames';
import {i18n} from '../../i18n/i18n';
import {Observable} from 'rxjs';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import {AuthorizedApiService} from '../../services/authorized_api_service';
import {ApiService} from '../../services/api_service';
import {encodePostBody} from '../../services/api_service';
import DialogEditRow from './dialogEdit';
import {IAttendands} from './forms';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment';
import { combineLatest } from 'rxjs';
import {map} from 'rxjs/operators';
import {numberToBinar} from '../../util/helpers';
import Button from '@mui/material/Button';


interface ITableProps {
    data:           any;
    formId:         string;
    configForms:    any;
    callback?:      Function;
}

interface ITableStates {
    data:           Array<any>,
    orig_data:      Array<any>,
    configForms:    any;
    editData:       any;
    referenceData:  any;
    filtersTable:   Array<{[key: string]: any}>;
    sortableTable:  Array<{[key: string]: any}>;
}

export default class Table extends React.Component<ITableProps, ITableStates> {

    private formIdData: any = {};

    @resolve(ApiService)                private apiService: ApiService;
    @resolve(AuthorizedApiService)      private authorizedApiService: AuthorizedApiService;

    constructor(props: ITableProps) {
        super(props);


        const data_formated = this.parseData(this.props.data, this.props.configForms, this.props.formId);
        this.state = {
            data:           data_formated,
            orig_data:      this.props.data,
            configForms:    this.props.configForms,
            editData:       null,
            referenceData:  null,
            filtersTable:   [],
            sortableTable:  [],
        };
        this.onClickDelete  = this.onClickDelete.bind(this);
        this.saveCallback   = this.saveCallback.bind(this);
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (prevProps.data && JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)
            || JSON.stringify(prevProps.configForms) !== JSON.stringify(this.props.configForms)) {

            let data_formated = this.parseData(this.props.data, this.props.configForms, this.props.formId);

            if (this.props.configForms) {
                const currentConfig = this.props.configForms[this.props.formId];
                const formsIdReference: Array<string> = currentConfig.ATTS
                    .filter((f: IAttendands) => f.REFERENCE)
                    .map((m: IAttendands) => m.REFERENCE.formid);

                if (formsIdReference && formsIdReference.length > 0) {
                    formsIdReference.map((formId: string, idx: number) => {
                        combineLatest(
                            [this.apiService
                                .get('getFormData', {formid: formId})
                                .pipe(map((res) => res.data || []))],
                        ).subscribe(([items]) => {
                            debugger;
                            this.formIdData[formId] = items;

                            if (formsIdReference.length === idx + 1) {
                                data_formated = this.parseData(this.props.data, this.props.configForms, this.props.formId);
                                console.log('********************************************', data_formated);
                                this.setState({
                                    orig_data:      this.props.data,
                                    data:           data_formated,
                                    configForms:    this.props.configForms,
                                    referenceData:  this.formIdData,
                                });
                            }
                        });
                    })
                } else {
                    this.setState({
                        orig_data:      this.props.data,
                        data:           data_formated,
                        configForms:    this.props.configForms,
                    });
                }

            }
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
                const isMultiSelect = currentConf.ATTS.find((att: IAttendands) => att.KEY === k).TYPE === 22;
                const isDate        = currentConf.ATTS.find((att: IAttendands) => att.KEY === k).TYPE === 23;
                const keyConf       = currentConf.ATTS.find((a: any) => a.KEY === k);

                if (d && !d.DisplayTranslatedData) {
                    d.DisplayTranslatedData = {};
                }

                if (keyConf && keyConf.OPTS) {
                    const opt = keyConf.OPTS.find((f: any) => f.VALUE.toString() === d[k].toString());
                    if ( isMultiSelect ) {
                        numberToBinar(d[k], keyConf.OPTS.length)
                            .map((e: string, idx: number) => {
                                if (!d.DisplayTranslatedData[k]) {
                                    d.DisplayTranslatedData[k] = [];
                                }
                                if (e === '1') {
                                    d.DisplayTranslatedData[k] = d.DisplayTranslatedData[k] ? d.DisplayTranslatedData[k] : '';
                                    d.DisplayTranslatedData[k].push(keyConf.OPTS[idx].TITEL_I18N
                                        ? i18n(keyConf.OPTS[idx].TITEL_I18N)
                                        : opt.TITEL);
                                }
                            });
                        if (d.DisplayTranslatedData && d.DisplayTranslatedData[k]) {
                            d.DisplayTranslatedData[k] = d.DisplayTranslatedData[k].join(', <br/>');
                        }
                    } else {
                        d.DisplayTranslatedData[k] = opt.TITEL_I18N ? i18n(opt.TITEL_I18N) : opt.TITEL;
                    }
                } else if (keyConf && isDate) {
                    d.DisplayTranslatedData[k] = moment(d[k]).format('MM.DD.YYYY');
                } else if (keyConf && keyConf.REFERENCE) {
                    const formid = keyConf.REFERENCE.formid;
                    const key = keyConf.REFERENCE.saveKey;
                    if (this.formIdData && this.formIdData[formid]) {
                        const tmp = this.formIdData[formid];
                        const values = tmp.find((t) => t[key] === d[keyConf.KEY]);   // keyConf.REFERENCE.displayKey;
                        const value = values ? values[keyConf.REFERENCE.displayKey] : '-?-';
                        d.DisplayTranslatedData[k] = value;
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

    filterAndSortable(): Array<any> {
        let result = this.state.data;
        this.state.filtersTable.map((f) => {
            result = result.filter((r) => r.DisplayTranslatedData[f.key].toString().indexOf(f.value.toString()) >= 0);
        });

        this.state.sortableTable.map((s) => {
            if (s.value === 1) {
                result.sort((a, b) => a.DisplayTranslatedData[s.key] > b.DisplayTranslatedData[s.key] ? 1 : -1);
            } else if (s.value === -1) {
                result.sort((a, b) => a.DisplayTranslatedData[s.key] > b.DisplayTranslatedData[s.key] ? -1 : 1);
            }
        });
        return result;
    }
    setStateSortable(filter) {
        const filtered = this.state.sortableTable.filter((f) => f.key !== filter.key && f.value !== 0);
        if (filter && filter.value !== 0) {
            filtered.push(filter);
        }
        this.setState({sortableTable: filtered});
    }

    setStateFilter(filter) {
        const filtered = this.state.filtersTable.filter((f) => f.key !== filter.key && f.value !== '');
        filtered.push(filter);
        this.setState({filtersTable: filtered});
    }

    getBodyTable() {
        return <React.Fragment>
            {this.filterAndSortable().map((tr, i: number) =>
                <tr key={i}>
                    {this.state.configForms && this.state.configForms[this.props.formId].ATTS
                        .map((k: any, m: number) =>
                            <td style={{display: k.HIDE_WEB ? 'none' : ''}} key={i + '_' + m}
                                dangerouslySetInnerHTML={{__html: tr.DisplayTranslatedData[k.KEY]}}>
                                {/* tr.DisplayTranslatedData[k.KEY] */}
                            </td>
                        )}
                    <td key={i + '_'}>
                        <Button onClick={() => this.setState({editData: tr})}
                                variant='outlined'
                                size='small'>Edit</Button> &nbsp;

                        <Button onClick={() => this.onClickDelete(tr)}
                                variant='outlined'
                                size='small'>Delete</Button>
                    </td>
                </tr>
            )}
            {this.state.data.length === 0 && this.state.configForms && <tr>
                <td colSpan={this.state.configForms[this.props.formId].ATTS.length + 1}
                    style={{textAlign: 'center'}}>
                    no data
                </td>
            </tr>}
        </React.Fragment>
    }

    getFiltersSortable(key: string): JSX.Element {
        const val: {[key: string]: any} = this.state.sortableTable.find((f) => f.key === key);
        return <React.Fragment>
            {!val && <div className={style.filterElem}
                          onClick={() => this.setStateSortable({key: key, value: 1})}>???</div>}{/* &#9633; updown simbol */}
            {val && val.value === 1 && <div className={style.filterElem}
                                            onClick={() => this.setStateSortable({key: key, value: -1})}>???</div>} {/* &#9650; up simbol */}
            {val && val.value === -1 && <div className={style.filterElem}
                                             onClick={() => this.setStateSortable({key: key, value: 0})}>???</div>}{/* &#9660; down simbol */}
        </React.Fragment>
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
                                    <th key={m} className={style.th} style={{display: kName.HIDE_WEB ? 'none' : ''}}>
                                        <div className={style.filter}>
                                            {i18n(kName.NAME_I18N)}
                                            <div className={style.sortableSimbol}>{this.getFiltersSortable(kName.KEY)}</div>
                                        </div>
                                        <div>
                                            <input onChange={(el) => {
                                                const filter = {
                                                    key: kName.KEY,
                                                    value: el.target.value,
                                                };
                                                this.setStateFilter(filter)
                                            }}/>
                                        </div>
                                    </th>)
                                }
                                <th className={style.th}>Count: {this.state.data.length} <br/>
                                    <Button onClick={() => this.setState({editData: []})}
                                            variant='outlined'
                                            size='small'>Add </Button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getBodyTable()}
                        </tbody>
                    </table>
                </div>
                {this.state.editData && <DialogEditRow title={this.state.editData ? 'Edit' : 'Add'}
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
