import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../api/axiosDefaults";

function DeleteModal(props) {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Delete project
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/${props.type}s/${props.id}`);
      if (props.type === "project") {
      history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="light"
        className="text-muted"
        onClick={handleShow}
      >
        <i className="fa-regular fa-trash-can"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Project?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you wish to delete this project? All related tasks will also be deleted.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
