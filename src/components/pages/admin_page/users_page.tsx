import * as React from 'react';
import 'reflect-metadata';
import style from './admin_page.less';
import { resolve } from 'inversify-react';
import {RouteComponentProps} from 'react-router';

import routes from '../../../routes';
import {NavLink} from "react-router-dom";
import {MDBBtn} from "mdb-react-ui-kit";

import CategoriesPage from './categories_page';
import ProductsPage from './products_page';
import JsonViewerPage from './json_viewer_page';

import classNames from 'classnames';
import {Observable} from 'rxjs';
import {Ids} from '../../../formsIds';
import {AuthorizedApiService} from '../../../services/authorized_api_service';
import {ApiService} from '../../../services/api_service';
import Table from '../../table/table';

interface IUsersPageStates {
    users:          any;
    categories:     any;
    products:       any;
    configForms:    any;
    group:          Array<{path: string, component: JSX.Element}>;
}

export default class UsersPage extends React.Component<RouteComponentProps<{}>, IUsersPageStates> {
    private routes: any = routes;

    @resolve(AuthorizedApiService)      private authorizedApiService: AuthorizedApiService;
    @resolve(ApiService)                private apiService: ApiService;

    constructor(props: any) {
        super(props);
        this.state = {
            users:       [],
            categories:  [],
            products:    [],
            configForms: null,
            group:       null,
        };
    }

    componentDidMount() {
        this.refresh();
    }

    refresh(only_data?: boolean) {
        let adminChildren: Array<{path: string, component: JSX.Element}> = [];
        if (routes) {
            const items = [].concat.apply([], this.routes.map((r: any) => r.items)) as Array<any>;
            adminChildren = items.find((r) => r.title === 'Users').children;
        }
        Observable.combineLatest(
            only_data ? Observable.of(null) : this.apiService.get('getFormConfig').map((res) => res.data || []),
            this.apiService.get('getFormData', {formid: Ids.USERS}).map((res) => res.data || []),
        ).subscribe(([configForms, users]) => {
            this.setState({
                configForms: configForms || this.state.configForms,
                users,
                group: adminChildren,
            });
            console.log(users);
        });
    }

    renderGroups(groups: Array<{path: string, component: JSX.Element}>): ReadonlyArray<any> {
        return groups.map((item: any) =>
            <NavLink to={"/admin/administrator/" + item.titleI18n} key={item.titleI18n}>
                <MDBBtn className='mx-2' color='info'>
                    {item.title}{item.titleI18n}
                </MDBBtn>
            </NavLink>
        );
    }

    tableUsers(): JSX.Element {
        console.log("data: ", this.state.users, Ids.USERS, this.state.configForms);
        return <Table data={this.state.users}
                      formId={Ids.USERS}
                      configForms={this.state.configForms}
                      callback = {() => {
                          const only_data = true;
                          this.refresh(only_data);
                      }}
                      />
    }

    getComponent(filter: string): JSX.Element {
        switch (filter) {
            case 'Categories':
                return <CategoriesPage />;
            case 'Products':
                return <ProductsPage />;
            case 'JsonConfig':
                return <JsonViewerPage />;
            case 'Admin':
                return this.tableUsers();
            default:
                return this.tableUsers();
        }
    }
    render() {
        const filter = this.props.match.params.filename_page;
        console.log('router FILTER: ' + filter);
        return (
            <div className={classNames(style.container, style.column)}>
                {this.state.group && <div>{this.renderGroups(this.state.group)}</div>}
                <div className={classNames(style.container, style.column)}>
                    {this.getComponent(filter)}
                </div>
            </div>
        )
    }
}