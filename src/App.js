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
import Carousel from './components/InfoCarousel';


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
            <Col className="Main">
              <Switch>
                {currentUser ?
                  <>
                    <Route exact path="/" render={() => <h2>Dashboard</h2>} />
                    <Route exact path="/logout" render={() => <h1>Logout?</h1>} />
                    <Route exact path="/edit-profile" render={() => <h1>Edit Profile</h1>} />
                  </>
                  :
                  <>
                    <Route exact path="/" render={() => <Carousel />} />
                    <Route exact path="/login" render={() => <SignInForm />} />
                    <Route exact path="/register" render={() => <SignUpForm />} />
                  </>
                }
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