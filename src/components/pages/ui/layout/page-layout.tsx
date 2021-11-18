import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import style from './page-layout.less';
import {withRouter} from 'react-router';
import {RouteComponentProps} from 'react-router';

interface PageLayoutProps {
    toolbar?: React.ReactElement<any>;
    toolbarFlex?: boolean;
}

interface PageLayoutContext {
    isLegacyEmbedder?: boolean;
}

class PageLayout extends React.Component<PageLayoutProps & RouteComponentProps<any>, {}> {
    public static defaultProps: Partial<PageLayoutProps> = {
        fullscreen: false,
    };

    static contextTypes = {
        isLegacyEmbedder: PropTypes.bool
    };

    context: PageLayoutContext;

    constructor(props: PageLayoutProps & RouteComponentProps<any>) {
        super(props);

        this.state = {isSlave: false};
        // this.titleService.setTitle(props.title);
        // this.onGoBack = this.onGoBack.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className={style.page}>
                PAGE LAYOUT
            </div>
        );
    }

    // render() {
    //     return (
    //         <div className={style.page}>
    //             <div className={style.info}>
    //                 <Link to='/konfiguration/about'>
    //                     {this.state.serverBadge && <span className={style.badge}>{this.state.serverBadge}</span>}
    //                     {this.state.mandantenInfo &&
    //                         <span>
    //                             {missingI18n('Mandant: {langname}', {langname: this.state.mandantenInfo.langname})}
    //                         </span>}
    //                 </Link>
    //             </div>
    //         </div>
    //     );
    // }

    // onGoBack() {
    //     this.props.history.goBack();
    // }
}

export default withRouter<PageLayoutProps>(PageLayout);
