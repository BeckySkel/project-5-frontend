// External imports
import React from "react";
import { Container, Spinner } from "react-bootstrap";

/*
Displays a spinner while other components are loading
*/
function Loading() {
  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <Spinner animation="grow" role="status" variant="secondary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
}

export default Loading;
