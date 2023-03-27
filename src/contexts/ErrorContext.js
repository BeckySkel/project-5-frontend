// External imports
import { createContext, useContext, useState } from "react";
// Internal imports

/*
User context code heavily inspired by CI "Moments" walkthrough project
with addition of userLoadedContext 
*/
export const SetErrorAlertContext = createContext();
export const useSetErrorAlert = () => useContext(SetErrorAlertContext);

export const ErrorAlertContext = createContext();
export const useErrorAlert = () => useContext(ErrorAlertContext);

/*
Returns the current user's data after login and refreshes access token if needed.
Also provides context after current user is fetched to prevent rerenders of
components which use the current user data.
*/
export const SetErrorAlertProvider = ({ children }) => {
  // Variables
  const [errorAlert, setErrorAlert] = useState({});

  return (
    <SetErrorAlertContext.Provider value={setErrorAlert}>
      <ErrorAlertContext.Provider value={errorAlert}>
        {children}
      </ErrorAlertContext.Provider>
    </SetErrorAlertContext.Provider>
  );
};
