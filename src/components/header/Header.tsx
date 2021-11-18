import * as React from 'react';
import style from './Header.less';
import {MDBBtn} from 'mdb-react-ui-kit';
import {NavLink} from 'react-router-dom';
import routes from '../../routes';
import {AuthenticationService} from '../../services/authentication_service';
import 'reflect-metadata';
import { resolve } from 'inversify-react';;

interface HeaderStates {
    toHome:         string;
    toLogin:        string;
    toContactUs:    string;
    auth:           Array<string>;
}

export default class Header extends React.Component<{}, HeaderStates> {

    private routes: any = routes;
    @resolve(AuthenticationService)     private authenticationService: AuthenticationService;

    constructor(props: any) {
        super(props);
        this.state = {
            toHome:         '',
            toLogin:        '',
            toContactUs:    '',
            auth:           null,
        };
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
                this.setState({auth: auth && auth.username ? auth.username.split('#') : null});
            });
    }

    LogOut() {
        this.authenticationService.logout().subscribe((res) => res);
    }

    render() {
        return (
            <div className={style.header}>
                <div className={style.container}>
                    <div className={style.logo}>
                        <NavLink to={this.state.toHome}><img src={'assets/svg/logo.svg'}/></NavLink>
                    </div>
                    {this.state.auth && <div className={style.sprache}>{this.state.auth[0]}-{this.state.auth[1]} &nbsp; </div>}
                    <div className={style.sprache}> sprache </div>
                    {!this.state.auth && <div>
                        <NavLink to={this.state.toLogin}><MDBBtn outline className='mx-2' color='info'>Login</MDBBtn></NavLink>
                    </div>}
                    {this.state.auth && <div>
                        <MDBBtn outline className='mx-2' color='info' onClick={() => this.LogOut()}>Logout</MDBBtn>
                    </div>}
                    <div>
                        <NavLink to={this.state.toContactUs}><MDBBtn outline className='mx-2' color='info'>Contact Us</MDBBtn></NavLink>
                    </div>
                </div>
            </div>
        )
    }
}