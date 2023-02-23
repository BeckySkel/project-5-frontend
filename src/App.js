import { Container } from 'react-bootstrap';
import './App.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <SideBar />
      <Container>
        Contents
      </Container>

    </div>
  );
}

export default App;