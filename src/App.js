// External imports
import React from "react";
import PatchStyles from "patch-styles";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
// Internal imports
import appStyles from "./App.module.css";
import NavBar from "./components/nav/NavBar";
import SideBar from "./components/nav/SideBar";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { useCurrentUser, useUserLoaded } from "./contexts/CurrentUserContext";
import SignOutForm from "./pages/auth/SignOutForm";
import ProjectPage from "./pages/projects/ProjectPage";
import HomePage from "./pages/home/HomePage";
import ConfirmEmail from "./pages/auth/ConfirmEmail";
import Loading from "./components/Loading";
import CreateEditPage from "./pages/projects/CreateEditPage";
import PageNotFound from "./pages/home/PageNotFound";
import ToastAlerts from "./components/ToastAlerts";

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

        <Container fluid className="">
          <Row>
            <Col className="d-flex flex-row justify-content-between px-0">
              {/* Navigation sidebar */}
              {loaded && currentUser ? <SideBar /> : null}
              

              {/* Main site contents */}
              <div className={`Main`}>
                {!loaded ? (
                  <Loading />
                ) : (
                  <Switch>
                    <Route exact path="/" render={() => <HomePage />} />

                    <Route
                      exact
                      path="/logout"
                      render={() => <SignOutForm />}
                    />
                    <Route
                      exact
                      path="/edit-profile"
                      render={() => <h1>Edit Profile</h1>}
                    />
                    <Route exact path="/login" render={() => <SignInForm />} />
                    <Route
                      exact
                      path="/register"
                      render={() => <SignUpForm />}
                    />
                    <Route
                      exact
                      path="/new"
                      render={() => <CreateEditPage />}
                    />
                    <Route
                      exact
                      path="/projects/:id"
                      render={() => <ProjectPage />}
                    />
                    <Route
                      exact
                      path="/register/:key"
                      render={() => <ConfirmEmail />}
                    />
                    <Route render={() => <PageNotFound />} />
                  </Switch>
                )}
                <ToastAlerts />
              </div>
              
            </Col>
          </Row>
        </Container>
      </div>
    </PatchStyles>
  );
}

export default App;
