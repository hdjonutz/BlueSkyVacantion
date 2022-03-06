import React from 'react'
import { PDFExport } from '@progress/kendo-react-pdf';

import style from './prices_page.less';
import classNames from 'classnames';
import Button from '@mui/material/Button';


interface PricesPageStates {
    text: string;
    value: string;
    currentPage: number;
}

export default class PricesPage extends React.Component<{}, PricesPageStates> {
    private pdfExportComponent: any;
    private paper: any;

    constructor(props: any) {
        super(props);
        this.state = {
            text: 'A4',
            value: 'size-a4',
            currentPage: 1,
        };
        this.handleExportWithComponent = this.handleExportWithComponent.bind(this);
        this.showPage = this.showPage.bind(this);
    }

    handleExportWithComponent(event) {
        const tmpCurrentpage = this.state.currentPage;
        if (this.pdfExportComponent) {
            this.setState({currentPage: 3}, () => {
                window.setTimeout(() => {
                    this.pdfExportComponent.save();
                }, 1000);
                window.setTimeout(() => {
                    this.setState({currentPage: tmpCurrentpage});
                }, 2000);
            })
        }
    };

    getTitleDetail(title, detail?: string) {
        return <div className={style['addresses']}>
            <div className={classNames(style['for'], style['red'])}>
                <h3>{title}</h3>
                {detail && <p>{detail}</p>}
            </div>
        </div>
    }
    getInfo(info) {
        return <div className={style['addresses']}>
            <div className={classNames(style['for'], style['red'])}>
                <p>{info}</p>
            </div>
        </div>
    }

    getTableInfo(size, title, infos) {
        return <div className={style['addresses']} style={{paddingBottom: '10px'}}>
            <div className={classNames(style['for'], style['red'])} style={{flex: 1, flexDirection: 'row', display: 'flex'}}>
                <div style={{marginRight: '20px', width: `${size}px`, minWidth: `${size}px`, padding: 0, border: 0, margin: 0}}>
                    <p style={{padding: 0, margin: 0}}><b>{title}</b></p>
                </div>
                <div>{infos.map((p, k) => <p key={k} style={{padding: 0, border: 0, margin: 0}}>{p}</p>)}</div>
            </div>
        </div>
    }

    getHeader(): JSX.Element {
        return <div className={style['pdf-header']}>
                                    <span className={style['company-logo']}>
                                      <img src={'assets/svg/logo.svg'} style={{height: '80px'}} alt='Company Logo' /> Meandro Jachting LTD
                                    </span>
            <div className={style['from']}>
                <p>
                    Mary Mary<br />
                    Lützowplatz 456<br />
                    Berlin, Germany, 10785
                </p>
                <p>
                    von: 01.01.2022<br />
                    bis: 29.12.2022<br />
                </p>
            </div>
        </div>
    }

    getFooter(): JSX.Element {
        return <div className={style['pdf-footer']}>
            <p>
                Meandros jachting LTD
                <br />
                Lützowplatz 456
                <br />
                Berlin, Germany, 10785
            </p>
        </div>
    }

    showPage(nr: number): void {
        const length = this.paper.getElementsByClassName(style['inner-page']).length;
        const nextPage = this.state.currentPage + nr;
        if (0 < nextPage && nextPage <= length) {
            this.setState({currentPage: nextPage});
        }
    }

