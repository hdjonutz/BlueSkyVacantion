import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';

import Link  from '@mui/material/Link';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import Email from '@mui/icons-material/Email';
import Houseboat from '@mui/icons-material/Houseboat';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import Button  from '@mui/material/Button';
import {NavLink} from 'react-router-dom';

import themeMeandro from '../Layout/Theme';
import {filter, first, map} from 'rxjs/operators';
import {inject} from 'inversify';
import {Authentication, AuthenticationService} from '../../services/authentication_service';
import {combineLatest, Observable, of, Subscription} from 'rxjs';
import {resolve} from 'inversify-react';
// const useStyles = makeStyles({
//     list: {
//       width: 250,
//     },
//   });

export default class Drawer extends React.Component<{}, {open: boolean, showAdministrator: boolean}> {

    private subscription: Subscription;
    @resolve(AuthenticationService)     private authenticationService: AuthenticationService;

    constructor(props: any) {
        super(props);
        this.state = {
            open:               false,
            showAdministrator:  false,
        };
    }
    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    componentDidMount() {
        this.subscription = this.authenticationService.getAuthentication()
            .pipe(filter((auth) => auth != null), first())
            .subscribe((allInOne) => {
                const expired = allInOne.expires > new Date();
                const hasPermission = allInOne.hasPermission('toRead');
                this.setState({showAdministrator: expired && hasPermission });
        });
    }

    render() {
        const magenda = themeMeandro.palette.primary.contrastText;
        return (
            <>
                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='open drawer'
                    onClick={() => this.setState({open: true})}
                >
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                    anchor='left'
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    onOpen={() => {}}
                    onClick={() => this.setState({open: false})}
                >
                    <div className={'classname'}>
                    <Box textAlign='center' p={2}>
                        {COMPANY_NAME}
                    </Box>
                    <Divider />
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component='nav'
                        aria-labelledby='nested-list-subheader'
                        >
                            <ListItemButton onClick={() => location.hash = '/contactUs/contact_us'}>
                                <ListItemIcon>
                                    <Email style={{color: magenda}} />
                                </ListItemIcon>
                                <ListItemText primary='Contact Us' />
                            </ListItemButton>


                            <ListItemButton onClick={() => location.hash = '/services/accommodation'}>
                                <ListItemIcon>
                                    <Houseboat style={{color: magenda}} />
                                </ListItemIcon>
                                <ListItemText primary='Accommodation' />
                            </ListItemButton>

                            {this.state.showAdministrator && <ListItemButton onClick={() => location.hash = '/admin/administrator/'}>
                                    <ListItemIcon>
                                        <AdminPanelSettings style={{color: magenda}} />
                                    </ListItemIcon>
                                    <ListItemText primary='Administrator' />
                                </ListItemButton>
                            }
                    </List>

                    </div>
                </SwipeableDrawer>
            </>
        );
    }
}
