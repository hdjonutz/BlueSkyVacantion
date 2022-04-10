import React, { useState, useCallback } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community';

import '@inovua/reactdatagrid-community/index.css'
import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {i18n} from '../../../i18n/i18n';
import routes from '../../../routes';
import {combineLatest, Observable, of} from 'rxjs';
import {AuthorizedApiService} from '../../../services/authorized_api_service';
import {ApiService} from '../../../services/api_service';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import {Ids} from '../../../formsIds';

import moment from 'moment';
import {map} from 'rxjs/operators';



interface ITablePageStates {
    mounted:    boolean;
    sortInfo:   any;
    dataSource: any;
   
    configForms:    any;
}

export default class TablesPage extends React.Component<{}, ITablePageStates> {

    private routes: any = routes;
    private defaultSort = { name: 'tid', type: 'number', dir: 1 };

    @resolve(AuthorizedApiService)      private authorizedApiService: AuthorizedApiService;
    @resolve(ApiService)                private apiService: ApiService;
    
    constructor(props: any) {
        super(props);
        this.state = {
            mounted:        false,
            sortInfo:       this.defaultSort,
            dataSource:     [],
            configForms:    null,
        };
        this.onSortInfoChange = this.onSortInfoChange.bind(this);
    }

    componentDidMount() {
        this.refresh();
        this.setState({mounted: true});
    }

    refresh(only_data?: boolean) {
        combineLatest([
            only_data ? of(null) : this.apiService.get('getFormConfig').pipe(map((res) => res.data || [])),
            this.apiService.get('getFormData', {formid: Ids.USERS}).pipe(map((res) => res.data || [])),
        ]).subscribe(([configForms, dataSource]) => {
            debugger;
            this.setState({
                configForms: configForms || this.state.configForms,
                dataSource
            });
        });
    }

    getComparer(sortInfo: any) {
        const key = sortInfo.name;
        const direction = sortInfo.dir;
        return (a, b) => {
          if (a === b) return 0;
          return b[key] > a[key] ? -direction : direction;
        }
    }

    onSortInfoChange(sortInfo: any) {
        const newData = !sortInfo?[].concat(this.state.dataSource):[].concat(this.state.dataSource).sort(this.getComparer(sortInfo));
        return newData;
    }

    render() {

        const gridStyle = { minHeight: 600 };
        let filterValue = [];
        let columns     = [];

        if (this.state.configForms) {
            const atts = this.state.configForms[Ids.USERS].ATTS;
            filterValue = atts
                .map((att: any) => ({
                    name: att.KEY,
                    operator: 'contains',
                    type: att.TYPE === 5 ? 'number' : (att.TYPE === 2 ? 'string' : 'string'),
                    value: '',
                    })
                );
            
            columns = atts.map((att: any) => ({
                name: att.KEY,
                defaultFlex: 1,
                minWidth: 100,
                header: att.NAME_I18N ? i18n(att.NAME_I18N) : att.NAME,
                defaultVisible: att.KEY === 'tid' ? false : true,
                type: att.TYPE === 5 ? 'number' : (att.TYPE === 2 ? 'string' : 'string'),
                filterEditor: att.TYPE === 5 ? NumberFilter : (att.TYPE === 2 ? null : DateFilter)
            }));
        }

        debugger;
        return (
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', fontFamily: 'Arial'}} >
                {this.state.configForms && this.state.dataSource && this.state.mounted
                    ? <React.Fragment>
                        <div style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Typography>Table {i18n(this.state.configForms[Ids.USERS].TITEL_ANZEIGE_I18N)}</Typography>
                            <div><Button>Delete</Button>&nbsp;<Button>Add</Button></div>
                        </div>
                        <ReactDataGrid
                            idProperty="tid"
                            style={gridStyle}
                            columns={columns}
                            defaultFilterValue={filterValue}
                            dataSource={this.state.dataSource}
                            showHoverRows={true}
                            onEditComplete={(editInfo: any) => { // TypeEditInfo & {[key: string]: any} 
                                debugger;
                                console.log(editInfo);
                                // rows 
                                const old_Rows = editInfo.data;
                                const columnI = editInfo.birthDate;
                                // columnIndex: 2
                                const newValue = editInfo.value; // "1970-12-01";
                            }}
                            editable={true}
                            enableSelection={true}
                            checkboxColumn={true}
                        />
                        </React.Fragment>
                    : <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                        <CircularProgress color="primary"/>
                    </div>
                }
            </div>
        )
    }
}
