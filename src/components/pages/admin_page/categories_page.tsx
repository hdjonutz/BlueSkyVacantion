import * as React from 'react';
import 'reflect-metadata';
import style from './admin_page.less';
import { resolve } from 'inversify-react';
import {RouteComponentProps} from 'react-router';

export default class CategoriesPage extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={style.container}>
                Categories page
                {console.log(this.props)}
            </div>
        )
    }
}