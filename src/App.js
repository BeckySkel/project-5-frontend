import PatchStyles from 'patch-styles';
import { Container, Row, Col } from 'react-bootstrap';
import appStyles from './App.module.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Context
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Main app
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState({});
  console.log(errors);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const data = await axios.get('dj-rest-auth/user/');
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
        <PatchStyles classNames={appStyles}>
          <div className="App">
            {/* Navigation bar */}
            <NavBar />
            <Container fluid>
              <Row>
                {/* Menu/Sidebar with navigation links */}
                <SideBar userName={currentUser} />

                {/* Main site contents */}
                <Col className="Main">
                  <Switch>
                    <Route exact path="/" render={() => <h1>Home page</h1>} />
                    <Route exact path="/login" render={() => <SignInForm />} />
                    <Route exact path="/register" render={() => <SignUpForm />} />
                    <Route render={() => <p>Page not found!</p>} />
                  </Switch>
                </Col>
              </Row>
            </Container>
          </div>
        </PatchStyles>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;