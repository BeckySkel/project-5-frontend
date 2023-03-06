// External imports
import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PatchStyles from 'patch-styles';
import { Container, Navbar, Nav, Fade } from 'react-bootstrap';
import slugify from 'react-slugify';
// Internal imports
import { useCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/NavBar.module.css';
import appStyles from '../App.module.css';


/* 
Simple navbar which displays the logo (links to homepage) in the far left
and a dynamic (different links if user logged in or out) account menu on the right 
*/
const NavBar = () => {
  // Variables
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const currentUser = useCurrentUser();
  const Links = currentUser ? ['Logout', 'Edit Profile'] : ['Login', 'Register'];

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>

        <Navbar className="bg-gradient BgNavy NavBar" variant="dark">
          <Container fluid>
            {/* Logo (links to homepage) */}
            <NavLink to="/">
              <Navbar.Brand className="ps-1">
                <div className="Circle BgPurple d-inline-block align-top"></div>
                <span className="Logo">Devise</span>
              </Navbar.Brand>
            </NavLink>

            {/* Stylised account menu which expands when hovered over */}
            <div className="AccountMenuContainer BgOrange"
              onMouseEnter={() => setAccountMenuOpen(!accountMenuOpen)}
              onMouseLeave={() => setAccountMenuOpen(!accountMenuOpen)}
              aria-controls="account-menu"
              aria-expanded={accountMenuOpen}>
              {/* User icon */}
              <i aria-label="Account Menu" className="fas fa-user UserIcon"></i>

              {/* Links rendered as list */}
              <Fade in={accountMenuOpen} id="account-menu" className="AccountMenu">
                <Nav className="flex-column">
                  {Links.map(link => (
                    <Nav.Item key={link}>
                      <NavLink to={`/${slugify(link)}`} className="nav-link">{link}</NavLink>
                    </Nav.Item>
                  ))}
                </Nav>
              </Fade>
            </div>
          </Container>
        </Navbar>

      </PatchStyles >
    </PatchStyles>
  )
}

export default NavBar;