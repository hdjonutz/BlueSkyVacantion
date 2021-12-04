import * as React from 'react';
import 'reflect-metadata';
import style from './admin_page.less';
import classNames from 'classnames';
import { resolve } from 'inversify-react';
import {RouteComponentProps} from 'react-router';
import Table from '../../table/table';
import {Ids} from '../../../formsIds';
import {Observable} from 'rxjs';
import {ApiService} from '../../../services/api_service';

interface IProductsPageProps {
    items:  Array<any>;
}

interface IProductsPageState {
    items:          Array<any>;
    configForms:    any;
}

export default class ProductsPage extends React.Component<RouteComponentProps<IProductsPageProps>, IProductsPageState> {

    @resolve(ApiService) private apiService: ApiService;

    constructor(props: any) {
        super(props);
        this.state = {
            items:          this.props.items,
            configForms:    null,
        };
    }

    componentDidMount() {
        this.refresh();
    }

    refresh(only_data?: boolean) {
        Observable.combineLatest(
            only_data ? Observable.of(null) : this.apiService.get('getFormConfig').map((res) => res.data || []),
            this.apiService.get('getFormData', {formid: Ids.PRODUCTS}).map((res) => res.data || []),
        ).subscribe(([configForms, items]) => {
            this.setState({
                configForms: configForms || this.state.configForms,
                items
            });
        });
    }

    render() {
        debugger;
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