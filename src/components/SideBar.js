import PatchStyles from 'patch-styles';
import React from 'react'
import { Nav } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';

const SideBar = () => {
    return (
        <PatchStyles classNames={styles}>
        <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home">Active</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
                Disabled
            </Nav.Link>
        </Nav>
        </PatchStyles>
    )
}

export default SideBar;