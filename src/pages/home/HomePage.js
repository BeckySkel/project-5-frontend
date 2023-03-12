import Dashboard from "./Dashboard";
import InfoCarousel from "./InfoCarousel";

import React, { useEffect, useState } from "react";
import { useCurrentUser, useLoaded } from "../../contexts/CurrentUserContext";
import Loading from "../../components/Loading";

const HomePage = () => {
  const currentUser = useCurrentUser();
  const loaded = useLoaded();
  // const loaded = false;

  return (
    <>
      {loaded && currentUser ? (
        <Dashboard />
      ) : loaded && !currentUser ? (
        <InfoCarousel />
      ) : <Loading />
      }
    </>
  );
};

export default HomePage;
