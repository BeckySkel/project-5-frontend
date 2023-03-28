// External imports
import PatchStyles from "patch-styles";
import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap/";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import { useSetErrorAlert } from "../../contexts/ErrorContext";

/* 
Form to create or edit a task
Called as edit if taskID exists, create if not
*/
function TaskCreateEditForm({ trigger, setTrigger, setSuccess, taskId }) {
  // Variables
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [taskData, setTaskData] = useState({
    project: id,
    completed: "",
    summary: "",
    body: "",
  });
  const { summary, body, completed } = taskData;
  const setErrorAlert = useSetErrorAlert();

  // If edit, get existing task data
  useEffect(() => {
    const handleMount = async () => {
      if (taskId) {
        try {
          const { data } = await axiosReq.get(`/tasks/${taskId}`);
          const { summary, body, completed } = data;
          setTaskData({ summary, body, completed });
        } catch (err) {
          setErrorAlert({ ...err.response, variant: "danger" });
        }
      }
    };

    handleMount();
  }, [history, taskId, setErrorAlert]);

  // Form submission
  const handleSubmit = useCallback(async () => {
    const formData = new FormData();

    formData.append("completed", completed);
    console.log(completed);
    formData.append("summary", summary);
    console.log(summary);
    formData.append("body", body);
    formData.append("project", id);
    console.log(formData);
    try {
      if (taskId) {
        await axiosReq.put(`/tasks/${taskId}`, formData);
      } else {
        await axiosReq.post("/tasks/", formData);
      }
      setSuccess(true);
      history.go(0);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
    setTrigger(false);
  }, [summary, body, completed, id, setSuccess, setTrigger, taskId, history]);

  // Submit form when trigger sent
  useEffect(() => {
    if (trigger) {
      handleSubmit();
    }
  }, [trigger, handleSubmit]);

  // Input display values
  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <PatchStyles classNames={appStyles}>
      <PatchStyles classNames={styles}>
        <Form>
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
              as="textarea"
              rows={6}
              name="body"
              value={body}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Body errors */}
          {errors.body?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* Completed input */}
          <Form.Group className="text-start FloatRight d-flex">
            <Form.Label>Complete?</Form.Label>
            <Form.Check
              type="checkbox"
              name="completed"
              checked={completed}
              onChange={handleClick}
              className="ms-2"
            />
          </Form.Group>

          {/* Completed errors */}
          {errors.completed?.map((message, idx) => (
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
              setTaskData({
                summary: "",
                body: "",
              })
            }
          >
            Clear
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

export default TaskCreateEditForm;
