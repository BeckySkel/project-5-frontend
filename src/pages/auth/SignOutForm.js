// External imports
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import PatchStyles from "patch-styles";
// Internal imports
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";

/* 
Form for user to sign-out
*/
function SignOutForm() {
  // Variables
  const setCurrentUser = useSetCurrentUser();
  const currentUser = useCurrentUser();

  // const [errors, setErrors] = useState({});
  const history = useHistory();

  // Redirect on mount if already logged out
  useEffect(() => {
    const handleMount = async () => {
      if (!currentUser) {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser]);
  
  // Confirm signout
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <Row>
          <Col
          >
            <h1 className="mb-4 pt-5 fs-1">Logout</h1>
            <p>Are you sure you want to signout?</p>

            <Button
              size="lg"
              variant="warning"
              className="my-3 Submit BgOrange rounded-pill"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Col>
        </Row>
      </PatchStyles>
    </PatchStyles>
  );
}

export default SignOutForm;
