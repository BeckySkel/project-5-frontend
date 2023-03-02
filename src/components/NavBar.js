import { React, useState } from 'react';
import PatchStyles from 'patch-styles';
import styles from '../styles/NavBar.module.css';
import { Container, Navbar, Nav, NavDropdown, Collapse, Fade } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <PatchStyles classNames={styles}>

      <Navbar className="bg-gradient NavBar" variant="dark">
        <Container fluid>
          <NavLink to="/">
            <Navbar.Brand className="ps-2">
              <div className="circle d-inline-block align-top"></div>
              <span className="logo">Devise</span>
            </Navbar.Brand>
          </NavLink>

          <div className="account-menu-container"
            onMouseEnter={() => setOpen(!open)}
            onMouseLeave={() => setOpen(!open)}
            aria-controls="account-menu"
            aria-expanded={open}>
            <i className="fas fa-user user-icon"></i>

            <Fade in={open} id="account-menu" className="account-menu">
              <Nav className="flex-column">
                <Nav.Item>
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                </Nav.Item>
                <Nav.Item>
                <NavLink to="/register" className="nav-link">Register</NavLink>
                </Nav.Item>
              </Nav>
            </Fade>
          </div>

        </Container>
      </Navbar>

    </PatchStyles >
  )
}

export default NavBar;