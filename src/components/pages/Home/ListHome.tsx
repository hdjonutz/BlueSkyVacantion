import * as React from 'react';
import {Observable} from 'rxjs';
import 'reflect-metadata';
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../../Layout/Theme';

import ListLeft from './ListLeft';
import ListRight from './ListRight';

export default class ListHomePage extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);

        this.state = {}
    }


    render() {
        debugger;
        const style = {border: '1px solid red', background: 'blue'};
        return (
            <ThemeProvider theme={themeMeandro}>
                <div style={{flex: 1, display: 'flex', maxWidth: '100%'}}>
                    <ListLeft />
                    <ListRight />
                </div>
            </ThemeProvider>
        )
    }
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }));