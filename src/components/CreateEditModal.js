// External imports
import PatchStyles from "patch-styles";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
// Internal imports
import styles from "../styles/Forms.module.css";
import appStyles from "../App.module.css";
import TaskCreateEditForm from "../pages/projects/TaskCreateEditForm";
import ProjectEditForm from "../pages/projects/ProjectCreateEditForm";

/*
Button and modal combination. Props for type (edit or create) and item
(task or project) determine inner form-type and text
*/
function CreateEditModal({ type, item, id }) {
  // Validate props
  CreateEditModal.propTypes = {
    type: PropTypes.oneOf(["edit", "create"]).isRequired,
    item: PropTypes.oneOf(["task", "project"]).isRequired,
  };

  // Variables
  const [show, setShow] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [success, setSuccess] = useState(false);
  const isEdit = type === "edit";
  const isTask = item === "task";

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

  // Dynamic elements
  const headerType = isEdit ? "Edit" : "Add";
  const headerItem = isTask ? "Task" : "Project";
  const buttonText = isEdit ? (
    <i className="fa-regular fa-pen-to-square"></i>
  ) : (
    <>
      New {headerItem} <i className="fa-solid fa-plus"></i>
    </>
  );
  const form = isTask ? (
    <TaskCreateEditForm
      taskId={id}
      trigger={trigger}
      setSuccess={setSuccess}
      setTrigger={setTrigger}
    />
  ) : (
    <ProjectEditForm
      projectId={id}
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
            className="text-muted m-1"
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
            <Modal.Header closeButton className="BgLight">
              <Modal.Title>
                {headerType} {headerItem}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="BgGrey">{form}</Modal.Body>
            <Modal.Footer className="BgLight">
              <Button
                type="submit"
                size="lg"
                variant="warning"
                className="Submit BgOrange m-2 rounded-pill"
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
