import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import style from './page-layout.less';
import {missingI18n} from '../../../../i18n/i18n';
import {withRouter} from 'react-router';
import {RouteComponentProps} from 'react-router';
import {Link} from 'react-router-dom';

interface PageLayoutProps {
    title: string;
    titleElement?: React.ReactElement<any>;
    canGoBack?: boolean;
    scroll?: boolean;
    className?: string;
    fullscreen?: boolean;
    toolbar?: React.ReactElement<any>;
    toolbarFlex?: boolean;
}

interface PageLayoutState {
    isSlave: boolean;
    versionInfo?: VersionInfo;
    mandantenInfo?: MandantenInfo;
    serverBadge?: string;
}

interface PageLayoutContext {
    isLegacyEmbedder?: boolean;
}

class PageLayout extends React.Component<PageLayoutProps & RouteComponentProps<any>, PageLayoutState> {
    public static defaultProps: Partial<PageLayoutProps> = {
        scroll: true,
        className: style.defaultPadding,
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

    componentDidUpdate(previousProps: PageLayoutProps, previousState: PageLayoutState) {
        if (this.props.title !== previousProps.title) {
            this.titleService.setTitle(this.props.title);
        }
    }

    render() {
        return (
            <div className={style.page}>
                <div className={style.info}>
                    <Link to='/konfiguration/about'>
                        {this.state.serverBadge && <span className={style.badge}>{this.state.serverBadge}</span>}
                        {this.state.mandantenInfo &&
                            <span>
                                {missingI18n('Mandant: {langname}', {langname: this.state.mandantenInfo.langname})}
                            </span>}
                    </Link>
                </div>}
            </div>
        );
    }

    onGoBack() {
        this.props.history.goBack();
    }
}

export default withRouter<PageLayoutProps>(PageLayout);
