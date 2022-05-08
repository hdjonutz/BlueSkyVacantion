import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro, {colorPrimary} from '../Layout/Theme';

import {NavLink} from 'react-router-dom';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from '../Layout/theme.less';

export default class LanguageSelector extends React.PureComponent<{}, {language: number}> {
    constructor(props: any) {
        super (props);

        this.state = {
            language:   0,
        }
    }

    handleChange = (event: SelectChangeEvent<any>) => {
        this.setState({language: event.target.value});
    };

    render () {
        /* const magenda = '#ff7f27'; */
        return(
                <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }} style={{color: colorPrimary}}>
                    <Select
                        labelId='demo-simple-select-standard-label'
                        id='demo-simple-select-standard'
                        value={this.state.language}
                        label='Language'
                        onChange={this.handleChange}
                        variant='standard'
                        style={{color: colorPrimary}}
                        className={styles.colorPrimary}
                        inputProps={{
                            classes: {
                                icon: {color: 'red'},
                            },
                        }}
                        >
                        <MenuItem style={{color: colorPrimary}} value={0}>English</MenuItem>
                        <MenuItem style={{color: colorPrimary}} value={1}>German</MenuItem>
                        <MenuItem style={{color: colorPrimary}} value={2}>Greece</MenuItem>
                        {/*<MenuItem style={{color: magenda}} value={2}>Greece</MenuItem>*/}
                    </Select>
                </FormControl>
        )
    }
}
