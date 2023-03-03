import PatchStyles from 'patch-styles';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';


function App() {
  return (
    <PatchStyles classNames={styles}>
      <div className="App">
        <NavBar />

        <Container fluid>
          <Row>
            {/* Menu/Sidebar with navigation links */}
            <Col xs="3" className="bg-light bg-gradient vh-100 text-start">
              <SideBar />
            </Col>

            {/* Main site contents */}
            <Col xs="9" className="Main">
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
  );
}

export default App;