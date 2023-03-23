// External imports
import React from "react";
import PatchStyles from "patch-styles";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
// Internal imports
import appStyles from "./App.module.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { useCurrentUser, useUserLoaded } from "./contexts/CurrentUserContext";
import SignOutForm from "./pages/auth/SignOutForm";
import ProjectCreateForm from "./pages/projects/ProjectCreateForm";
import ProjectPage from "./pages/projects/ProjectPage";
import HomePage from "./pages/home/HomePage";
import ConfirmEmail from "./pages/auth/ConfirmEmail";
import ProjectEditForm from "./pages/projects/ProjectEditForm";

// Main app
function App() {
  // Variables
  const currentUser = useCurrentUser();
  const loaded = useUserLoaded();

  return (
    <PatchStyles classNames={appStyles}>
      <div className="App BgLight">
        {/* Navigation bar */}
        <NavBar />
        <Container fluid>
          <Row>
            <Col className="d-flex flex-row justify-content-between px-0">
              {/* Navigation sidebar */}
              {loaded && currentUser ? <SideBar /> : null}
              {/* Main site contents */}

              <div className={`Main pt-5`}>
                <Switch>
                  <Route exact path="/" render={() => <HomePage />} />

                  <Route exact path="/logout" render={() => <SignOutForm />} />
                  <Route
                    exact
                    path="/edit-profile"
                    render={() => <h1>Edit Profile</h1>}
                  />
                  <Route exact path="/login" render={() => <SignInForm />} />
                  <Route exact path="/register" render={() => <SignUpForm />} />
                  <Route
                    exact
                    path="/new"
                    render={() => <ProjectCreateForm />}
                  />
                  <Route
                    exact
                    path="/projects/:id"
                    render={() => <ProjectPage />}
                  />
                  <Route
                    exact
                    path="/projects/:id/edit"
                    render={() => <ProjectEditForm />}
                  />
                  <Route exact path="/register/:key" render={() => <ConfirmEmail />} />
                  <Route render={() => <p>404 Page not found!</p>} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </PatchStyles>
  );
}

export default App;
