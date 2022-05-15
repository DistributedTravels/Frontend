import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

var user = null;
var isLogged = null;

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
        collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
    }

    componentDidMount() {
        const userSS = sessionStorage.getItem('user-key');
        
        if (!(userSS === null)) {

            this.isLogged = true;
            this.user = userSS;
        }
        else {
            this.isLogged = false;
            this.user = null;
        }
    }
    componentDidUpdate() {
        const userSS = sessionStorage.getItem('user-key');

        if (!(userSS === null)) {

            this.isLogged = true;
            this.user = userSS;
        }
        else {
            this.isLogged = false;
            this.user = null;
        }
    }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Distributed Travels</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">Strona główna</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/destinations">Kierunki podróży</NavLink>
                </NavItem>

                {this.isLogged ?
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/logout">Wyloguj</NavLink>
                    </NavItem> :
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/login">Zaloguj</NavLink>
                    </NavItem>
                 }
                
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
