import PatchStyles from "patch-styles";
import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { useErrorAlert, useSetErrorAlert } from "../contexts/ErrorContext";
import appStyles from "../App.module.css";

function ToastAlerts() {
  const [show, setShow] = useState(false);
  const error = useErrorAlert();
  const setError = useSetErrorAlert();
  const message = error.data?.detail;

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
          // dismissible
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
