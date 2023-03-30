import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
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
        setProfile({...data});
        setLoaded(true);
      };
  
    fetchUserProfile();
  }, []);


  const popover = loaded ? (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{profile.user} {profile.full_name}</Popover.Title>
      <Popover.Content>
        {profile.bio}
        Member since: {profile.created_on}
      </Popover.Content>
    </Popover>
  ) : (<></>);

  return loaded ? (
    <OverlayTrigger
      placement="bottom"
      overlay={popover}
    >
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
  )
}

export default Avatar;
