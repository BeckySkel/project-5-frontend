import PatchStyles from 'patch-styles';
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import appStyles from "../App.module.css";


const SideBar = () => {
    return (
        <PatchStyles classNames={`${styles} ${appStyles}`}>
            <Nav defaultActiveKey="/home" className="flex-column bg-navy pt-5" variant="tabs">
                <Nav.Link href="/home">Dashboard</Nav.Link>
                <Nav.Link eventKey="link-1">My Projects</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav>
        </PatchStyles>
    )
}

export default SideBar;