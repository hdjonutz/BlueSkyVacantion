import * as React from 'react';
import 'reflect-metadata';
import style from './admin_page.less';
import classNames from 'classnames';
import { resolve } from 'inversify-react';
import {RouteComponentProps} from 'react-router';
import {Ids} from '../../../formsIds';
import {combineLatest, Observable, of} from 'rxjs';
import {ApiService} from '../../../services/api_service';
import {map} from 'rxjs/operators';

export default class PdfVertragPage extends React.Component<{}, {}> {

    @resolve(ApiService) private apiService: ApiService;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.refresh();
    }

    refresh(only_data?: boolean) {
        combineLatest(
            [only_data ? of(null) : this.apiService.get('getFormConfig').pipe(map((res) => res.data || [])),
            this.apiService.get('getFormData', {formid: Ids.PRODUCTS}).pipe(map((res) => res.data || []))],
        ).subscribe(([configForms, items]) => {
            this.setState({});
        });
    }

    render() {
        return (
            <div className={classNames(style.container, style.column)}>
                PdfVertragPage
            </div>
        )
    }
}
