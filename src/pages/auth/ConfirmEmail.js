// External imports
import PatchStyles from "patch-styles";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";
import { useSetErrorAlert } from "../../contexts/ErrorContext";
import ServerError from "../home/ServerError";
import Loading from "../../components/Loading";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

/*
New users redirected here to confirm email address, validates email on get
*/
function ConfirmEmail() {
  // State variables
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Functional variables
  const { key } = useParams();
  const setErrorAlert = useSetErrorAlert();
  const currentUser = useCurrentUser();
  const history = useHistory();

  // Validate email on get
  useEffect(() => {
    const handleMount = async () => {
      try {
        await axiosRes.get(
          `/dj-rest-auth/registration/account-confirm-email/${key}/`
        );
        setSuccess(true);
      } catch (err) {
        if (err.reponse.status !== 500) {
          setErrorAlert({
            data: { detail: err.response.statusText },
            variant: "danger",
          });
        }
      }
      setLoaded(true);
    };

    handleMount();
  }, [key, setErrorAlert, setSuccess, setLoaded, currentUser, history]);

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        {loaded ? (
          <>
            <h1 className="mt-5">Email confirmed!</h1>

            <p className="mt-5">Please log in to complete sign-up</p>

            <Link
              to="/login"
              className="py-1 px-2 BgPurple rounded-pill text-white m-1 text-nowrap"
            >
              Sign in
            </Link>
          </>
        ) : (
          <Loading />
        )}
      </PatchStyles>
    </PatchStyles>
  );
}

export default ConfirmEmail;
