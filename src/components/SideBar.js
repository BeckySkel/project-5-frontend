import PatchStyles from 'patch-styles';
import React, { useContext } from 'react'
import { Nav, Button, Col } from 'react-bootstrap';
import styles from '../styles/SideBar.module.css';
import appStyles from "../App.module.css";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';


const SideBar = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const currentUser = useCurrentUser();

    return (
        <PatchStyles classNames={styles}>
            <PatchStyles classNames={appStyles}>
                <Button className="position-absolute m-2 Bg-Navy MenuButton" onClick={() => setMenuOpen(!menuOpen)}><i className="fa-solid fa-bars"></i></Button>
                <Col xs={menuOpen ? 12 : 0} sm={menuOpen ? 10 : 0} md={menuOpen ? 3 : 0} lg={menuOpen ? 2 : 0} className={`Menu Bg-Navy text-start ${menuOpen ? "d-block" : "d-none"}`}>

                    <Nav className="flex-column bg-navy pt-5" variant="pills">
                        <Nav.Item className="text-white fw-bold">Welcome {currentUser.username}!</Nav.Item>
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