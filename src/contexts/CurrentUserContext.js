// Code heavily inspired by CI "Moments" walkthrough project
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [errors, setErrors] = useState({});
    console.log(errors);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axios.get('dj-rest-auth/user/');
                setCurrentUser(data);
            } catch (err) {
                setErrors(err.response?.data);
            }
        };
        handleMount();
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
};