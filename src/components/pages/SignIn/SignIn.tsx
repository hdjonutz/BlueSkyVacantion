import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CopyrightPureComponent from '../../CopyRight/Copyright';
import themeMeandro from '../../Layout/Theme';
import styles from '../overwrite.less';
import {Ids} from '../../../formsIds';
import {resolve} from 'inversify-react';
import {ApiService, encodePostBody} from '../../../services/api_service';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../../services/authentication_service';


// import BorderColorOutlined from '@mui/base/border'
// import {
//   createStyles,
//   withStyles,
//   makeStyles,
// } from '@mui/styles';

  // const useStylesReddit = makeStyles((theme: any) =>
  //   createStyles({
  //     root: {
  //       border: '1px solid #e2e2e1',
  //       overflow: 'hidden',
  //       borderRadius: 4,
  //       backgroundColor: '#fcfcfb',
  //       transition: theme.transitions.create(['border-color', 'box-shadow']),
  //       '&:hover': {
  //         backgroundColor: '#fff',
  //       },
  //       '&$focused': {
  //         backgroundColor: '#fff',
  //         borderColor: theme.palette.primary.main,
  //       },
  //     },
  //     focused: {},
  //   }),
  // );
  //
  // const useStyles = makeStyles(theme =>
  //   createStyles({
  //     root: {
  //       color: 'red',
  //       "& .MuiOutlinedInput-root": {
  //         "& fieldset": {
  //           borderColor: "rgba(0, 0, 0, 0.23)" // default
  //         },
  //         "&.Mui-focused fieldset": {
  //           border: "2px solid red" // customized
  //         }
  //       }
  //     }
  //   })
  // );

export default class SignInPage extends React.Component<{}, {}> {

    @resolve(AuthenticationService) private authenticationService: AuthenticationService;

    constructor(props: any) {
        super(props);

        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const creditials = {
          email: data.get('email'),
          pass: data.get('password'),
        };

        this.authenticationService.login(data.get('email') + '', data.get('password') + '').subscribe((res) => {
            if (res && res.accessToken) {
                location.hash = '/online/home';
            } else {
                //
            }
        })

        // Observable
        //     .from([data].map((item: any) => encodePostBody(item)) as Array<string>)
        //     .mergeMap((payload: string) => this.apiService
        //         .get<any>('getFormData', Object.assign({formid: Ids.USERS}, creditials))
        //         .catch((error) => Observable.of(null))
        //     )
        //     .subscribe((res) => {
        //         console.log(res);
        //         debugger;
        //     });
    }
    render() {
      return (
        <ThemeProvider theme={themeMeandro}>
            <Container component='main' maxWidth='xs' className={styles.overwrite}>
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
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Sign in
                </Typography>
                <Box component='form' onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                  />
                  <FormControlLabel
                    control={<Checkbox value='remember' color='primary' />}
                    label='Remember me'
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href={'#/logIn/ForgotPasswordPage'} variant='body2'>
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href='#/logIn/RegisterPage' variant='body2'>
                          {'Don\'t have an account? Sign Up'}
                        </Link>
                      </Grid>
                    </Grid>
                </Box>
              </Box>
              <CopyrightPureComponent props={{sx:{ mt: 8, mb: 4 }}} />
            </Container>
          </ThemeProvider>
        )
    }
}
