// External imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import PatchStyles from "patch-styles";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import emailjs from '@emailjs/browser';
import { v4 as uuidv4 } from 'uuid';


/* 
Form for user to sign-up and create new account in order to access the site's contents.
Heavily inspired by CI "Moments" walkthrough project
*/
const SignUpForm = () => {
    // Variables
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: ""
    });
    const { username, password1, password2 } = signUpData;
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    // Input display values
    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    // Form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData)
            emailjs.send("service_6ue6ujt", "template_m1tfcmy", {
                username: username,
                verification_code: uuidv4()
            }, "nvcR62V0DXNK9zmT3");
            setSubmissionSuccess(true);
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <PatchStyles classNames={styles}>
            <PatchStyles classNames={appStyles}>

                <Row>
                    <Col
                        xs={{ span: 10, offset: 1 }}
                        md={{ span: 6, offset: 3 }}
                        xl={{ span: 4, offset: 4 }}
                    >
                        {submissionSuccess ? <>
                            <h1>Success!</h1>
                            <p>An email has been sent to XX</p>
                        </> :
                            <>
                                <h1 className="mb-4 pt-md-5 fs-1">Register</h1>

                                <Form onSubmit={handleSubmit}>
                                    {/* Username input */}
                                    <Form.Group controlId="username">
                                        <Form.Label className="d-none">username</Form.Label>
                                        <Form.Control
                                            className="Input"
                                            type="text"
                                            placeholder="Username"
                                            name="username"
                                            value={username}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    {/* Username errors */}
                                    {errors.username?.map((message, idx) => (
                                        <Alert variant="warning" key={idx}>
                                            {message}
                                        </Alert>
                                    ))}

                                    {/* Password input */}
                                    <Form.Group controlId="password1">
                                        <Form.Label className="d-none">Password</Form.Label>
                                        <Form.Control
                                            className="Input"
                                            type="password"
                                            placeholder="Password"
                                            name="password1"
                                            value={password1}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    {/* Password errors */}
                                    {errors.password1?.map((message, idx) => (
                                        <Alert key={idx} variant="warning">
                                            {message}
                                        </Alert>
                                    ))}

                                    {/* Confirm password input */}
                                    <Form.Group controlId="password2">
                                        <Form.Label className="d-none">Confirm password</Form.Label>
                                        <Form.Control
                                            className="Input"
                                            type="password"
                                            placeholder="Confirm password"
                                            name="password2"
                                            value={password2}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    {/* Confirm password errors */}
                                    {errors.password2?.map((message, idx) => (
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
                                        Sign Up
                                    </Button>
                                    {/* Non-field errors */}
                                    {errors.non_field_errors?.map((message, idx) => (
                                        <Alert key={idx} variant="warning" className="mt-3">
                                            {message}
                                        </Alert>
                                    ))}
                                </Form>
                            </>}

                        {/* Link to account login */}
                        <Link className={styles.Link} to="/login">
                            Already have an account? <span>Sign in</span>
                        </Link>
                    </Col>
                </Row>

            </PatchStyles>
        </PatchStyles >
    );
};

export default SignUpForm;