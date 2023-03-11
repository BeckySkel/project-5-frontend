// External imports
import PatchStyles from 'patch-styles';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch } from "react-router-dom";
// Internal imports
import appStyles from './App.module.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { useCurrentUser } from './contexts/CurrentUserContext';
import HomePage from './pages/home/HomePage';
import SignOutForm from './pages/auth/SignOutForm';
import ProjectCreateForm from './pages/projects/ProjectCreateForm';


// Main app
function App() {
  // Variables
  const currentUser = useCurrentUser();

  return (
    <PatchStyles classNames={appStyles}>

      <div className="App BgLight">
        {/* Navigation bar */}
        <NavBar />
        <Container fluid >
          <Row>
            {/* Navigation sidebar */}
            {currentUser ? <SideBar /> : null}

            {/* Main site contents */}
            <Col className="Main pt-5">
              <Switch>
                    <Route exact path="/" render={() => < HomePage />} />
                    <Route exact path="/logout" render={() => <SignOutForm />} />
                    <Route exact path="/edit-profile" render={() => <h1>Edit Profile</h1>} />
                    <Route exact path="/login" render={() => <SignInForm />} />
                    <Route exact path="/register" render={() => <SignUpForm />} />
                    <Route exact path="/new" render={() => <ProjectCreateForm />} />
                <Route render={() => <p>404 Page not found!</p>} />
              </Switch>

            </Col>
          </Row>
        </Container>
      </div>

    </PatchStyles>
  );
}

export default App;