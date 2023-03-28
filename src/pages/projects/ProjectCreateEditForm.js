// External imports
import PatchStyles from "patch-styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Form,
  Button,
  Alert,
  ListGroup,
  ListGroupItem,
  Col,
} from "react-bootstrap/";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import validator from "validator";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import { useSetErrorAlert } from "../../contexts/ErrorContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/* 
Form to create or edit a project
Called as edit if projectID exists, create if not
*/
function ProjectCreateEditForm({ trigger, setTrigger, setSuccess, projectId }) {
  // State variables
  const [errors, setErrors] = useState({});
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    contributors: [],
  });
  const { title, description, contributors } = projectData;
  const [contribEmails, setContribEmails] = useState([]);

  // Functional variables
  const history = useHistory();
  const setErrorAlert = useSetErrorAlert();
  const ref = useRef();
  const currentUser = useCurrentUser();

  // Fetch and return contributor email, username and id
  const fetchContribInfo = async (key) => {
    let contrib;

    if (typeof key === "number") {
      const { data } = await axiosReq.get(`/profiles/${key}`);
      contrib = data;
    } else {
      const { data } = await axiosReq.get(`/profiles/?user__email=${key}`);
      if (data.count) {
        contrib = { ...data.results[0] };
      }
    }
    return contrib;
  };

  // Mounting form; if edit, get display current data
  useEffect(() => {
    const handleMount = async () => {
      if (projectId) {
        try {
          const { data } = await axiosReq.get(`/projects/${projectId}`);
          const { title, description, is_creator, contributors } = data;

          if (is_creator) {
            setProjectData({ title, description, contributors });
            let displayContribs = [];
            for (let pk of contributors) {
              const contrib = await fetchContribInfo(pk);
              displayContribs.push(contrib);
            }
            setContribEmails(displayContribs);
          } else {
            history.push("/");
          }
        } catch (err) {
          setErrorAlert({ ...err.response, variant: "danger" });
        }
      }
    };

    handleMount();
  }, [history, projectId, setErrorAlert]);

  // Form submission
  const handleSubmit = useCallback(async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    for (let pk of contributors) {
      formData.append("contributors", pk);
    }

    try {
      if (projectId) {
        await axiosReq.put(`/projects/${projectId}`, formData);
        history.go(0);
      } else {
        const { data } = await axiosReq.post("/projects/", formData);
        history.push(`/projects/${data.id}`);
      }
      if (typeof setSuccess === "function") {
        setSuccess(true);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(err.response?.data);
        setTrigger(false);
      } else if (err.response?.status !== 401) {
        setErrorAlert({ ...err.response, variant: "danger" });
      }
    }
  }, [
    title,
    description,
    setSuccess,
    setTrigger,
    projectId,
    history,
    setErrorAlert,
    contributors,
  ]);

  // Submit form when trigger received
  useEffect(() => {
    if (trigger) {
      handleSubmit();
    }
  }, [trigger, handleSubmit]);

  // Input display values
  const handleChange = (event) => {
    setProjectData({
      ...projectData,
      [event.target.name]: event.target.value,
    });
  };

  // Remove contributor
  const handleRemove = (contrib) => {
    const index = contribEmails.indexOf(contrib);
    contribEmails.splice(index, 1);
    setContribEmails((contribEmails) => [...contribEmails]);

    const pkIndex = contributors.indexOf(contrib.id);
    contributors.splice(pkIndex, 1);
  };

  // Validate contributor email input
  const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
      throw new Error("Please enter a valid email address");
    }
    if (contribEmails.find(contrib => contrib.email === email)) {
      throw new Error("User already present in list");
    }
    if (currentUser.email === email) {
      throw new Error("Cannot add self as contributor");
     }
  };

  // Input display value
  const handleAppend = async () => {
    const emailInput = document.getElementById("contrib-email");
    const email = emailInput.value;

    try {
      validateEmail(email);
      const data = await fetchContribInfo(email);
      if (!data) {
        throw new Error("Email not registered as user");
      }
      setContribEmails((contribEmails) => [...contribEmails, data]);
      contributors.push(data.id);
      // Remove input error on successful input
      delete errors.contrib_email;
      emailInput.value = "";
      setErrors({
        ...errors,
      });
    } catch (err) {
      setErrors({
        ...errors,
        contrib_email: [err.message],
      });
    }
  };

  return (
    <PatchStyles classNames={appStyles}>
      <PatchStyles classNames={styles}>
        <Form onSubmit={handleSubmit}>
          {/* Title input */}
          <Form.Group className="text-start" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              className="Input"
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Title errors */}
          {errors?.title?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* Descripton input */}
          <Form.Group className="text-start" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className="Input"
              as="textarea"
              rows={6}
              name="description"
              value={description}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Description errors */}
          {errors?.description?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* Contributors input */}
          <Form.Group as={Col} className="text-start" controlId="contrib-email">
            <Form.Label>Add contributors</Form.Label>
            <Form.Row className="d-flex">
              <Form.Control
                className="Input"
                type="email"
                name="contrib_email"
                onChange={handleChange}
                ref={ref}
                id="contrib-email"
              />
              <Col xs="auto">
                <Button
                  onClick={handleAppend}
                  className="ms-2"
                  variant="outline-primary"
                >
                  Add
                </Button>
              </Col>
            </Form.Row>
          </Form.Group>
          {/* Contrib Email errors */}
          {errors?.contrib_email?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* Contributors display */}
          <ListGroup id="contributors" className="m-1">
            {contribEmails?.map((contrib, idx) => (
              <ListGroupItem
                variant="info"
                className="text-break d-flex justify-content-between"
                key={idx}
              >
                <span className="text-truncate me-1 flex-grow-1 fw-bold">
                  {contrib.email}
                </span>
                <span className="flex-shrink-0">{contrib.user}</span>
                <Button
                  variant="outline-info ms-2 px-1 py-0"
                  onClick={() => handleRemove(contrib)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>

          {/* Contributors errors */}
          {errors?.contributors?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* Reset form */}
          <div className="Reset">
            <Button
              type="reset"
              size="sm"
              variant="danger"
              className="rounded-pill m-1 mt-3"
              onClick={() => {
                setProjectData({
                  title: "",
                  description: "",
                  contributors: [],
                });
                setContribEmails([]);
              }}
            >
              Clear form
            </Button>
          </div>
        </Form>
      </PatchStyles>
    </PatchStyles>
  );
}

export default ProjectCreateEditForm;
