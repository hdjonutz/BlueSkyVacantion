import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../Layout/Theme';

import {NavLink} from 'react-router-dom';
import 'reflect-metadata';
import { resolve } from 'inversify-react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default class LanguageSelector extends React.PureComponent<{}, {language: number}> {
    constructor(props: any) {
        super (props);

        this.state = {
            language:   0,
        }
    }

    handleAction(open: boolean) {
        this.setState({open});
    }

    handleChange = (event: SelectChangeEvent<any>) => {
        this.setState({language: event.target.value});
    };

    render () {
        const magenda = '#640ec3';
        return(
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
                <Select
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={this.state.language}
                    label='Language'
                    onChange={this.handleChange}
                    variant='standard'
                    >
                    <MenuItem style={{color: magenda}} value={0}>English</MenuItem>
                    <MenuItem style={{color: magenda}} value={1}>German</MenuItem>
                    <MenuItem style={{color: magenda}} value={2}>Greece</MenuItem>
                </Select>
            </FormControl>
        )
    }
}