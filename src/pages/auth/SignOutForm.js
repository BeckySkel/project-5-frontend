// External imports
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import PatchStyles from 'patch-styles';
// Internal imports
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/AuthForms.module.css';
import appStyles from '../../App.module.css';


/* 
Form for user to sign-out
*/
function SignOutForm() {
    // Variables
    const setCurrentUser = useSetCurrentUser();

    // const [errors, setErrors] = useState({});
    const history = useHistory();

    // Form submission
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
                        xs={{ span: 10, offset: 1 }}
                        md={{ span: 6, offset: 3 }}
                        xl={{ span: 4, offset: 4 }}
                    >
                        <h1 className="mb-4 pt-md-5 fs-1">Logout</h1>

                            <Button
                                size="lg"
                                variant="warning"
                                className="my-3 Submit BgOrange text-white"
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