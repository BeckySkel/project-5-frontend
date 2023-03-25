// External imports
import PatchStyles from "patch-styles";
import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap/";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";

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
  const { title, description } = projectData;
  // contributors ^

  // Submit form when trigger sent
  useEffect(() => {
    if (trigger) {
      handleSubmit();
    }
  }, [trigger]);

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
          console.log(err);
        }
      }
    };

    handleMount();
  }, [history, projectId]);

  // Form submission
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    // formData.append("contributors", contributors);

    try {
      if (projectId) {
        await axiosReq.put(`/projects/${projectId}`, formData);
        history.push(`/projects/${projectId}`);
      } else {
        const { data } = await axiosReq.post("/projects/", formData);
        history.push(`/projects/${data.id}`);
      }
      setSuccess(true);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
    setTrigger(false);
  };

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
            Reset
          </Button>

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
