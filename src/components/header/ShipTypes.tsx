import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../Layout/Theme';

import 'reflect-metadata';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default class ShipTypes extends React.PureComponent<{}, {type: number}> {
    constructor(props: any) {
        super (props);

        this.state = {
            type:   0,
        }
    }

    handleAction(open: boolean) {
        this.setState({open});
    }

    handleChange = (event: SelectChangeEvent<any>) => {
        this.setState({type: event.target.value});
    };

    render () {
        const magenda = '#640ec3';
        return(
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
                <Select
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={this.state.type}
                    label='Ship types'
                    onChange={this.handleChange}
                    variant='standard'
                >
                    <MenuItem style={{color: magenda}} value={0}>Ship Type 1</MenuItem>
                    <MenuItem style={{color: magenda}} value={1}>Ship Type 2</MenuItem>
                    <MenuItem style={{color: magenda}} value={2}>Ship Type 3</MenuItem>
                </Select>
            </FormControl>
        )
    }
}