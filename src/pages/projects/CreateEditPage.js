// External imports
import PatchStyles from "patch-styles";
import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap/";
import PropTypes from "prop-types";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import ProjectCreateEditForm from "./ProjectCreateEditForm";


/* 
Page to host the project create/edit form
*/
function CreateEditPage() {
  // Validate props
  CreateEditPage.propTypes = {
    type: PropTypes.oneOf(["edit", "create"]).isRequired,
    item: PropTypes.oneOf(["task", "project"]).isRequired,
  };

  // Variables
  const [trigger, setTrigger] = useState(false);
  // const [success, setSuccess] = useState(false);

  return (
    <PatchStyles classNames={appStyles}>
      <PatchStyles classNames={styles}>
        <Row>
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            xl={{ span: 6, offset: 3 }}
          >
            <div className="BgGrey AuthForm">
              <h1>Start New Project</h1>
            <ProjectCreateEditForm
              trigger={trigger}
              // setSuccess={setSuccess}
              setTrigger={setTrigger}
            />

            <p className="m-2 ActionButtons">
              <Button
                type="submit"
                size="lg"
                variant="warning"
                className="Submit BgOrange m-2 rounded-pill"
                onClick={() => {
                  setTrigger(true);
                }}
              >
                Create
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
