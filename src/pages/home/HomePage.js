import Dashboard from "./Dashboard";
import InfoCarousel from "./InfoCarousel";

import React, { useEffect, useState } from 'react'
import { useCurrentUser, useLoaded } from "../../contexts/CurrentUserContext";

const HomePage = () => {
    const currentUser = useCurrentUser();
    // const [loaded, setLoaded] = useState(false);
    const loaded = useLoaded();

    // useEffect(() => {
    //     console.log()
    //     if (currentUser) {
    //     setLoaded(true);
    //     }
    //   }, [currentUser]);
    
    return (
    <>
    {console.log(currentUser)}
    {/* {loaded && !currentUser ?  : null} */}
    {loaded && currentUser ? <Dashboard /> : loaded && !currentUser ? <InfoCarousel /> : null}
    </>
  )
}

export default HomePage


