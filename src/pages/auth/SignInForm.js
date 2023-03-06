// External imports
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Alert, Button, Col, Row } from "react-bootstrap";
import PatchStyles from 'patch-styles';
// Internal imports
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/SignInUpForm.module.css';
import appStyles from '../../App.module.css';


/* 
Form for user to sign-in to existing account in order to access the site's contents.
Heavily inspired by CI "Moments" walkthrough project
*/
function SignInForm() {
    // Variables
    const setCurrentUser = useSetCurrentUser();
    const [signInData, setSignInData] = useState({
        username: "",
        password: ""
    });
    const { username, password } = signInData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    // Form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("/dj-rest-auth/login/", signInData);
            setCurrentUser(data.user);
            history.push("/");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    // Input display values
    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <PatchStyles classNames={styles}>
            <PatchStyles classNames={appStyles}>

                <Row>
                    <Col className="pt-5"
                        xs={{ span: 10, offset: 1 }}
                        md={{ span: 6, offset: 3 }}
                        xl={{ span: 4, offset: 4 }}>
                        <h1 className="mb-4 pt-md-5 fs-1">Login</h1>

                        <Form onSubmit={handleSubmit}>
                            {/* Username input */}
                            <Form.Group controlId="username">
                                <Form.Label className="d-none">username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                    className="Input"
                                />
                            </Form.Group>
                            {/* Username errors */}
                            {errors.username?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}

                            {/* Password input */}
                            <Form.Group controlId="password">
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    className="Input"
                                />
                            </Form.Group>
                            {/* Password errors */}
                            {errors.password?.map((message, idx) => (
                                <Alert key={idx} variant="warning">
                                    {message}
                                </Alert>
                            ))}

                            {/* Submit */}
                            <Button
                                type="submit"
                                size="lg"
                                variant="warning"
                                className="my-3 Submit BgOrange text-white"
                            >
                                Sign In
                            </Button>
                            {/* Non-field errors */}
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert key={idx} variant="warning" className="mt-3">
                                    {message}
                                </Alert>
                            ))}
                        </Form>

                        {/* Link to account registration */}
                        <Link to="/register">
                            Don't have an account? <span>Sign up now!</span>
                        </Link>
                    </Col>
                </Row>

            </PatchStyles>
        </PatchStyles>
    );
}

export default SignInForm;