import * as React from 'react';
import 'reflect-metadata';
import style from './admin_page.less';
import classNames from 'classnames';
import { resolve } from 'inversify-react';
import {RouteComponentProps} from 'react-router';
import {Ids} from '../../../formsIds';
import {Observable} from 'rxjs';
import {ApiService} from '../../../services/api_service';

interface IOrdersPageState {}

export default class OrdersPage extends React.Component<{}, IOrdersPageState> {

    @resolve(ApiService) private apiService: ApiService;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.refresh();
    }

    refresh(only_data?: boolean) {
        Observable.combineLatest(
            only_data ? Observable.of(null) : this.apiService.get('getFormConfig').map((res) => res.data || []),
            this.apiService.get('getFormData', {formid: Ids.PRODUCTS}).map((res) => res.data || []),
        ).subscribe(([configForms, items]) => {
            this.setState({});
        });
    }

    render() {
        return (
            <div className={classNames(style.container, style.column)}>
                Orders Contracts
            </div>
        )
    }
}