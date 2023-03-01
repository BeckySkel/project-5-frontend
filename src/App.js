import { Container, Row, Col } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container fluid className="Content">
        <Row>
          <Col xs="3" className="bg-light bg-gradient vh-100 text-start">
            <SideBar />
          </Col>

          <Col xs="9">
            <div>
              Placeholder Contents
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;