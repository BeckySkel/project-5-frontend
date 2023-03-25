// External imports
import PatchStyles from "patch-styles";
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap/";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import PropTypes from "prop-types";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import ProjectCreateEditForm from "./ProjectCreateEditForm";


/* 
Page to host the project create/edit form
*/
function CreateEditPage({ type, item, id }) {
  // Validate props
  CreateEditPage.propTypes = {
    type: PropTypes.oneOf(["edit", "create"]).isRequired,
    item: PropTypes.oneOf(["task", "project"]).isRequired,
  };

  // Variables
  const [trigger, setTrigger] = useState(false);
  const [success, setSuccess] = useState(false);
  const isEdit = type === "edit";
  const isTask = item === "task";

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
  const submissionText = isEdit ? "Update" : "Submit";

  return (
    <PatchStyles classNames={appStyles}>
      <PatchStyles classNames={styles}>
        <Row>
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
            xl={{ span: 4, offset: 4 }}
          >
            <div className="BgGrey AuthForm">
              <h1>Start New Project</h1>
            <ProjectCreateEditForm
              trigger={trigger}
              setSuccess={setSuccess}
              setTrigger={setTrigger}
            />

            <p className="m-4">
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
                className="BgPurple rounded-pill border-0"
              >
                Cancel
              </Button>
            </p>
            </div>
          </Col>
        </Row>
      </PatchStyles>
    </PatchStyles>
  );
}

export default CreateEditPage;
