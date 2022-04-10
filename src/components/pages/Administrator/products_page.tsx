import * as React from 'react';
import 'reflect-metadata';
import style from './admin_page.less';
import classNames from 'classnames';
import { resolve } from 'inversify-react';
import {RouteComponentProps} from 'react-router';
import Table from '../../table/table';
import {Ids} from '../../../formsIds';
import {combineLatest, map, Observable, of} from 'rxjs';
import {ApiService} from '../../../services/api_service';

interface IProductsPageState {
    items:          Array<any>;
    configForms:    any;
}

export default class ProductsAdminPage extends React.Component<{}, IProductsPageState> {

    @resolve(ApiService) private apiService: ApiService;

    constructor(props: any) {
        super(props);
        this.state = {
            items:          [],
            configForms:    null,
        };
    }

    componentDidMount() {
        this.refresh();
    }

    refresh(only_data?: boolean) {
        combineLatest(
            [only_data ? of(null) : this.apiService.get('getFormConfig').pipe(map((res) => res.data || [])),
            this.apiService.get('getFormData', {formid: Ids.PRODUCTS}).pipe(map((res) => res.data || []))],
        ).subscribe(([configForms, items]) => {
            this.setState({
                configForms: configForms || this.state.configForms,
                items
            });
        });
    }

    render() {

        return (
            <div className={classNames(style.container, style.column)}>
                <Table data={this.state.items}
                       formId={Ids.PRODUCTS}
                       configForms={this.state.configForms}
                       callback = {() => {
                           const only_data = true;
                           this.refresh(only_data);
                       }}
                />
            </div>
        )
    }
}
