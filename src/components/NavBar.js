import React from 'react';
import PatchStyles from 'patch-styles';
import styles from '../styles/NavBar.module.css';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
  return (
    <PatchStyles classNames={styles}>

    <Navbar className="bg-gradient NavBar" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home" className="ps-2">
          <div className="circle d-inline-block align-top"></div>
            <span className="logo">Devise</span>
        </Navbar.Brand>
          <Nav className="ml-auto pe-1">
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Home</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Register</NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Container>
    </Navbar>
    </PatchStyles>
  )
}

export default NavBar;