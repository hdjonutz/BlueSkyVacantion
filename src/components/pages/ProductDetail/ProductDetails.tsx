import * as React from 'react';
import {Observable} from 'rxjs';
import 'reflect-metadata';

import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../../Layout/Theme';

import DetailLeft from './DetailLeft';
import DetailRight from './DetailRight';

export default class ProductDetail extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);

        this.state = {}
    }


    render() {
        const style = {border: '1px solid red', background: 'blue'};
        return (
            <ThemeProvider theme={themeMeandro}>
                <div style={{flex: 1, display: 'flex', maxWidth: '100%'}}>
                    <DetailLeft />
                    <DetailRight />
                </div>
            </ThemeProvider>
        )
    }
}
