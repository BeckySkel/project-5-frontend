import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { Nav, NavDropdown } from 'react-bootstrap';

function Example() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                onMouseEnter={() => setOpen(!open)}
                onMouseLeave={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                click
            </Button>

            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Nav>
                        <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Register</NavDropdown.Item>
                    </Nav>
                </div>
            </Collapse>
        </>
    );
}

export default Example;