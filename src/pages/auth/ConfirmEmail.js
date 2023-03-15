import PatchStyles from "patch-styles";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";

function ConfirmEmail() {
  const { key } = useParams();
  const [errors, setErrors] = useState({});

  const handleMount = async () => {
    try {
      await axiosReq.post(
        `/dj-rest-auth/registration/account-confirm-email/${key}/`
      );
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <div>Email confirmed</div>

        <p>Please log in</p>
        {/* Username errors */}
        {errors.message?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Link
          to="/login"
          className="py-1 px-2 BgPurple rounded-pill text-white m-1 text-nowrap"
        >
          Sign in
        </Link>
        </PatchStyles>
    </PatchStyles>
  );
}

export default ConfirmEmail;
