// External imports
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PatchStyles from 'patch-styles';
import { Nav, Button, Col } from 'react-bootstrap';
// Internal imports
import styles from '../styles/SideBar.module.css';
import appStyles from "../App.module.css";
import { useCurrentUser } from '../contexts/CurrentUserContext';


/* 
Collapsible sidebar which welcomes the user and displays their projects with
option to create new ones 
*/
const SideBar = () => {
    // Variables
    const [menuOpen, setMenuOpen] = useState(false);
    const currentUser = useCurrentUser();

    return (
        <PatchStyles classNames={styles}>
            <PatchStyles classNames={appStyles}>

                {/* Menu show/hide */}
                <Button className="position-absolute m-2 BgNavy MenuButton" onClick={() => setMenuOpen(!menuOpen)}>
                    <i className="fa-solid fa-bars"></i>
                </Button>

                {/* Collapsible menu */}
                <Col
                    xs={10}
                    sm={5}
                    md={3}
                    lg={2}
                    className={`Menu BgNavy text-start ${menuOpen ? "d-block" : "d-none"}`}
                >
                    <Nav className="flex-column pt-5" variant="pills">
                        {/* Welcome user */}
                        <Nav.Item className="text-white fw-bold">Welcome {currentUser.username}!</Nav.Item>
                        {/* Navigation links */}
                        <Nav.Item>
                            <NavLink exact to="/" className="nav-link">Dashboard</NavLink>
                        </Nav.Item>
                        <Nav.Item className="text-white fw-bold">
                            My Projects
                            {console.log(currentUser)}
                            <NavLink exact to="/1" className="nav-link">Project 1</NavLink>
                            <NavLink exact to="/2" className="nav-link">Project 2</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/new" className="nav-link">New <i className="fa-solid fa-plus"></i></NavLink>
                        </Nav.Item>
                    </Nav>
                </Col>

            </PatchStyles>
        </PatchStyles>
    )
}

export default SideBar;