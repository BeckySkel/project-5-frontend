// External imports
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import PatchStyles from "patch-styles";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Loading from "../../components/Loading";

/* 
Form for user to sign-up and create new account in order to access the site's contents.
Heavily inspired by CI "Moments" walkthrough project
*/
const SignUpForm = () => {
  // Variables
  const currentUser = useCurrentUser();
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const { username, email, password1, password2 } = signUpData;
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // Redirect on mount if already logged in
  useEffect(() => {
    const handleMount = async () => {
      if (currentUser) {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history]);

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
      await axios.post("/dj-rest-auth/registration/", signUpData);
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
            {submissionSuccess ? (
              <>
                <h1 className="fs-1">Your account needs verifying</h1>
                <p>
                  A confirmation has been sent to {email}, please follow the
                  instructions to verify your account
                </p>
              </>
            ) : (
              <>
                <Form onSubmit={handleSubmit} className="BgGrey AuthForm">
                  <h1>Register</h1>
                  {/* Username input */}
                  <Form.Group controlId="username" className="text-start">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      className="Input"
                      type="text"
                      placeholder="Enter Username"
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

                  {/* Email input */}
                  <Form.Group controlId="email" className="text-start">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className="Input"
                      type="text"
                      placeholder="Enter Email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {/* Email errors */}
                  {errors.email?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                      {message}
                    </Alert>
                  ))}

                  {/* Password input */}
                  <Form.Group controlId="password1" className="text-start">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="Input"
                      type="password"
                      placeholder="Enter Password"
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
                  <Form.Group controlId="password2" className="text-start">
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
                    className="Submit BgOrange rounded-pill"
                    onClick={() => {
                      setLoading(true);
                    }}
                  >
                    {loading ? <Loading /> : "Sign up"}
                  </Button>
                  {/* Non-field errors */}
                  {errors.non_field_errors?.map((message, idx) => (
                    <Alert key={idx} variant="warning" className="mt-3">
                      {message}
                    </Alert>
                  ))}
                </Form>
              </>
            )}

            {/* Link to account login */}
            <p className="m-4">
              Already have an account?
              <Link
                to="/login"
                className="AuthLink BgPurple rounded-pill text-nowrap"
              >
                Sign in
              </Link>
            </p>
          </Col>
        </Row>
      </PatchStyles>
    </PatchStyles>
  );
};

export default SignUpForm;
