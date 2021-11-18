
import * as React from 'react';
import { connect } from 'react-redux';
import style from './Home.less';
import {i18n} from "../../../i18n/i18n";

const Home = () => (
    <div className={style.container}>
        {/*<div><img src={'../assets/icons/book.png'}/></div>*/}
        {/*<h1>{i18n('aktionen.abbrechen')} aha</h1>*/}

        <div>
            <img src={'../assets/images/atenas_01.jpg'} />
        </div>
    </div>
);

export default connect()(Home);
