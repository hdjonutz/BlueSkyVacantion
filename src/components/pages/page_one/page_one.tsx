import * as React from 'react';
import { CounterService } from '../../../services/CounterService';
import { resolve } from 'inversify-react';
import {Logger} from '../../../util/logger';
import ReactTooltip from 'react-tooltip';

const logger = Logger.create('Counter');


export default class Page_one extends React.PureComponent<{}, {}> {

    @resolve(CounterService)
    private _counterService: CounterService;

    constructor(props: any) {
        super(props);
        this.state = {};

    }

    componentDidUpdate(prevProps, prevState) {
        logger.info('Example of logger');
        this._counterService.getData().subscribe((res) => {
            console.log(res);
        });
    }

    public render() {
        return (
            <React.Fragment>
                <div style={{display: 'flex', flex: 1}}>
                    Page_one
                    <p data-tip="hello world here is a tooltip">Tooltip</p>
                    <ReactTooltip />
                </div>
            </React.Fragment>
        );
    }
};
