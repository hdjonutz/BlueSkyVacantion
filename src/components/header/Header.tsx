import * as React from 'react';
import style from './Header.less';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';
import routes from '../../routes';
import {AuthenticationService} from '../../services/authentication_service';
import 'reflect-metadata';
import { resolve } from 'inversify-react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from './Drawer';
import Account from './Account';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../Layout/Theme';
import LanguageSelector from './Language';
import ShoppingCartLink from './ShoppingCart';
import ShipTypes from './ShipTypes';

export default class Header extends React.Component<{}, {toHome: string}> {
    private routes: any = routes;

    constructor(props: any) {
        super(props);
        this.state = {
            toHome: '',
        };
    }

    componentDidMount() {
        if (routes) {
            const items = [].concat.apply([], this.routes.map((r: any) => r.items)) as Array<any>;
            this.setState({
                toHome:      items.find((r) => r.title === 'Home').path,
            });
        }
    }

    render() {
        console.log(themeMeandro);
        return(
            <ThemeProvider theme={themeMeandro}>
                <Container maxWidth='xs'>
                    <HideOnScroll>
                        <AppBar style={{padding: '15px', background: 'linear-gradient(to right, #000000 29%, rgba(0,0,0,0) 29%)'}}> {/* background: themeMeandro.palette?.background?.default*/}
                            <Toolbar>
                                <div style={{width: '25%', padding: 0, display: 'flex', alignItems: 'center'}}>
                                    <Drawer/>
                                    <NavLink to={this.state.toHome}>
                                        <img src={'assets/images/Untitled-2_logo.png'} style={{height: '46px'}}/>
                                    </NavLink>
                                    <Typography variant='h6' style={{fontSize: '1rem', color: 'white'}}>
                                        Meandro Jachting LTD
                                    </Typography>
                                </div>
                                <div style={{width: '75%', padding: 0, display: 'flex', alignItems: 'center'}}>
                                    <Box flexGrow={1} display={{ xs: 'none', sm: 'flex', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                                        <ShipTypes />
                                        <LanguageSelector />
                                        <Account />
                                    </Box>
                                    <ShoppingCartLink />
                                </div>
                            </Toolbar>
                        </AppBar>
                    </HideOnScroll>
                </Container>
            </ThemeProvider>
        )
    }
}

const HideOnScroll = React.memo(function HideOnScroll({ children }: any) {
    const trigger = useScrollTrigger();
    return (
      <Slide appear={false} direction={'down'} in={!trigger}>
        {children}
      </Slide>
    );
  });