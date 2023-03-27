import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useErrorAlert, useSetErrorAlert } from "../contexts/ErrorContext";

function ToastAlerts() {
  const [show, setShow] = useState(false);
  const error = useErrorAlert();
  const setError = useSetErrorAlert();
  console.log(error);
  const message = error.data?.detail;

  useEffect(() => {
    const handleMount = () => {
      if (message) {
        setShow(true);
      }
    };

    handleMount();
  }, [message]);

  return (
    <div className="fixed-bottom d-flex justify-content-center">
      <Alert
        dismissible
        transition
        show={show}
        onClose={() => {
          setError({});
          setShow(false);
        }}
        className="flex-grow-1 m-2"
        variant={error.variant}
      >
        {message}
      </Alert>
    </div>
  );
}

export default ToastAlerts;
