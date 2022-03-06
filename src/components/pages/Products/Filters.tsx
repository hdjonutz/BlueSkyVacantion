import * as React from 'react';
import style from './admin.less';
import {NavLink} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import routes from '../../../routes';
import {Observable} from 'rxjs';
import {AuthorizedApiService} from '../../../services/authorized_api_service';
import {ApiService} from '../../../services/api_service';
import 'reflect-metadata';
import { resolve } from 'inversify-react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../../Layout/Theme';

import styles from './Filters.less';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

interface IFiltersProps {
    style: {[key: string]: any};
}
export default class FiltersPage extends React.PureComponent<IFiltersProps, {detail: boolean, value: any}> {

    constructor(props: any) {
        super(props);

        this.state = {
            detail: false,
            value:   null,
        }
    }

    componentDidUpdate() {
        this.setState({detail: this.props.detail});
    }
    componentDidMount() {
        this.setState({detail: this.props.detail});
    }

    setValue(value: any) {
        this.setState({value});
    }

    renderFiltersNodetails(): JSX.Element {
        // stratingLocation von: bis: Guests

        const styleGrid = {
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '0px',
        };

        return(
                <Grid container spacing={1} style={{backgroundColor: 'rgb(255 255 255 / 80%)'}} className={styles.grid}>
                    <Grid item xs={12} sm={4} xl={2} style={styleGrid}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="starttingLocation"
                            label="Starting Location"
                            name="startingLocation"
                            autoComplete="startingLocation"
                            sx={{
                                margin: '8px 0',
                                fieldset: {
                                    borderColor: themeMeandro.palette?.primary.main,
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} xl={2} style={styleGrid}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="guests"
                            label="Guests"
                            name="guests"
                            autoComplete="Guests"
                            sx={{
                                margin: '8px 0',
                                fieldset: {
                                    borderColor: themeMeandro.palette?.primary.main,
                                }
                            }}
                            />
                    </Grid>
                    <Grid item xs={12} sm={4} xl={2} style={styleGrid}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                label="von"
                                value={this.state.value}
                                onChange={(newValue) => {
                                    this.setValue(newValue);
                                }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    helperText={null}
                                    sx={{
                                        margin: '8px 0',
                                        fieldset: {
                                            borderColor: themeMeandro.palette?.primary.main,
                                        }
                                    }}
                                    />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={4} xl={2} style={styleGrid}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                label="bis"
                                value={this.state.value}
                                onChange={(newValue) => {
                                    this.setValue(newValue);
                                }}
                                renderInput={(params) =>
                                <TextField
                                    {...params}
                                    helperText={null}
                                    sx={{
                                        margin: '8px 0',
                                        fieldset: {
                                            borderColor: themeMeandro.palette?.primary.main,
                                        }
                                    }}
                                    />
                                }
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={4} xl={2} style={styleGrid}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 1, mb: 1, p: 2 }}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
        )
    }

    render() {
        // we don#t have more that 5 Jachten
        // style={{backgroundImage: "url('assets/images/home_image.png')"}}homefilterBackground.jpg
        // const styled = Object.assign({backgroundImage: `url('assets/images/homefilterBackground.jpg')`}, this.props.style);

        return (
            <ThemeProvider theme={themeMeandro}>
                <Container component="main" maxWidth="xl" className={styles.container} style={this.props.style}>
                    <CssBaseline />
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                        {this.state.detail
                            ? <React.Fragment>{this.renderFiltersNodetails()}</React.Fragment>
                            : <React.Fragment>{this.renderFiltersNodetails()}</React.Fragment>
                        }
                    </Box>
            </Container>
            </ThemeProvider>
        )
    }
}

// https://wall.alphacoders.com/by_sub_category.php?id=93115&name=Yacht+Wallpapers