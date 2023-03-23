// External imports
import PatchStyles from "patch-styles";
import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap/";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
// Internal imports
import styles from "../../styles/AuthForms.module.css";
import appStyles from "../../App.module.css";

/* 
Form to create a new task
*/
function TaskEditForm({ trigger, setTrigger, setSuccess, taskId }) {
  // Variables
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id } = useParams();

  const [taskData, setTaskData] = useState({
    project: id,
    summary: "",
    body: "",
  });
  const { summary, body } = taskData;

  useEffect(() => {
    if (trigger) {
    handleSubmit();
    }
  }, [trigger]);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/${taskId}`);
        const { summary, body } = data;
        setTaskData({ summary, body })
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  // Form submission
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("summary", summary);
    formData.append("body", body);
    formData.append("project", id);

    try {
      await axiosReq.put(`/tasks/${taskId}`, formData);
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
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <PatchStyles classNames={appStyles}>
      <PatchStyles classNames={styles}>
        
            <Form onSubmit={handleSubmit} className="BgGrey">
              {/* Summary input */}
              <Form.Group className="text-start">
                <Form.Label>Summary</Form.Label>

                <Form.Control
                  className="Input"
                  type="text"
                  name="summary"
                  value={summary}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* Summary errors */}
              {errors.summary?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              {/* Body input */}
              <Form.Group className="text-start">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  className="Input"
                  type="textarea"
                  rows={6}
                  name="body"
                  value={body}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              {/* Body errors */}
              {errors.body?.map((message, idx) => (
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
                Complete
              </Button>
              <Button
                type="reset"
                size="sm"
                variant="danger"
                className="rounded-pill m-1"
                onClick={() =>
                  setTaskData({
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
      </PatchStyles>
    </PatchStyles>
  );
}

export default TaskEditForm;
