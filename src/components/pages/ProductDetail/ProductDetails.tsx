import * as React from 'react';
import 'reflect-metadata';

import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../../Layout/Theme';

import DetailLeft from './DetailLeft';
import DetailRight from './DetailRight';
import {getProductId} from '../Products/helpers';
import {combineLatest} from 'rxjs';
import {Ids} from '../../../formsIds';
import {filter, map} from 'rxjs/operators';
import {resolve} from 'inversify-react';
import {FormsService} from '../../../services/form_service';
import {ApiService} from '../../../services/api_service';

interface IProductDetail {
    product:    {[key: string]: any};
    details:    {[key: string]: any};
    orts:       {[key: string]: any};
    path:       string;
    isProduct:  boolean;
}

export default class ProductDetail extends React.Component<{}, IProductDetail> {

    @resolve(FormsService)      private formsService: FormsService;
    @resolve(ApiService)        private apiService: ApiService;

    constructor(props: any) {
        super(props);

        this.state = {
            product:    null as any,
            details:    null as any,
            orts:       null as any,
            path:       null as any,
            isProduct:  false,
        }
    }

    componentDidMount() {
        const obj = getProductId(this.props, null, this.state);
        combineLatest(
            [
                this.apiService.get('getFormData', {formid: Ids.PRODUCTS})
                .pipe(
                    map((res) => res.data ? res.data.find((f) => f.product_id === obj.isProduct) : [])
                ),
                this.apiService.get('getFormData', {formid: Ids.PROD_ESENTIAL_DETAILS})
                    .pipe(
                        map((res) => res.data ? res.data.filter((f) => f.product_id === obj.isProduct) : [])
                    ),
                this.apiService.get('getFormData', {formid: Ids.PROD_LOCATIONS})
                    .pipe(
                        map((res) => res.data ? res.data.filter((f) => f.product_id === obj.isProduct) : [])
                    )
            ],
        ).subscribe(([product, details, orts]) => {
            this.setState({
                product,
                details,
                orts,
                path: (this.props as any).location.pathname,
                isProduct: obj.isProduct
            })
        });
    }

    render() {
        const style = {border: '1px solid red', background: 'blue'};
        return (
            <ThemeProvider theme={themeMeandro}>
                <div style={{flex: 1, display: 'flex', maxWidth: '100%'}}>
                    <DetailLeft key={'01'} />
                    <DetailRight {...this.state} key={'02'}/>
                </div>
            </ThemeProvider>
        )
    }
}
