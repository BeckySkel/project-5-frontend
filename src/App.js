import PatchStyles from 'patch-styles';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMount = async () => {
    try {
      const data = await axios.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (err) {
      
    }
  }

  const handleChange = (event) => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    handleMount();
    handleChange();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <PatchStyles classNames={styles}>
          <div className="App">
            <NavBar />

            <Container fluid>
              <Row>
                {/* Menu/Sidebar with navigation links */}
                <Button className="position-absolute m-2 bg-navy MenuButton" onClick={handleChange}><i class="fa-solid fa-bars"></i></Button>
                <Col xs={menuOpen ? 2 : 0} className={`bg-navy text-start ${menuOpen ? "d-block" : "d-none"}`}>
                  <SideBar />
                </Col>

                {/* Main site contents */}
                <Col xs={menuOpen ? 10 : 12} className="Main">
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