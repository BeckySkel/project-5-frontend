// External imports
import PatchStyles from "patch-styles";
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap/";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
// Internal imports
import styles from "../../styles/AuthForms.module.css";
import appStyles from "../../App.module.css";

/* 
Form to create a new project
*/
function ProjectEditForm() {
  // Variables
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
  });
  const { title, description } = projectData;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/projects/${id}`);
        const { title, description, is_creator } = data;

        is_creator ? setProjectData({ title, description }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);



  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    try {
      await axiosReq.put(`/projects/${id}`, formData);
      history.push(`/projects/${id}`);
    } catch (err) {
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

  return (
    <PatchStyles classNames={appStyles}>
      <PatchStyles classNames={styles}>
        <Row>
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
            xl={{ span: 4, offset: 4 }}
          >
            <Form onSubmit={handleSubmit} className="BgGrey AuthForm">
              <h1>New Project</h1>
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

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                variant="warning"
                className="Submit BgOrange m-1 rounded-pill"
              >
                Save
              </Button>
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
            <p className="m-4">
              <Button
              variant="secondary"
                onClick={history.goBack}
                className="BgPurple rounded-pill border-0"
              >
                Cancel
              </Button>
            </p>
          </Col>
        </Row>
      </PatchStyles>
    </PatchStyles>
  );
}

export default ProjectEditForm;
