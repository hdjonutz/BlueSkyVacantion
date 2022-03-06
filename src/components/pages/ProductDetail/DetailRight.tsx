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
import ListRight from '../Products/ListRight';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';
import LocationDetails from './location_details';

import { Document, Page, pdfjs } from 'react-pdf';
import samplePDF from '../../../assets/slider/products/423232/prices.pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default class DetailRight extends React.Component<{}, {value: string}> {

    private _algemeine = [
        {name: 'Double bed cabins', detail: '3'},
        {name: 'Cabins', detail: '3'},
        {name: 'Berths', detail: '6-8'},
        {name: 'Wardrobes in cabins for clothes arrangement', detail: ''},
        {name: 'Living Room', detail: 'Large & Spacious'},
        {name: 'Equipment Kitchen', detail: 'full with gas'},
        {name: 'Lifejackets', detail: 'ok'},
        {name: 'Fenster Material', detail: 'Glas'},
    ];
    private _algemeine2 = [
        {name2: 'Double sofa', detail2: 'becomes double bed '}
        /*{name2: 'Wasserlinienlänge (m)', detail2: '21,52'},
        {name2: 'Tiefgang (m)', detail2: '3,96'},
        {name2: 'Stehhöhe (m)', detail2: '2,10'},
        {name2: 'Lancierung', detail2: '2004 after last refit'},
        {name2: 'Gewicht (t)', detail2: '227'},
        {name2: 'Rumpfmaterial', detail2: 'Holtz'},
        {name2: 'Decksluke', detail2: '4'},
        {name2: 'Treibstoftank (Liter)', detail2: 'ja'},*/
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

    private details = [
        {name: 'Marker', detail: 'BENETEAU 41.1'},
        {name: 'Year Model', detail: '2016'},
        {name: 'Sleeping places (Bearths)', detail: '6'},
        {name: 'Capacity', detail: '8'}
    ];
    private marks = [
        {
            value: 0,
            label: 'Volos Base',
            hints: '',
        },
        {
            value: 14,
            label: '**Agios Ioannis',
            hints: '(MAMA MIA Movie)',
        },
        {
            value: 28,
            label: 'Arkos',
            hints: '',
        },
        {
            value: 45,
            label: '**Blue Cave Dasia',
            hints: '(The Cave of the Seal)',
        },
        {
            value: 60,
            label: '**Kastani Beach',
            hints: '(Mama Mia Movie)',
        },
        {
            value: 75,
            label: 'Lalaria',
            hints: '',
        },
        {
            value: 52,
            label: 'Loutraki',
            hints: '',
        },
        {
            value: 64,
            label: 'Panormos',
            hints: '',
        },
        {
            value: 100,
            label: 'Tsougrias',
            hints: '',
        },
    ];

    constructor(props: any) {
        super(props);

        this.state = {
            value: '1'
        };
        this.handleChange = this.handleChange.bind(this);
        this.marks = this.marks.map((f, i) => Object.assign(f, {value: (100 / (this.marks.length - 1)) * i}));
    }

    handleChange(event: React.SyntheticEvent, newValue: string) {
        this.setState({value: newValue});
    };

    getTabContainerSimple(all) {
        return <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
            <TableContainer component={Paper} style={{background: 'none', borderRadius: 0, boxShadow: 'none'}}>
                <Table sx={{ minWidth: 410 }} aria-label='simple table'>
                    <TableBody>
                        {all.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell style={{'padding': '5px', width: '25%'}}>{row.name}</TableCell>
                                <TableCell style={{'padding': '5px', width: '25%'}}>{row.detail}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell style={{'padding': '5px', width: '25%'}}>
                                <NavLink to={'/prices/prices'}>
                                    <Button variant='contained' className='mx-2' color='info' style={{textDecoration: 'none'}}>
                                        See Prices Administrator <br/>
                                        will be removed
                                    </Button>
                                </NavLink>
                            </TableCell>
                            <TableCell style={{'padding': '5px', width: '25%'}}>
                                <Button variant='contained' className='mx-2' color='info'>
                                    Add To Basket
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    }

    getTabContainer(all) {
        return <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
            <TableContainer component={Paper} style={{background: 'none', borderRadius: 0, boxShadow: 'none'}}>
                <Table sx={{ minWidth: 410 }} aria-label='simple table'>
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

    valuetext(value: number): string {
        return `${value} dsdsd`;
    }

    getOrte() {
        /* Volos Base, Agios Ioannis (MAMA MIA Movie), Arkos, Blue Cave Dasia (The Cave of the Seal), Kastani Beach (Mama Mia Movie),
        Kastro, Lalaria, Loutraki, Panormos, Tsougrias */

        let marks = [
            {
                value: 0,
                label: 'Volos Base',
                hints: '',
            },
            {
                value: 14,
                label: '**Agios Ioannis',
                hints: '(MAMA MIA Movie)',
            },
            {
                value: 28,
                label: 'Arkos',
                hints: '',
            },
            {
                value: 45,
                label: '**Blue Cave Dasia',
                hints: '(The Cave of the Seal)',
            },
            {
                value: 60,
                label: '**Kastani Beach',
                hints: '(Mama Mia Movie)',
            },
            {
                value: 75,
                label: 'Lalaria',
                hints: '',
            },
            {
                value: 52,
                label: 'Loutraki',
                hints: '',
            },
            {
                value: 64,
                label: 'Panormos',
                hints: '',
            },
            {
                value: 100,
                label: 'Tsougrias',
                hints: '',
            },
        ];

        marks = marks.map((f, i) => Object.assign(f, {value: (100 / (marks.length - 1)) * i}));

        const valueLabelFormat = (value: number) => {
            const found = marks.find((mark) => mark.value === value);
            return found ? found.hints : '';
        };

        return (
            <Box sx={{ margin: '0 35px' }}>
                <Typography id='track-false-range-slider' gutterBottom>
                    ** Something spectacular happened in some locations **
                </Typography>
                <Slider
                    track={false}
                    valueLabelDisplay='auto'
                    valueLabelFormat={valueLabelFormat}
                    aria-labelledby='track-false-range-slider'
                    getAriaValueText={this.valuetext}
                    defaultValue={marks.map((f) => f.value)}
                    marks={marks}
                />
            </Box>
        )
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
                                    <Typography component='div' variant='h4'>
                                        KOS 41.1
                                    </Typography>
                                    <Typography variant='subtitle1' color='text.secondary' component='div'>
                                        Oceanis 41.1
                                    </Typography>
                                    {this.getTabContainerSimple(this.details)}
                                </CardContent>
                            </Box>
                        </Card>
                        <hr />
                        <h2>Locations</h2>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            {/* this.getOrte() */}
                            <LocationDetails locations={this.marks} />
                        </Box>
                        {/*
                        <Document file={samplePDF}>
                            <Page pageNumber={1} />
                            <Page pageNumber={2} />
                        </Document> */}
                        {/* <embed src={samplePDF} frameborder={0} width='100%' height='640px' title={'title PDF'} /> */}

                        <hr />
                        <Box>
                            <Grid item xs={12} sm={12} xl={12}>
                                <Card variant={'special'}>
                                    <CardContent>
                                        <Typography variant='body2' color='text.secondary'>
                                            The Oceanis 41.1 sets the highest standard for mid-sized yachts. She offers the most in comfort,
                                             performance and customizable space at an even more competitive price.
                                            Our boat is equipped with comfortable cushions ideal for your sunbathing,
                                             two toilets with showers, three cabins and a living room which can host up to 8 people.
                                            Your sailing trips are scheduled in a very unique and pleasant way.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Box>
                        <hr />
                        <h2>Detail yachts {'Oceanis 41.1'}</h2>
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
                                        <Tab label='PRICES' value='5' className={style.tabsStyle} />
                                    </TabList>
                                </Box>
                                <TabPanel value='1' className={style.table}>{this.getTabContainer(algemeineAll)}</TabPanel>
                                <TabPanel value='2' className={style.table}>{this.getTabContainer(unterkunftAll)}</TabPanel>
                                <TabPanel value='3' className={style.table}>MOTOR(EN)</TabPanel>
                                <TabPanel value='4' className={style.table}>NAVIGATION</TabPanel>
                                <TabPanel value='5' className={style.table}>
                                    <embed src={samplePDF} frameBorder={0} width='100%' height='440px' title={'title PDF'} type="application/pdf"/>
                                </TabPanel>
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
