import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import Loading from "./Loading";

function Avatar(props) {
  // Variables
  const [profile, setProfile] = useState();
  const [loaded, setLoaded] = useState(false);

  // Get profile instance on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data } = await axiosReq.get(
        `/profiles/${props.user.user_profile_id}`
      );
      setProfile({ ...data });
      setLoaded(true);
    };

    fetchUserProfile();
  }, [props.user.user_profile_id]);

  const popover = loaded ? (
    <Popover id="popover-basic">
      <Popover.Title as="h3" className="d-flex justify-content-between">
        <span className="text-truncate">{profile.user}</span>{" "}
        <span className="ms-2">{profile.full_name}</span>
      </Popover.Title>
      <Popover.Content>
        <span className="fs-6">{profile.bio}</span>
        <p>
        Member since: {profile.created_on}
        </p>
      </Popover.Content>
    </Popover>
  ) : (
    <></>
  );

  return loaded ? (
    <OverlayTrigger placement="bottom" overlay={popover}>
      {({ ref, ...triggerHandler }) => (
        <Button
          variant="light"
          {...triggerHandler}
          className="d-inline-flex align-items-center py-0"
        >
          <div ref={ref} src="holder.js/20x20?text=J&bg=28a745&fg=FFF"></div>
          <span className="ml-1">{profile.user}</span>
        </Button>
      )}
    </OverlayTrigger>
  ) : (
    <Loading />
  );
}

export default Avatar;
