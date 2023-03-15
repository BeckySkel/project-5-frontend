// External imports
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Alert, Button, Col, Row } from "react-bootstrap";
import PatchStyles from "patch-styles";
// Internal imports
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";

/* 
Form for user to sign-in to existing account in order to access the site's contents.
Heavily inspired by CI "Moments" walkthrough project
*/
function SignInForm() {
  // Variables
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
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
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
            xl={{ span: 4, offset: 4 }}
          >
            <Form onSubmit={handleSubmit} className="AuthForm BgGrey">
              <h1 className="">Login</h1>
              {/* Username input */}
              <Form.Group controlId="username" className="text-start">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
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
              <Form.Group controlId="password" className="text-start">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
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
                className="Submit BgOrange rounded-pill"
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
            <p className="m-4">
              Don't have an account?
              <Link
                to="/register"
                className="AuthLink BgPurple rounded-pill text-nowrap"
              >
                Sign up now!
              </Link>
            </p>
          </Col>
        </Row>
      </PatchStyles>
    </PatchStyles>
  );
}

export default SignInForm;
