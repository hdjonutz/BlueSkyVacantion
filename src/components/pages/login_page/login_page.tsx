import * as React from 'react';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import {Logger} from '../../../util/logger';
import ReactTooltip from 'react-tooltip';
import {AuthenticationService} from '../../../services/authentication_service';
import {LocalConfigurationService} from "../../../services/local_configuration_service";
import Icon from '../ui/utils/icon';

export default class LoginPage extends React.PureComponent<{}, {}> {

    @resolve(AuthenticationService) private authenticationService: AuthenticationService;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // console.log(this);

        this.authenticationService.login('daniel', 'pass')
            .subscribe((res: any) => {
                // debugger;
                console.log(res);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        // logger.info('Example of logger');
        // this._counterService.getData().subscribe((res) => {
        //     console.log("RESULT: ", res);
        // });
    }

    public render() {
        return (
            <React.Fragment>
                <div style={{display: 'flex', flex: 1}}>
                    
                <img src={'assets/images/atenas_01.jpg'} style={{height:'20px', width: '20px'}}/>
                    <img src={'assets/svg/download.svg'} style={{height:'20px', width: '20px'}}/>
                    <Icon name={'download'} />
                </div>
            </React.Fragment>
        );
    }
};