    render() {
        return(
            <div className={style.container}>
                <div className={style.action}>
                    <div>Prices Export PDF</div>
                    <Button variant='outlined' onClick={this.handleExportWithComponent}>Export</Button>
                    <Button variant='outlined' onClick={() => this.showPage(-1)}> &nbsp; {'<--'} &nbsp; </Button>
                    <Button variant='outlined' onClick={() => this.showPage(+1)}> &nbsp; {'-->'} &nbsp;</Button>
                </div>
                <div className='page-container hidden-on-narrow'>
                    <PDFExport ref={(ref) => this.pdfExportComponent = ref} forcePageBreak={'.page-break'}>
                        <div className={classNames(style['pdf-page'], style[this.state.value] )} ref={(ref) => this.paper = ref}>
                            <div className={classNames(style['inner-page'], this.state.currentPage === 1 || this.state.currentPage === 3 ? '' : style.displayNone) }>
                                {this.getHeader()}
                                {this.getTitleDetail('VOLOS BASE', 'Saturday Charters(skippered or bareboat charter. charter less than 7 day, upon request and subject to the period)')}
                                <div>
                                    <table>
                                        <tr>
                                            <th><b></b><br/></th>
                                            <th><b>April</b><br/>26/03-30/04</th>
                                            <th><b>May</b><br/>30/04-28/05</th>
                                            <th><b>June</b><br/>28/05-25/06</th>
                                            <th><b>July</b><br/>25/06-30/07</th>
                                            <th><b>August</b><br/>30/07-27/08</th>
                                            <th><b>September</b><br/>27/08-01/10</th>
                                            <th><b>October</b><br/>01/10-20/10</th>
                                        </tr>
                                        <tr>
                                            <td><b>BENETEAU OCEANIS 41,1</b></td>
                                            <td>1.600</td>
                                            <td>2.150</td>
                                            <td>2.750</td>
                                            <td>3.150</td>
                                            <td>3.750</td>
                                            <td>3.050</td>
                                            <td>2.150</td>
                                        </tr>
                                    </table>
                                </div>

                                <div className={style.leftBold}>{this.getInfo('Prices are in euro (€) per week (VAT included)')}</div>
                                {this.getInfo('Discounts: Max discount: 15%, Multiple weeks: 5%, Early bookin > 31.10.2022 10% Repeat Client: 5%')}
                                {this.getTitleDetail('TERMS AND CONDITIONS OF CHARTER', 'Charter begin at 17:00hrs and end at 9:00hts, Mandatory, the yacht must return in the base the day before, the latest at 18hts.')}
                                {this.getTableInfo(130, 'Payment:', ['- payment is via bank transfer. (Payment via VISA is possible but commission charge apply 3% or 1,5%)', '- 50% of charter price at time of booking', '- remaining 50% of charter price 60 days before charter'])}
                                {this.getTableInfo(130, 'Cancelation policy:', ['- less than 30 days before carter : 100% of total carter price', '- between 30 and 60 days before carter: 50% of total carter price', '- 60 days os more before charter: 30% of total carter price'])}
                                {this.getTableInfo(130, 'Security deposit:', ['- 2000 € for Beneteau Oceanis, no security deposit for Bavaria.', '- to be payed at check-in via Visa, Mastercard or cash. Security deposit is required for Beneteau even if skiper is hireat extra cost'])}
                                {this.getTableInfo(130, 'Insurance:', ['- the yachts are properly covered with full and third party liability for chartes business. The clöient#s liability is limited to the amount of security deposit, unleass the care of damage is ggross nel´gligence or an internationat act.'])}
                                {this.getTableInfo(130, 'End Cleaning:', ['- 130 €'])}
                                {this.getTitleDetail('OPTIONAL EXTRA SERVICES')}
                                {this.getTableInfo(210, 'Skipper of Beneteau:', ['- 170€ /day + meals'])}
                                {this.getTableInfo(210, 'Hostess/Yacht Assistance:', ['- 120€ /day + meals'])}
                                {this.getTableInfo(210, 'Safety Net:', ['- 200€'])}
                                {this.getTableInfo(210, 'One WaySailing:', ['- 200€ Passible between Volos Base and Skiathos Base'])}
                                {this.getTableInfo(210, 'Outboard Engine(incl. full fuel tank):', ['- 80€ /week'])}
                                {this.getTableInfo(210, 'SUP:', ['- 130€ /week'])}
                                {this.getTableInfo(210, 'Early Embarkation:', ['- 120€'])}
                                {this.getTableInfo(210, 'Extra Snorkelling Equipment:', ['- 10€/set/week'])}
                                {this.getTableInfo(210, 'Extra linine:', ['- 10€ per set (1xset=2sheets, 1 pillow case, 1 face towel, 1 bath towel)'])}
                                {this.getFooter()}
                                <p className={'page-break'}></p>
                            </div>

                            <div className={classNames(style['inner-page'], this.state.currentPage === 2 || this.state.currentPage === 3 ? '' : style.displayNone)}>
                                {this.getHeader()}
                                {this.getTitleDetail('EQUIPMENT INCLUDED', 'One full set per week: bed linen, bath towels, beach towels for every crew member, kitchen towels, pillows, light quilted blankets')}
                                {this.getInfo('Full kitchen equipment, dinghy with oars, CD-play, Autopilot, GPS/Plotter, one set of snorkeling gear, Greek Water Pilot book, Mapof the sailing region.')}
                                {this.getInfo('Our boats are equiped with bimini top, sprayhood and cookpit cushoons.')}
                                {this.getTitleDetail('NOT INCLUDED', '(nust be paid on post) Fuel, water, gasoline, provisioning')}
                                {this.getTitleDetail('SAILING LICENSE REQUIREMENT', 'In Greece when chartering a bareboat yacht, accoarding to the port authorities\'requests, the client must provide original sailing certificate/license,(in English language or officially translated). Certificates for motor yachts, day-skipper or sailing on day-light only, weater limitations are not accepted from the Port Authorities.')}
                                {this.getFooter()}
                                <p className={'page-break'}></p>
                            </div>
                        </div>
                    </PDFExport>
                </div>
            </div>
        )
    }
}

// hints:
// https://codesandbox.io/s/4foib?file=/src/App.js:1172-1189
// displayPdf:
// `<embed src="${path}" frameborder="0" width="100%" height="640px" title="${title}">`

// html to pdf : html2pdf
// html2pdf().from(document.getElementById('idName'))
//     .set({
//         margin:       [0.8, 1, 0, 1],
//         filename:     'Zwangbremsung.pdf',
//         image:        { type: 'jpeg', quality: 0.98 },
//         html2canvas:  { scale: 2 },
//         jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
//     })
//     .save()
//     .then(
//         () => { ....},
//         () => {....}
//     );
