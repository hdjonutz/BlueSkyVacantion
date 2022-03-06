import * as React from 'react';

import {Observable} from 'rxjs';
import 'reflect-metadata';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import style from './listRight.less';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import themeMeandro from '../../Layout/Theme';
import { ThemeProvider } from '@mui/material/styles';
import ListRight from "../Products/ListRight";

export default class DetailRight extends React.Component<{}, {value: string}> {

    private _algemeine = [
        {name: 'Modell', detail: 'CAMPER & NICHOLSONS WHITE HEATHER'},
        {name: 'Rumpflänge (m)', detail: '\t35,00'},
        {name: 'Breite (m)', detail: '6,10'},
        {name: 'Durchfahrtshöhe (m)', detail: '33,30'},
        {name: 'Baujahr', detail: '1995'},
        {name: 'Deckmaterial', detail: 'Holtz'},
        {name: 'Deck Finish Aufbauten', detail: 'Teak'},
        {name: 'Fenster Material', detail: 'Glas'},
        {name: 'Füllstandsanzeige (Treibstoftank)', detail: 'total 6000 liters in 4 tanks'},

    ];
    private _algemeine2 = [
        {name2: 'Typ', detail2: 'Segelyacht '},
        {name2: 'Wasserlinienlänge (m)', detail2: '21,52'},
        {name2: 'Tiefgang (m)', detail2: '3,96'},
        {name2: 'Stehhöhe (m)', detail2: '2,10'},
        {name2: 'Lancierung', detail2: '2004 after last refit'},
        {name2: 'Gewicht (t)', detail2: '227'},
        {name2: 'Rumpfmaterial', detail2: 'Holtz'},
        {name2: 'Decksluke', detail2: '4'},
        {name2: 'Treibstoftank (Liter)', detail2: 'ja'},
    ];

    private unterkunft = [
        {name: 'Kabinen', detail: '5'},
        {name: 'Mannschaftskabine', detail: '1'},
        {name: 'Innen', detail: 'Teak  classic'},
        {name: 'Fussboden', detail: 'Parkett'},
        {name: 'Ruderhaus', detail: 'with L sofa'},
        {name: 'Warmwasser System', detail: '220V + Motor'},
        {name: 'Länge Bett (m)', detail: '2,00 x 1,50'}
    ];
    private unterkunft2 = [
        {name2: 'Kartentisch', detail2: 'ja'},
        {name2: 'Gefrier Truhe', detail2: 'Carrefour CRM245W needs sewrvice'},
        {name2: 'Wasserdruk System', detail2: 'elektrisch'},
        {name2: 'Kleiderschrank', detail2: 'hängend/Schublad/Regale'},
        {name2: 'Handwaschbecken', detail2: 'im Badezimmer'},
        {name2: 'Gästekabine 2', detail2: 'Doppelbett'},
        {name2: 'Toilette System', detail2: 'elektrisch  1'}
    ];

    constructor(props: any) {
        super(props);

        this.state = {
            value: '1'
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event: React.SyntheticEvent, newValue: string) {
        this.setState({value: newValue});
    };


    getTabContainer(all) {
        return <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
            <TableContainer component={Paper} style={{background: 'none', borderRadius: 0, boxShadow: 'none'}}>
                <Table sx={{ minWidth: 410 }} aria-label="simple table">
                    <TableBody>
                        {all.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell style={{'padding': '5px', width: '25%'}}>{row.name}</TableCell>
                                <TableCell style={{'padding': '5px', width: '25%'}}>{row.detail}</TableCell>
                                <TableCell style={{'padding': '5px', borderRight: '1px solid #f5f1f0'}}></TableCell>
                                <TableCell style={{'padding': '5px', width: '25%'}}>{row.name2}</TableCell>
                                <TableCell style={{'padding': '5px', width: '25%'}}>{row.detail2}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    }

    render() {
        const algemeineAll = [];
        this._algemeine.map((a, i) => algemeineAll.push(Object.assign(a, this._algemeine2[i] || {})) );

        const unterkunftAll = [];
        this.unterkunft.map((a, i) => unterkunftAll.push(Object.assign(a, this.unterkunft2[i] || {})) );

        const styledContainer = {maxWidth: '100%', paddingLeft: 0, paddingRight: 0, position: 'relative'};
        const boxStyled = {maxWidth: '1070px', paddingLeft: 0, paddingRight: 0, position: 'relative', marginLeft: 0};


        return (
            <ThemeProvider theme={themeMeandro}>
                <Container style={styledContainer}>
                <CssBaseline />
                <Box sx={{ flexGrow: 1 }} className={style.rightSide}>
                    <Container component='main' style={boxStyled}>
                        <CssBaseline />
                        <Card sx={{ display: 'flex', borderRadius: 0, backgroundColor: '#f5f1f0' }}>
                            <CardMedia
                                component='img'
                                sx={{ width: 500 }}
                                image='assets/slider/products/423232/kos.png'
                                alt='Live from space album cover'
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h4">
                                        Live From Space
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Mac Miller
                                    </Typography>
                                </CardContent>

                            </Box>
                        </Card>
                        <hr />
                        <h2>Detail Offer</h2>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={this.state.value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={this.handleChange}
                                             aria-label='lab API tabs example'
                                             className={style.tabsStyle}
                                    >
                                        <Tab label='ALLGEMEINES' value='1' className={style.tabsStyle} />
                                        <Tab label='UNTERKUNFT' value='2' className={style.tabsStyle} />
                                        <Tab label='MOTOR(EN)' value='3' className={style.tabsStyle} />
                                        <Tab label='NAVIGATION' value='4' className={style.tabsStyle} />
                                        <Tab label='AUSSTATTUNG' value='5' className={style.tabsStyle} />
                                    </TabList>
                                </Box>
                                <TabPanel value='1' className={style.table}>{this.getTabContainer(algemeineAll)}</TabPanel>
                                <TabPanel value='2' className={style.table}>{this.getTabContainer(unterkunftAll)}</TabPanel>
                                <TabPanel value='3' className={style.table}>MOTOR(EN)</TabPanel>
                                <TabPanel value='4' className={style.table}>NAVIGATION</TabPanel>
                                <TabPanel value='5' className={style.table}>AUSSTATTUNG</TabPanel>
                            </TabContext>
                        </Box>
                        <hr />
                        <h2>Other Products By Ort oder ByTyp </h2>
                        <ListRight />
                    </Container>
                    </Box>
            </Container>
            </ThemeProvider>
        )
    }
}