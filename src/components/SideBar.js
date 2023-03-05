import PatchStyles from 'patch-styles';
import React from 'react'
import { Nav, Button, Col } from 'react-bootstrap';
import styles from '../styles/SideBar.module.css';
import appStyles from "../App.module.css";
import { useState } from 'react';


const SideBar = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <PatchStyles classNames={styles}>
            <PatchStyles classNames={appStyles}>
            <Button className="position-absolute m-2 Bg-Navy MenuButton" onClick={() => setMenuOpen(!menuOpen)}><i className="fa-solid fa-bars"></i></Button>
            <Col xs={menuOpen ? 12 : 0} sm={menuOpen ? 10 : 0} md={menuOpen ? 3 : 0} lg={menuOpen ? 2 : 0} className={`Menu Bg-Navy text-start ${menuOpen ? "d-block" : "d-none"}`}>

                <Nav defaultActiveKey="/home" className="flex-column bg-navy pt-5" variant="tabs">
                    <Nav.Item className="text-white fw-bold">Welcome {props.userName}!</Nav.Item>
                    <Nav.Link href="/home">Dashboard</Nav.Link>
                    <Nav.Link eventKey="link-1">My Projects</Nav.Link>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav>
            </Col>
        </PatchStyles>
        </PatchStyles>
    )
}

export default SideBar;