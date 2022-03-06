import React, { useState, useCallback } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css'

import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
import Button from '@mui/material/Button';


import {people} from './test_table_people';
import moment from 'moment';
// window.moment = moment;


interface ITestTablePageStates {
    mounted:    boolean;
    sortInfo:   any;
    dataSource: any;
}

export default class TestTablePage extends React.Component<{}, ITestTablePageStates> {

    private defaultSort = { name: 'age', type: 'number', dir: 1 };
    constructor(props: any) {
        super(props);
        this.state = {
            mounted:    false,
            sortInfo:   this.defaultSort,
            dataSource: [].concat(people).sort(this.getComparer(this.defaultSort))
        };
        this.onSortInfoChange = this.onSortInfoChange.bind(this);
    }

    componentDidMount() {
        this.setState({mounted: true});
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
        const newData = !sortInfo?[].concat(people):[].concat(people).sort(this.getComparer(sortInfo));
        return newData;
    }

    render() {

        const gridStyle = { minHeight: 600 }

        const filterValue = [
            { name: 'name', operator: 'startsWith', type: 'string', value: '' },
            { name: 'age', operator: 'gte', type: 'number', value: 21 },
            { name: 'city', operator: 'startsWith', type: 'string', value: '' },
            {
                name: 'birthDate',
                operator: 'before',
                type: 'date',
                value: ''
            }
        ];
        
        const columns = [
            { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 80, type: 'number' },
            { name: 'name', header: 'Name', defaultFlex: 1 },
            { name: 'age', header: 'Age', defaultFlex: 1, type: 'number', filterEditor: NumberFilter },
            {
                name: 'birthDate',
                header: 'Bith date',
                defualtFlex: 1,
                minWidth: 200,
                filterEditor: DateFilter,
                filterEditorProps: (props, { index }) => {
                // for range and notinrange operators, the index is 1 for the after field
                    return {
                        dateFormat: 'MM-DD-YYYY',
                        cancelButton: false,
                        highlightWeekends: false,
                        placeholder: index == 1 ? 'Created date is before...': 'Created date is after...'
                    }
                },
                render: ({ value, cellProps }) => {
                    return moment(value).format('MM-DD-YYYY');
                }
            },
            { name: 'city', header: 'City', defaultFlex: 1 },
        ];

        return (
            <div>
                {this.state.mounted && <React.Fragment>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <div>Name Table</div>
                        <div><Button>Delete</Button>&nbsp;<Button>Add</Button></div>
                    </div>
                    <ReactDataGrid
                        idProperty="id"
                        style={gridStyle}
                        defaultFilterValue={filterValue}
                        columns={columns}
                        sortInfo={this.state.sortInfo}
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
                        onSortInfoChange={(sort: any) => {
                            console.log(sort);
                            const newDirection = this.state.sortInfo.dir * -1;
                            const sortInfo = { name: sort ? sort.name: this.state.sortInfo.name, type: 'number', dir: newDirection };
                            const newData = !sortInfo?[].concat(people):[].concat(people).sort(this.getComparer(sortInfo));
                            this.setState({sortInfo, dataSource: newData});
                        }}
                    />
                </React.Fragment>}
            </div>
        )
    }
}


// https://reactdatagrid.io/docs/filtering
// https://reactdatagrid.io/docs/api-reference#props-sortInfo
// https://reactdatagrid.io/docs/

// Editable https://reactdatagrid.io/docs/api-reference#props-editable
// onEditComplete={onEditComplete}
// editable={editable}

// learn more by using
// const onSortInfoChange = useCallback(sortInfo => {
//     const newData = !sortInfo?[].concat(people):[].concat(people).sort(getComparer(sortInfo))

//     setSortInfo(sortInfo)
//     setDataSource(newData)
//   }, [])
  // link https://reactdatagrid.io/docs/api-reference#props-sortInfo