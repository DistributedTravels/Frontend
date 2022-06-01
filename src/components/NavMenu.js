import React, { Component} from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu,DropdownItem } from 'reactstrap';
import { Link} from 'react-router-dom';
import './NavMenu.css';


export class NavMenu extends Component {
    static displayName = NavMenu.name;
    

  constructor (props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
          dropdownOpen: false,
      };
      

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
        collapsed: true
    };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
          
        }));
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    logout() {
       
        sessionStorage.clear();
        window.location.href = "/login"
}


    render() {
        let data = sessionStorage.getItem('user-key');
        if (!(data === null)) {
            data = JSON.parse(data);
        }

        
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
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/changes">Zmiany</NavLink>
                </NavItem>

                {sessionStorage.getItem('user-key') ?
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                                        {data.user}
                        </DropdownToggle>
                        <DropdownMenu>

                            <DropdownItem onClick={this.logout}>Wyloguj</DropdownItem>
                            <DropdownItem tag={Link} className="text-dark" to="/myAccount">Moje konto</DropdownItem>

                        </DropdownMenu>
                    </Dropdown>:
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
