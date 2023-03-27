import PatchStyles from "patch-styles";
import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import appStyles from "../../App.module.css";
import styles from "../../styles/Error.module.css";

function PageNotFound() {
  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <Row className="ErrorPage BgGrey rounded">
          <h1 className="Code">404</h1>
          <h2>Nothing to see here!</h2>
          <p className="Message rounded">
            This content is unavailable.
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
  );
}

export default PageNotFound;
