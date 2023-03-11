// External imports
import PatchStyles from "patch-styles";
import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap/";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
// Internal imports
import appStyles from "../../App.module.css";

/* */
function ProjectCreateForm() {
  // Variables
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    contributors: "",
  });
  const { title, description, contributors } = projectData;

  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    try {
      const { data } = await axiosReq.post("/projects/", formData);
      history.push(`/projects/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // Input display values
  const handleChange = (event) => {
    setProjectData({
      ...projectData,
      [event.target.name]: event.target.value,
    });
  };

  const textFields = (
    <div className="text-center">
      {/* Title input */}
      <Form.Group>
        <Form.Label>Title</Form.Label>

        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>
      {/* Title errors */}
      {errors.title?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}

      {/* Descripton input */}
      <Form.Group>
        <Form.Label>Description</Form.Label>

        <Form.Control
          type="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>
      {/* Description errors */}
      {errors.description?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}

      <Button onClick={() => history.goBack()}>cancel</Button>
      <Button type="submit">create</Button>
    </div>
  );

  return (
    <PatchStyles classNames="appStyles">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="d-flex flex-column justify-content-center">
            <div>{textFields}</div>
          </Col>
        </Row>
      </Form>
    </PatchStyles>
  );
}

export default ProjectCreateForm;
