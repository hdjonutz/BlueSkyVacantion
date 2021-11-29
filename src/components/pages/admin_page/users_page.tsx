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

interface UsersPageStates {
    users:          any,
    categories:     any,
    products:       any,
    configForms:    any
}

export default class UsersPage extends React.Component<RouteComponentProps<{}>, UsersPageStates> {
    private routes: any = routes;

    @resolve(AuthorizedApiService)      private authorizedApiService: AuthorizedApiService;
    @resolve(ApiService)                private apiService: ApiService;

    constructor(props: any) {
        super(props);
        this.state = {
            users:      [],
            categories: [],
            products:   [],
        };
    }

    componentDidMount() {
        if (routes) {
            const items = [].concat.apply([], this.routes.map((r: any) => r.items)) as Array<any>;
            const adminChildren = items.find((r) => r.title === 'Users').children;
            this.setState({
                group: adminChildren,
            });
        }
        this.apiService.get('getFormConfig')
            .map((res) => res.data || [])
            .subscribe((configForms) => {
                this.setState({ configForms });
            });
        this.refresh();
    }

    refresh() {
        Observable.combineLatest(
            this.apiService.get('getFormData', {formid: Ids.USERS}).map((res) => res.data || []),
            // this.authorizedApiService.get(Ids.CATEGORIES),
            // this.authorizedApiService.get(Ids.PRODUCTS),
        ).subscribe(([users, categories, products]) => {
            this.setState({
                users: users,
                categories,
                products,
            });
            console.log(users, categories, products);
        });
    }

    renderGroups(groups: Array<{path: string, component: JSX.Element}>): ReadonlyArray<JSX.Element<any>> {
        // debugger;
        return groups.map((item) =>
            <NavLink to={"/admin/administrator/" + item.titleI18n} key={item.titleI18n}>
                <MDBBtn className='mx-2' color='info'>
                    {item.title}{item.titleI18n}
                </MDBBtn>
            </NavLink>
        );
    }

    tableUsers(): JSX.Element {
        return <Table data={this.state.users}
                      formId={Ids.USERS}
                      configForms={this.state.configForms}
                      callback = {() => this.refresh()}
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
            default:
                return this.tableUsers()
        }
    }
    render() {
        const filter = this.props.match.params.filename_page;
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