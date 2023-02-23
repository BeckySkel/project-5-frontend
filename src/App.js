import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container fluid className="Content">
        <Row>
          <Col xs="3" className="bg-light bg-gradient vh-100 text-start">
            <SideBar />
          </Col>

          <Col xs="9">
            Placeholder Contents
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;