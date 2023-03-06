import PatchStyles from 'patch-styles';
import { Container, Row, Col } from 'react-bootstrap';
import appStyles from './App.module.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { useCurrentUser } from './contexts/CurrentUserContext';

// Main app
function App() {
  const currentUser = useCurrentUser();

  return (
        <PatchStyles classNames={appStyles}>

          <div className="App">
            {/* Navigation bar */}
            <NavBar />
            <Container fluid >
              <Row>
                {/* Menu/Sidebar with navigation links */}
                { currentUser ? <SideBar /> : null }

                {/* Main site contents */}
                <Col className="Main">
                  <Switch>
                    <Route exact path="/" render={() => <h1>Home page</h1>} />
                    <Route exact path="/login" render={() => <SignInForm />} />
                    <Route exact path="/register" render={() => <SignUpForm />} />
                    <Route exact path="/logout" render={() => <h1>Logout?</h1>} />
                    <Route exact path="/edit-profile" render={() => <h1>Edit Profile</h1>} />
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