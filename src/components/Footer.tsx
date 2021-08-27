
import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import style from './FooterMenu.less';

export default class FooterMenu extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <footer>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                            <ul className="navbar-nav flex-grow" className={style.footer}>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">1</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/page1">2</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/page2">3</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/page2">4</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </footer>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}