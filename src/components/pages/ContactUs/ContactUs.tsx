import * as React from 'react';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import {Logger} from '../../../util/logger';
import ReactTooltip from 'react-tooltip';
import {AuthenticationService} from '../../../services/authentication_service';
import {LocalConfigurationService} from "../../../services/local_configuration_service";
import {encodePostBody, ApiService} from "../../../services/api_service";
import {VersionService} from "../../../services/version_service";
import {AuthorizedApiService} from "../../../services/authorized_api_service";
import {SnackbarService} from "../../../services/snackbar_service";
import classNames from 'classnames';
import {Observable, Subscription} from 'rxjs';
import Icon from '../ui/utils/icon';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import PermIdentity from '@mui/icons-material/PermIdentity';
import Key from '@mui/icons-material/Key';
import AlternateEmail from '@mui/icons-material/AlternateEmail';
import Avatar from '@mui/material/Avatar';
import CopyrightPureComponent from '../../CopyRight/Copyright';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CssBaseline from '@mui/material/CssBaseline';
import HistoryEdu from '@mui/icons-material/HistoryEdu';

import themeMeandro from '../../Layout/Theme.ts';
import styles from '../overwrite.less';


interface IContactUsStates {
    displayModal:   boolean;
    contentEmail:   any;
    file:           File;
    wasChecked:     boolean;
    credintials:    boolean;
}

export default class ConatctUs extends React.Component<{}, IContactUsStates> {

    @resolve(AuthorizedApiService)      private authorizedApiService: AuthorizedApiService;
    @resolve(ApiService)                private apiService: ApiService;
    private inputUpload:                any;
    private observable:                 Subscription;

    constructor(props: any) {
        super(props);
        this.state = {
            displayModal:   false,
            contentEmail:   {},
            file:           null,
            wasChecked:     false,
            credintials:    false,
        };
        this.onClickSubmitValues = this.onClickSubmitValues.bind(this);
    }

    componentWillUnmount() {
        if (this.observable) {
            this.observable.unsubscribe();
        }
    }

    onChangeInput(ev: React.ReactEventHandler<InputEvent>): void {
        const target = ev.target;
        const value = target.value;
        const id = target.getAttribute('id');
        const contentEmail = this.state.contentEmail;
        contentEmail[id] = target.type === 'checkbox' ? target.checked : value;
        this.setState({contentEmail: contentEmail}, () => console.log(this.state));
    }

    onClickSubmitValues(): void {
        const tmp = Object.keys(this.state.contentEmail).map((k) => ({key: k, value: this.state.contentEmail[k]}));
        this.setState({wasChecked: true});
        if (this.state.contentEmail && this.state.contentEmail.privacy) {} else {
            return;
        }

        this.observable = Observable
            .from([this.state.contentEmail].map((item: any) => encodePostBody(item)) as Array<string>)
            .mergeMap((payload: string) => this.apiService
                .post<any>('sendEmail', {}, payload)
                .catch((error) => Observable.of(null))
            ).subscribe((res: any) => {
                if (res.data.result) {
                    this.setState({displayModal: true, contentEmail: {}, wasChecked: false});
                }
            });
    }

    toggleShow() {
        this.setState({displayModal: false, contentEmail: {}});
    }

    onFileSelected(file: File) {
        if (!!file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                // nothing
            };
            fileReader.readAsText(file.slice());
        }
        this.setState({file: file});
    }

    handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            message: data.get('message'),
        });
    }

    render() {
        return (
            <ThemeProvider theme={themeMeandro}>
                <Container component="main" maxWidth="xs" className={styles.overwrite}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 12,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <HistoryEdu />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Wite a massage
                        </Typography>
                        <Box component="form" onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    InputProps={{ // <-- This is where the toggle button is added.
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PermIdentity color='primary' />
                                        </InputAdornment>
                                    )
                                    }}
                                />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    InputProps={{ // <-- This is where the toggle button is added.
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PermIdentity color='primary'/>
                                        </InputAdornment>
                                    )
                                    }}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    InputProps={{ // <-- This is where the toggle button is added.
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AlternateEmail color='primary'/>
                                        </InputAdornment>
                                    )
                                    }}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="message"
                                        label="Messages"
                                        type="text"
                                        multiline
                                        rows={4}
                                        id="message"
                                        InputProps={{ // <-- This is where the toggle button is added.
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <DriveFileRenameOutlineIcon color='primary'/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                endIcon={<SendIcon />}
                            >
                                Send
                            </Button>
                        </Box>
                    </Box>
                <CopyrightPureComponent props={{sx:{ mt: 5 }}} />
                </Container>
            </ThemeProvider>
        )
    }
}
