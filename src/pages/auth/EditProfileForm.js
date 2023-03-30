// External imports
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import PatchStyles from "patch-styles";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Loading from "../../components/Loading";
import { axiosReq } from "../../api/axiosDefaults";
import { useSetErrorAlert } from "../../contexts/ErrorContext";

/* 
Form for user to sign-up and create new account in order to access the site's contents.
Heavily inspired by CI "Moments" walkthrough project
*/
const EditProfileForm = () => {
  // Variables
  const currentUser = useCurrentUser();
  const profile_id = currentUser.profile_id;
  const [editProfileData, setEditProfileData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
  });
  const { first_name, last_name, bio } = editProfileData;
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const setErrorAlert = useSetErrorAlert();

  // Redirect on mount if not logged in
  useEffect(() => {
    const handleMount = async () => {
      if (!currentUser) {
        history.push("/login");
      }
      try {
        const { data } = await axiosReq.get(`/profiles/${profile_id}`);
        const { first_name, last_name, bio } = data;
        setEditProfileData({ first_name, last_name, bio });
      } catch (err) {
        setErrorAlert({ ...err.response, variant: "danger" });
      }
    };

    handleMount();
  }, [currentUser, history]);

  // Input display values
  const handleChange = (event) => {
    setEditProfileData({
      ...editProfileData,
      [event.target.name]: event.target.value,
    });
  };

  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("bio", bio);

    try {
      await axiosReq.put(`/profiles/${profile_id}`, formData);
      history.push("/")
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <Row>
          <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit} className="BgGrey AuthForm">
              <h1>Edit Your Profile</h1>
              <h2 className="fs-4 pb-4">
                Help others identify you by providing some extra info below!
              </h2>

              {/* First name input */}
              <Form.Group controlId="first_name" className="text-start">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="Input"
                  type="text"
                  placeholder="Enter First Name"
                  name="first_name"
                  value={first_name}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* First name errors */}
              {errors.first_name?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              {/* Last name input */}
              <Form.Group controlId="last_name" className="text-start">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="Input"
                  type="text"
                  placeholder="Enter Last Name"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Last name errors */}
              {errors.last_name?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              {/* Bio input */}
              <Form.Group controlId="bio" className="text-start">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  className="Input"
                  as="textarea"
                  row={6}
                  placeholder="Write something about yourself!"
                  name="bio"
                  value={bio}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Bio errors */}
              {errors.bio?.map((message, idx) => (
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
                {loading ? <Loading /> : "Update"}
              </Button>
              {/* Non-field errors */}
              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>
          </Col>
        </Row>
      </PatchStyles>
    </PatchStyles>
  );
};

export default EditProfileForm;
