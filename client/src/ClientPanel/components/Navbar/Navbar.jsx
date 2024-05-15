// Navbar.js

import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from 'reactstrap';
import logo from '../../assets/img/logo.PNG'

const NavbarMain = ({ isLoggedIn, handleLogout }) => {
  const [navbarColor, setNavbarColor] = React.useState('navbar-transparent');
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle('nav-open');
  };

  React.useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor('');
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor('navbar-transparent');
      }
    };

    window.addEventListener('scroll', updateNavbarColor);

    return function cleanup() {
      window.removeEventListener('scroll', updateNavbarColor);
    };
  });

  return (
    <Navbar className={classnames('fixed-top', navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand data-placement="bottom" to="/" tag={Link} style={{ display: 'inline-block' }}>
            <img
              src={logo}
              alt="Fitness Hub"
              style={{
                maxWidth: '100%',
                height: 'auto',
                width: 'auto',
                maxHeight: '100px',
                display: 'block',
                '@media (max-width: 768px)': {
                  maxHeight: '80px'
                },
                '@media (max-width: 576px)': {
                  maxHeight: '60px'
                }
              }}
            />
          </NavbarBrand>


          <button
            aria-expanded={navbarCollapse}
            className={classnames('navbar-toggler navbar-toggler', {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink data-placement="bottom" to="/" tag={Link}>
                <i className="fa fa-home" />
                <p className="d-lg-none">Home</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-placement="bottom" to="/about" tag={Link}>
                <i className="fa fa-info" />
                <p className="d-lg-none">About Us</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-placement="bottom" to="/" tag={Link}>
                <i className="fa fa-phone" />
                <p className="d-lg-none">Contact Us</p>
              </NavLink>
            </NavItem>
            <NavItem>
              {isLoggedIn && (
                <NavLink tag={Link} to="/members">
                  Member
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {isLoggedIn ? (
                <NavLink onClick={handleLogout} to="#">
                  Logout
                </NavLink>
              ) : (
                <NavLink tag={Link} to="/login">Login</NavLink>
              )}
            </NavItem>
            <NavItem>
              {isLoggedIn ? (
                <Button className="btn-round" color="danger" tag={Link} to="/profile">
                  Profile
                </Button>
              ) : (
                <Button className="btn-round" color="danger" tag={Link} to="/register">
                  Join Us
                </Button>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMain;
