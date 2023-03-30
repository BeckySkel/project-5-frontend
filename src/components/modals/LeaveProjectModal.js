// External imports
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PatchStyles from "patch-styles";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useSetErrorAlert } from "../../contexts/ErrorContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/*
Button and modal combination. Clicking button triggers a modal
asking the user to confirm that they'd like to leave the project
*/
function LeaveProjectModal({ id }) {
  // Variables
  const currentUser = useCurrentUser();
  const [show, setShow] = useState(false);
  const history = useHistory();
  const setErrorAlert = useSetErrorAlert();

  // Open and close modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Delete project or task
  const handleDelete = async () => {
    try {
      const { data } = await axiosRes.get("/contributors/", {
        project: id,
        user: currentUser.id,
      });
      await axiosReq.delete(`/contributors/${data.results[0].id}`);

      history.push("/");
    } catch (err) {
      setErrorAlert({ ...err.response, variant: "danger" });
    }
    handleClose();
  };

  return (
    <PatchStyles classNames={appStyles}>
      <PatchStyles classNames={styles}>
        {/* Button to open modal */}
        <Button className="ms-3" onClick={handleShow}>Leave project?</Button>

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
            Are you sure you wish to leave this project?
            You will not be able to access the content any more but
            any contributions you've made will remain
          </Modal.Body>
          <Modal.Footer className="BgLight">
            <Button
              size="lg"
              variant="danger"
              className="Submit m-1 rounded-pill"
              onClick={handleDelete}
            >
              Leave
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

export default LeaveProjectModal;
