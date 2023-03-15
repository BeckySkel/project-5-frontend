// External imports
import PatchStyles from "patch-styles";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
// Internal imports
import styles from "../../styles/Forms.module.css";
import appStyles from "../../App.module.css";

/*

*/
function ConfirmEmail() {
  const { key } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const {data} = await axiosReq.get(
          `/dj-rest-auth/registration/account-confirm-email/${key}/`
        );
        console.log(data.messages);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, []);

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <div>Email confirmed</div>

        <p>Please log in</p>

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
