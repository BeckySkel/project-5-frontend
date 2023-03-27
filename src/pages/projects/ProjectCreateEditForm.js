// External imports
import PatchStyles from "patch-styles";
import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap/";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import { useSetErrorAlert } from "../../contexts/ErrorContext";

/* 
Form to create or edit a project
Called as edit if projectID exists, create if not
*/
function ProjectCreateEditForm({ trigger, setTrigger, setSuccess, projectId }) {
  // Variables
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    // contributors: "",
  });
  const setErrorAlert = useSetErrorAlert();
  const { title, description } = projectData;
  // contributors ^

  // If edit, get existing project data
  useEffect(() => {
    const handleMount = async () => {
      if (projectId) {
        try {
          const { data } = await axiosReq.get(`/projects/${projectId}`);
          const { title, description, is_creator } = data;

          is_creator
            ? setProjectData({ title, description })
            : history.push("/");
        } catch (err) {
          setErrorAlert({ ...err.response, variant: "danger"});
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
    // formData.append("contributors", contributors);

    try {
      if (projectId) {
        await axiosReq.patch(`/projects/${projectId}`, formData);
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
      }
      if (err.response?.status === 403) {
        setErrorAlert({ ...err.response, variant: "danger"});
      }
    }
  }, [title, description, setSuccess, setTrigger, projectId, history, setErrorAlert]);

  // Submit form when trigger sent
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

  return (
    <PatchStyles classNames={appStyles}>
      <PatchStyles classNames={styles}>
        <Form onSubmit={handleSubmit}>
          {/* Title input */}
          <Form.Group className="text-start">
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
          {errors.title?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* Descripton input */}
          <Form.Group className="text-start">
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
          {errors.description?.map((message, idx) => (
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
            className="rounded-pill m-1"
            onClick={() =>
              setProjectData({
                title: "",
                description: "",
                // contributors: ""
              })
            }
          >
            Clear
          </Button>
          </div>

          {/* Non-field errors */}
          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
      </PatchStyles>
    </PatchStyles>
  );
}

export default ProjectCreateEditForm;
