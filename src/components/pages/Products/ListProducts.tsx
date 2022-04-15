import * as React from 'react';

import 'reflect-metadata';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../../Layout/Theme';

import ListLeft from './ListLeft';
import ListRight from './ListRight';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

export default class ListProductsPage extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);

        this.state = {};
    }

    render() {
        const style = {border: '1px solid red', background: 'blue'};
        const boxStyled = {'max-width': '1070px', paddingLeft: 0, paddingRight: 0, position: 'relative', marginLeft: 0};
        const rightSide = {padding: '60px 40px'};
        return (
            <ThemeProvider theme={themeMeandro}>
                <div style={{flex: 1, display: 'flex', maxWidth: '100%'}}>
                    <ListLeft />
                    <Box sx={{ flexGrow: 1 }} style={rightSide}>
                        <Container component='main' style={boxStyled}>
                            <CssBaseline />
                            <h2>Other Products By Ort oder ByTyp1 </h2>
                            <ListRight {...this.props} />
                        </Container>
                    </Box>
                </div>
            </ThemeProvider>
        )
    }
}

