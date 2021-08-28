
import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import style from './NavMenu.less';
import classNames from "classnames";
import ReactTooltip from "react-tooltip";

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <div className={style.headerContainer}>
                            AAAAA
                        </div>
                        <NavbarBrand tag={Link} to="/"></NavbarBrand>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                            <ul className={classNames("navbar-nav flex-grow", style.menu_right)}>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">
                                        <p data-tip="Aha i will found you">1</p>
                                        <ReactTooltip />
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/page1">
                                        <p data-tip="On click you will go to page 2">2</p>
                                        <ReactTooltip />
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/page2">
                                        <p data-tip="hello world here is a tooltip">3</p>
                                        <ReactTooltip />
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/page2">
                                        <p data-tip="Bla bla bla ">4</p>
                                        <ReactTooltip />
                                    </NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
