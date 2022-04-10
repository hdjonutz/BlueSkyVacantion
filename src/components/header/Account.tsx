import * as React from 'react';
import style from './Accounts.less';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import routes from '../../routes';
import Language from '@mui/icons-material/Language';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../Layout/Theme';
import {AuthenticationService} from '../../services/authentication_service';


interface HeaderStates {
    toHome:         string;
    toLogin:        string;
    toContactUs:    string;
    auth:           Array<string>;
    language:       string | number;
    open:           boolean;
}

export default class Account extends React.Component<{}, HeaderStates> {

    private routes: any = routes;
    @resolve(AuthenticationService)     private authenticationService: AuthenticationService;

    constructor(props: any) {
        super(props);
        this.state = {
            toHome:         '',
            toLogin:        '',
            toContactUs:    '',
            auth:           null,
            language:       0,
            open:           false,
        };
    }

    setOpen (open: boolean) {
        this.setState({open});
    }

    componentDidMount() {
        if (routes) {
            const items = [].concat.apply([], this.routes.map((r: any) => r.items)) as Array<any>;
            this.setState({
                toHome:      items.find((r) => r.title === 'Home').path,
                toLogin:     items.find((r) => r.title === 'Login').path,
                toContactUs: items.find((r) => r.title === 'ContactUs').path,
            });
        }
        this.authenticationService
            .getAuthentication()
            // .filter((auth) => auth != null)
            .subscribe((auth) => {
                let logged = true;
                if (auth) {
                    logged = auth.expires >= new Date();
                }
                this.setState({auth: auth && logged && auth.username ? auth.username.split('#') : null});
            });
    }

    LogOut() {
        this.authenticationService.logout().subscribe((res) => res);
    }

    render() {
        return(
            <ThemeProvider theme={themeMeandro}>
                <div className={style.header}>
                    <div className={style.container}>
                        {this.state.auth && <div className={style.sprache}>{this.state.auth[0]}-{this.state.auth[1]} &nbsp; </div>}
                        {!this.state.auth && <div> &nbsp;
                            <Button variant='special' href={'#' + this.state.toLogin}>Login</Button>
                        </div>}
                        {this.state.auth && <div>
                            <Button variant='special' onClick={() => this.LogOut()} href={'#' + this.state.toLogin}>Logout</Button>
                        </div>}
                        <div>
                            <Button variant='special' href={'#' + this.state.toContactUs}>Contact Us</Button>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}
