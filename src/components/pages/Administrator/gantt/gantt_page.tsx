import * as React from 'react';
import 'reflect-metadata';
import style from './gantt.less';
import classNames from 'classnames';
import { resolve } from 'inversify-react';
import {RouteComponentProps} from 'react-router';
import {Ids} from '../../../../formsIds';
import {Observable} from 'rxjs';
import {ApiService} from '../../../../services/api_service';
// https://codepen.io/swastikmishra/pen/zYYdKBQ
// https://jsfiddle.net/qwubvg9m/1/
interface IGanttPageState {}

export default class GanttPage extends React.Component<{}, IGanttPageState> {

    @resolve(ApiService) private apiService: ApiService;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.refresh();
    }

    refresh(only_data?: boolean) {
        Observable.combineLatest(
            only_data ? Observable.of(null) : this.apiService.get('getFormConfig').map((res) => res.data || []),
            this.apiService.get('getFormData', {formid: Ids.PRODUCTS}).map((res) => res.data || []),
        ).subscribe(([configForms, items]) => {
            this.setState({});
        });
    }

    render() {
        const countDay      = 7;
        const stepCalendar  = 2;         // 1Month
        const currentDate   = new Date();
        const startCalendar = new Date().setDate(new Date().getDay() - 30);                                         // -1 Month
        const endCalendar   = new Date(currentDate.getTime()).setDate(new Date().getDay() + 30 * stepCalendar);       // +1 Month
        const nameDays      = { en: ['Mon.','Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
                                en_short: ['Mo','Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                                de: ['Mon.','Die.', 'Mit.', 'Don.', 'Fre.', 'Sam.', 'Son.']};

        const weeks = parseInt((30 * (stepCalendar + 1)) / 7 + '') + 1;
        const days  = weeks * 7;

        const country = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
        return (
            <div className={classNames(style.container, style.column)}>
                <table>
                    <thead>
                        <tr style={{zIndex: 3, position: 'relative'}}>
                            <th style={{zIndex: 7}}>&nbsp;</th>
                            {Array.from(Array(weeks).keys()).map((i: number) => <th colSpan={7} style={{zIndex: 6}}>headName</th>)}
                        </tr>
                        <tr style={{zIndex: 3, position: 'relative'}}>
                            <th style={{zIndex: 7}}>&nbsp;</th>
                            {Array.from(Array(weeks).keys()).map((i: number) =>
                                nameDays['en_short'].map((name: string) => <th style={{zIndex: 2}}>{name}</th>)
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from(Array(days).keys()).map((i: number) =>
                            <tr>
                                <th style={{ zIndex: 1}}>{country[i]}</th>
                                {Array.from(Array(days).keys()).map(() => <th>&nbsp;</th>)}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}