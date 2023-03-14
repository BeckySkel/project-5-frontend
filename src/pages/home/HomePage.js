import Dashboard from "./Dashboard";
import InfoCarousel from "./InfoCarousel";

import React from "react";
import { useCurrentUser, useUserLoaded } from "../../contexts/CurrentUserContext";
import Loading from "../../components/Loading";

const HomePage = () => {
  const currentUser = useCurrentUser();
  const loaded = useUserLoaded();
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
