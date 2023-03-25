import Dashboard from "./Dashboard";
import InfoCarousel from "../../components/InfoCarousel";

import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const HomePage = () => {
  const currentUser = useCurrentUser();

  return (
    <>
      {currentUser ? (
        <Dashboard />
      ) : (
        <InfoCarousel />
      )
      }
    </>
  );
};

export default HomePage;
