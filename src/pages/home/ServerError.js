import PatchStyles from "patch-styles";
import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import appStyles from "../../App.module.css";
import styles from "../../styles/Error.module.css";

function ServerError() {
  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <Row className="ErrorPage BgGrey rounded">
          <h1 className="Code">500</h1>
          <h2>Server error</h2>
          <p className="Message rounded">
            An unexpected error has occurred
            <br/>
            <br/>
            <Link
              to="/"
              className="AuthLink BgPurple rounded-pill text-nowrap"
            >
              Return to site
              </Link>
          </p>
        </Row>
      </PatchStyles>
    </PatchStyles>
  )
}

export default ServerError