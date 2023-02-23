import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar className="bg-light bg-gradient" expand="md">
      <Container fluid>
        <Navbar.Brand href="#home">
          <div id="logo"></div>
          Devise
        </Navbar.Brand>
          <Nav className="ml-auto">
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Home</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Register</NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar;