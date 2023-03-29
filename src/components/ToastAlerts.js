// External imports
import PatchStyles from "patch-styles";
import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
// Internal imports
import { useErrorAlert, useSetErrorAlert } from "../contexts/ErrorContext";
import appStyles from "../App.module.css";

/*
Dismissable alert to display errors to the user. Fades after 8 seconds
*/
function ToastAlerts() {
  // State variables
  const [show, setShow] = useState(false);

  // Functional variables
  const error = useErrorAlert();
  const setError = useSetErrorAlert();
  const message = error.data?.detail;

  // Mount on error message received
  useEffect(() => {
    const handleMount = () => {
      if (message) {
        setShow(true);
      }
    };
    handleMount();
    setTimeout(() => {
      setError({});
      setShow(false);
    }, 8000);
  }, [message, setError]);

  return (
    <PatchStyles classNames={appStyles}>
      <div
        className="fixed-bottom d-flex justify-content-center AlertContainer"
        xs={12}
        sm={{ col: 10, offset: 1 }}
        md={{ col: 8, offset: 2 }}
        lg={{ col: 6, offset: 3 }}
      >
        <Alert
          transition
          show={show}
          className="m-3 d-flex"
          variant={error.variant}
        >
          <span className="">{message}</span>
          <Button
            onClick={() => {
              setError({});
              setShow(false);
            }}
            variant={`outline-${error.variant}`}
            className="ms-3"
          >
            <i className="fa-solid fa-xmark"></i>
          </Button>
        </Alert>
      </div>
    </PatchStyles>
  );
}

export default ToastAlerts;
