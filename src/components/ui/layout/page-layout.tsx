import React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import style from './page-layout.less';
import {withRouter} from 'react-router';
import {RouteComponentProps} from 'react-router';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';


interface IPageLayoutProps {
    toolbar?:       React.ReactElement<any>;
    toolbarFlex?:   boolean;
    footer?:        boolean;
    header?:        boolean;
}

interface IPageLayoutContext {
    isLegacyEmbedder?: boolean;
}

class LayoutPage extends React.Component<IPageLayoutProps & RouteComponentProps<any> & { children?: React.ReactNode }, {}> {
    public static defaultProps: Partial<IPageLayoutProps> = {
        // children:   React.ReactNode
    };

    static contextTypes = {
        isLegacyEmbedder: PropTypes.bool
    };

    context: IPageLayoutContext;

    constructor(props: IPageLayoutProps & RouteComponentProps<any>) {
        super(props);
        this.state = {isSlave: false};
    }
    render() {
        return (
            <React.Fragment>
                {!(this.props.header === false) && <Header />}
                {this.props.children}
                {!(this.props.footer === false) && <Footer />}
            </React.Fragment>
        );
    }
}

export default withRouter<IPageLayoutProps>(LayoutPage);
