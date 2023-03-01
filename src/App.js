import PatchStyles from 'patch-styles';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Example from './components/Practice';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <PatchStyles classNames={styles}>
      <div className="App">
        <NavBar />

        <Container fluid>
          <Row>
            <Col xs="3" className="bg-light bg-gradient vh-100 text-start">
              <SideBar />
            </Col>

            <Col xs="9" className="Main">
                <Switch>
                  <Route exact path="/" render={() => <h1>Home page</h1>} />
                  <Route exact path="/login" render={() => <h1>Login</h1>} />
                  <Route exact path="/register" render={() => <h1>Register</h1>} />
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