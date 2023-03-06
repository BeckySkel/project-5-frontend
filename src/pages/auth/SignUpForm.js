// External imports
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import PatchStyles from "patch-styles";
// Internal imports
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import emailjs from '@emailjs/browser';


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
    const history = useHistory();

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
            // history.push("/login");
            emailjs.send("service_6ue6ujt", "template_m1tfcmy", {
                name: 'James',
                notes: 'Check this out!'
            }, "nvcR62V0DXNK9zmT3")
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });

            setSubmissionSuccess(true);
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <PatchStyles classNames={styles}>
            <Row>
                <Col>
                    <Container>

                        {submissionSuccess ? <>
                            <h1>Success!</h1>
                            <p>An email has been sent to XX</p>
                        </> :
                            <><h1>Register</h1>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="username">
                                        <Form.Label className="d-none">username</Form.Label>
                                        <Form.Control
                                            className={styles.Input}
                                            type="text"
                                            placeholder="Username"
                                            name="username"
                                            value={username}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    {errors.username?.map((message, idx) => (
                                        <Alert variant="warning" key={idx}>
                                            {message}
                                        </Alert>
                                    ))}

                                    <Form.Group controlId="password1">
                                        <Form.Label className="d-none">Password</Form.Label>
                                        <Form.Control
                                            className={styles.Input}
                                            type="password"
                                            placeholder="Password"
                                            name="password1"
                                            value={password1}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    {errors.password1?.map((message, idx) => (
                                        <Alert key={idx} variant="warning">
                                            {message}
                                        </Alert>
                                    ))}

                                    <Form.Group controlId="password2">
                                        <Form.Label className="d-none">Confirm password</Form.Label>
                                        <Form.Control
                                            className={styles.Input}
                                            type="password"
                                            placeholder="Confirm password"
                                            name="password2"
                                            value={password2}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    {errors.password2?.map((message, idx) => (
                                        <Alert key={idx} variant="warning">
                                            {message}
                                        </Alert>
                                    ))}

                                    <Button
                                        type="submit"
                                    >
                                        Sign up
                                    </Button>
                                    {errors.non_field_errors?.map((message, idx) => (
                                        <Alert key={idx} variant="warning" className="mt-3">
                                            {message}
                                        </Alert>
                                    ))}
                                </Form>
                            </>}
                    </Container>
                    <Container className={`mt-3 ${appStyles.Content}`}>
                        <Link className={styles.Link} to="/login">
                            Already have an account? <span>Sign in</span>
                        </Link>
                    </Container>
                </Col>
                <Col
                    md={6}
                    className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
                >
                </Col>
            </Row>
        </PatchStyles>
    );
};

export default SignUpForm;