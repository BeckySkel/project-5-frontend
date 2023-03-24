// External imports
import PatchStyles from "patch-styles";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// Internal imports
import styles from "../styles/AuthForms.module.css";
import appStyles from "../App.module.css";
import TaskCreateEditForm from "../pages/projects/TaskCreateEditForm";

/*
Button and modal combination. Props for type (edit or create) and item
(task or project) determine iinner form-type and text
*/
function CreateEditModal({ type, taskId }) {
  // Variables
  const [show, setShow] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [success, setSuccess] = useState(false);
  const isEdit = type === "edit";

  // Open and close modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Close modal on success
  useEffect(() => {
    const handleSuccess = () => {
      if (success) {
        handleClose();
      }
    };

    handleSuccess();
  }, [success]);

  // Edit or Create text
  const buttonText = isEdit ? (
    <i className="fa-regular fa-pen-to-square"></i>
  ) : (
    <>
      New <i className="fa-solid fa-plus"></i>
    </>
  );
  const headerText = isEdit ? "Edit Task" : "Add Task";
  const form = isEdit ? (
    <TaskCreateEditForm
      taskId={taskId}
      trigger={trigger}
      setSuccess={setSuccess}
      setTrigger={setTrigger}
    />
  ) : (
    <TaskCreateEditForm
      trigger={trigger}
      setSuccess={setSuccess}
      setTrigger={setTrigger}
    />
  );
  const submissionText = isEdit ? "Update" : "Submit";

  return (
    <>
      <PatchStyles classNames={styles}>
        <PatchStyles classNames={appStyles}>
          {/* Button to open modal (edit or create) */}
          <Button
            size="sm"
            variant="light"
            className="text-muted"
            onClick={handleShow}
          >
            {buttonText}
          </Button>

          {/* Modal containing either an edit or create form */}
          <Modal
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{headerText}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="BgGrey">{form}</Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                size="lg"
                variant="warning"
                className="Submit BgOrange m-1 rounded-pill"
                onClick={() => {
                  setTrigger(true);
                }}
              >
                {submissionText}
              </Button>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="BgPurple rounded-pill border-0"
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </PatchStyles>
      </PatchStyles>
    </>
  );
}

export default CreateEditModal;
