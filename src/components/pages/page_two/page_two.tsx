import * as React from 'react';
import { CounterService } from '../../../services/CounterService';
import { resolve } from 'inversify-react';
import {Logger} from '../../../util/logger';
const logger = Logger.create('Counter');


export default class Page_two extends React.PureComponent<{}, {}> {

    @resolve(CounterService)
    private _counterService: CounterService;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        logger.info('Example of logger');
        this._counterService.getData().subscribe((res) => {
            console.log(res);
        });
    }

    public render() {
        return (
            <React.Fragment>
                Page_two
            </React.Fragment>
        );
    }
};
