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
import themeMeandro, {colorPrimary} from '../Layout/Theme';
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
                        <AppBar style={{padding: '15px', background: 'linear-gradient(to right, #000000 29%, rgba(0,0,0,0) 29%)'}}
                        > {/* background: themeMeandro.palette?.background?.default */}
                            <Toolbar>
                                <div style={{width: '28%', paddingRight: '24px', display: 'flex', alignItems: 'center'}}>
                                    <Drawer/>
                                    <Box flexGrow={1} display={{ xs: 'none', md: 'inline'}}>
                                        <NavLink to={this.state.toHome}>
                                            <img src={'assets/images/logo_ico2_objects.svg'} style={{height: '46px'}}/>
                                        </NavLink>
                                        {/* <Typography variant='h6' style={{fontSize: '1rem', color: 'red'}}>
                                            {COMPANY_NAME} md
                                        </Typography> */}
                                    </Box>
                                </div>
                                <div style={{width: '75%', paddingLeft: '24px', display: 'flex', alignItems: 'center'}}>
                                    {/*<Box flexGrow={1} display={{ xs: 'none', sm: 'flex', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'end'}}>*/}
                                    {/*    <ShipTypes />*/}
                                    {/*    <LanguageSelector />*/}
                                    {/*    <Account />*/}
                                    {/*</Box>*/}
                                    <Box flexGrow={1} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block'}} >
                                        <ShipTypes />
                                        <LanguageSelector />
                                    </Box>
                                    <Box flexGrow={1} display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block'}}>
                                        <Account />
                                    </Box>
                                    <Box flexGrow={1} display={{ md: 'none', lg: 'none', xl: 'none'}}>
                                        <NavLink to={this.state.toHome}>
                                            <img src={'assets/images/logo_ico2_objects_contrast.svg'} style={{height: '46px', paddingLeft: '16px'}}/>
                                        </NavLink>
                                        {/*<Typography variant='h6' style={{fontSize: '1rem', color: 'red'}}>
                                            {COMPANY_NAME} xs
                                        </Typography>*/}
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
