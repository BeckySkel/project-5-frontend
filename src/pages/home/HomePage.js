// External imports
import React from "react";
import PatchStyles from 'patch-styles';
// Internal imports
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/SignInUpForm.module.css';
import appStyles from '../../App.module.css';
import InfoCarousel from "../../components/InfoCarousel";


// Homepage
function HomePage() {
    const currentUser = useCurrentUser();

    return (
        <PatchStyles classNames={styles}>
            <PatchStyles classNames={appStyles}>
            
                {currentUser ? <h1>Dashboard</h1> : <InfoCarousel />}
        

        </PatchStyles>
    </PatchStyles>
  )
}

export default HomePage