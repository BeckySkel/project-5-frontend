// External imports
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
// Internal imports
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useSetErrorAlert } from "./ErrorContext";

/*
User context code heavily inspired by CI "Moments" walkthrough project
with addition of userLoadedContext 
*/
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
export const UserLoadedContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
export const useUserLoaded = () => useContext(UserLoadedContext);

/*
Returns the current user's data after login and refreshes access token if needed.
Also provides context after current user is fetched to prevent rerenders of
components which use the current user data.
*/
export const CurrentUserProvider = ({ children }) => {
  // Variables
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const history = useHistory();
  const setErrorAlert = useSetErrorAlert(); 

  // Sets current user data on mount
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      if (err.response.status !== 401) {
        setErrorAlert({ ...err.response, variant: "danger"});
      }
    }
    setUserLoaded(true);
  };

  useEffect(() => {
    handleMount();
  }, []);

  // Refreshes access token if expired
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <UserLoadedContext.Provider value={userLoaded}>
          {children}
        </UserLoadedContext.Provider>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
