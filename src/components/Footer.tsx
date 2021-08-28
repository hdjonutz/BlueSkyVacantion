
import * as React from 'react';
import style from './FooterMenu.less';
import classNames from "classnames";

export default class FooterMenu extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <footer className={style.footer}>
                <div className={style.container}>
                    <div className={style.columns}>
                        <div className={style.column}>
                            <ul>
                                <li className={style.column_title}>Services</li>
                                <li>Tips</li>
                                <li>c1_li_2</li>
                                <li>c1_li_3</li>
                            </ul>
                        </div>
                        <div className={style.column}>
                            <ul>
                                <li className={style.column_title}>Domains</li>
                                <li>Trips</li>
                                <li>Coaching</li>
                                <li>c2_li_3</li>
                            </ul>
                        </div>
                        <div className={style.column}>
                            <ul>
                                <li className={style.column_title}>About Us</li>
                                <li>c3_li_1</li>
                                <li>c3_li_2</li>
                                <li>c3_li_3</li>
                            </ul>
                        </div>
                        <div className={style.column}>
                            <ul>
                                <li className={style.column_title}>Column 4 Title</li>
                                <li>c4_li_1</li>
                                <li>c4_li_2</li>
                                <li>c4_li_3</li>
                            </ul>
                        </div>
                    </div>
                    <div className={style.columns}>
                        <div className={classNames(style.column, style.noMarginBottom)}>
                            <ul><li className={style.column_title}>Contacts</li></ul>
                        </div>
                    </div>
                    <div className={style.columns}>
                        <div className={classNames(style.column, style.noMarginTop)}><ul><li>
                            <img src={'../assets/icons/contacts_email.svg'} /> info@elinext.com
                        </li></ul>
                        </div>
                        <div className={classNames(style.column, style.noMarginTop)}><ul><li>
                            <img src={'../assets/icons/contacts_phone.svg'} /> (+49) 07437 457362
                        </li></ul>
                        </div>
                        <div className={classNames(style.column, style.noMarginTop)}><ul><li>
                            <img src={'../assets/icons/contacts_skype.svg'} /> blueskey.group
                        </li></ul>
                        </div>
                        <div className={classNames(style.column, style.noMarginTop)}><ul><li>
                            <button onClick={() => {}}>CONTACT ME</button>
                        </li></ul>
                        </div>
                        <div className={classNames(style.column, style.noMarginTop)}><ul><li>
                            <img src={'../assets/icons/social_facebook.svg'} />
                            <img src={'../assets/icons/social_instagram.svg'} />
                            <img src={'../assets/icons/social_twitter.svg'} />
                            <img src={'../assets/icons/social_linkedin.svg'} />
                        </li></ul>
                        </div>
                    </div>
                    <div className={classNames(style.columns, style.copyright)}>
                        <div className={style.column}>
                            <ul><li>
                                © 2021 BlueSkyVacantion | All Rights Reserved | Privacy Policy
                            </li></ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
