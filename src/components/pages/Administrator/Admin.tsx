import * as React from 'react';
import Button from '@mui/material/Button';
import style from './admin.less';
import {NavLink} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import routes from '../../../routes';
import {combineLatest, Observable, of} from 'rxjs';
import {AuthorizedApiService} from '../../../services/authorized_api_service';
import {ApiService} from '../../../services/api_service';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import {Ids} from '../../../formsIds';

import Table from '../../table/table';
import GanttPage from './gantt/gantt_page';
import OrdersPage from './orders_page';
import PdfVertragPage from './pdf_vertrag_page';
import TestTablePage from './test_table_page';
import TablePage from './Tables';
import CategoriesPage from './categories_page';
import ProductsPage from './products_page';
import JsonViewerPage from './json_viewer_page';
import FormsPage from './forms_admin_table';

import Box from '@mui/material/Box';

import classNames from 'classnames';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../../Layout/Theme';
import Layout from '../../AppView/layout-page';
import {map} from 'rxjs/operators';


interface IUsersPageStates {
    users:          any;
    categories:     any;
    products:       any;
    configForms:    any;
    group:          Array<{path: string, component: JSX.Element}>;
}


export default class AdministratorPage extends React.Component<RouteComponentProps<{}>, IUsersPageStates> {

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
            group:       [],
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
        combineLatest(
            [only_data ? of(null) : this.apiService.get('getFormConfig').pipe(map((res) => res.data || [])),
            this.apiService.get('getFormData', {formid: Ids.USERS}).pipe(map((res) => res.data || []))],
        ).subscribe(([configForms, users]) => {
            this.setState({
                configForms: configForms || this.state.configForms,
                users,
                group: adminChildren,
            });
            console.log(users);
        });
    }

    getComponent(filter: string): JSX.Element {
        console.log('Change to: ' + filter);
        switch (filter) {
            case 'Categories':
                return <CategoriesPage />;
            case 'Products':
                return <ProductsPage />;
            case 'JsonConfig':
                return <JsonViewerPage />;
            case 'Admin':
                return this.tableUsers();
            case 'Gantt':
                return <GanttPage />;
            case 'Orders-Contracts':
                return <OrdersPage />;
            case 'PdfVertrag':
                return <PdfVertragPage />;
            case 'TestTable':
                return <TestTablePage />;
            case 'Admin2':
                return <TablePage />;
            case 'FormsPage':
                return <FormsPage />;
            default:
                return this.tableUsers();
        }
    }

    renderGroups(groups: Array<{path: string, component: JSX.Element}>): ReadonlyArray<any> {
        return groups.map((item: any) =>
            <NavLink to={'/admin/administrator/' + item.titleI18n} key={item.titleI18n}>
                <Button className='mx-2' color='info'>
                    {item.title}{item.titleI18n}
                </Button>
            </NavLink>
        );
    }

    tableUsers(): JSX.Element {
        console.log('data: ', this.state.users, Ids.USERS, this.state.configForms);
        return <Table data={this.state.users}
                      formId={Ids.USERS}
                      configForms={this.state.configForms}
                      callback = {() => {
                          const only_data = true;
                          this.refresh(only_data);
                      }}
                      />
    }

    render() {
        const params: any = this.props.match.params;
        const filter = params.filename_page;
        console.log('router FILTER: ' + filter);
        return (
            <ThemeProvider theme={themeMeandro}>
                <Container component='main' maxWidth='xl' style={{display: 'flex', height: '100%', backgroundColor: '##fffffd'}}>
                    <CssBaseline />
                    <Box
                        sx={{
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%'
                        }}
                    >
                        <div className={classNames(style.container, style.column)}>
                            {this.state.group && <div>{this.renderGroups(this.state.group)}</div>}
                            <div className={classNames(style.container, style.column)}>
                                <Layout footer={false}>
                                    {this.getComponent(filter)}
                                </Layout>
                            </div>
                        </div>
                    </Box>
              </Container>
            </ThemeProvider>
        )
    }
}
// https://mui.com/components/data-grid/filtering/
// https://reactdatagrid.io/docs/getting-started
// https://morioh.com/p/c08ee0fb54b6
