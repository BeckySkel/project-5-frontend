// External imports
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PatchStyles from "patch-styles";
import PropTypes from "prop-types";
// Internal imports
import styles from "../styles/Forms.module.css";
import appStyles from "../App.module.css";
import { axiosRes } from "../api/axiosDefaults";
import { useSetErrorAlert } from "../contexts/ErrorContext";

/*
Button and modal combination. Clicking button triggers a modal
asking the user to confirm deletion of the task/project
*/
function DeleteModal({ item, id }) {
  // Validate props
  DeleteModal.propTypes = {
    item: PropTypes.oneOf(["task", "project"]).isRequired,
  };

  // Variables
  const [show, setShow] = useState(false);
  const history = useHistory();
  const isProject = item === "project";
  const setErrorAlert = useSetErrorAlert();

  // Open and close modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Delete project or task
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/${item}s/${id}`);
      if (isProject) {
        history.push("/");
      } else {
        history.go(0);
      }
    } catch (err) {
      setErrorAlert({ ...err.response, variant: "danger" });
    }
    handleClose();
  };

  return (
    <PatchStyles classNames={appStyles}>
      <PatchStyles classNames={styles}>
        {/* Button to open modal */}
        <Button
          size="sm"
          variant="light"
          className="text-muted"
          onClick={handleShow}
        >
          <i className="fa-regular fa-trash-can"></i>
        </Button>

        {/* Modal with deletion confirmation */}
        <Modal
          centered
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="BgLight">
            <Modal.Title>Delete Project?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you wish to delete this {item}?
            {isProject ? <> All related tasks will also be deleted.</> : <></>}
          </Modal.Body>
          <Modal.Footer className="BgLight">
            <Button
              size="lg"
              variant="danger"
              className="Submit m-1 rounded-pill"
              onClick={handleDelete}
            >
              Delete
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
  );
}

export default DeleteModal;
