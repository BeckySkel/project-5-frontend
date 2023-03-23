import PatchStyles from "patch-styles";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// Internal imports
import styles from "../styles/AuthForms.module.css";
import appStyles from "../App.module.css";
import TaskCreateForm from "../pages/projects/TaskCreateForm";
import TaskEditForm from "../pages/projects/TaskEditForm";

function CreateModal({ type, taskId }) {
  const [show, setShow] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const handleSuccess = () => {
      if (success) {
        handleClose();
      }
    };

    handleSuccess();
  }, [success])
  

  return (
    <>
      <PatchStyles classNames={styles}>
        <PatchStyles classNames={appStyles}>
          <Button
            size="sm"
            variant="light"
            className="text-muted"
            onClick={handleShow}
          >
            new
          </Button>

          <Modal
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body className="BgGrey">
              {type === "edit" ? (<TaskEditForm taskId={taskId} trigger={trigger} setSuccess={setSuccess} setTrigger={setTrigger} />) : (<TaskCreateForm trigger={trigger} setSuccess={setSuccess} setTrigger={setTrigger} />)}
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
            variant="primary"
            onClick={() => {
              setTrigger(true);
            }}
          >
            Submit
          </Button>
            </Modal.Footer>
          </Modal>
        </PatchStyles>
      </PatchStyles>
    </>
  );
}

export default CreateModal;
