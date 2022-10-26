import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import NewTag from './pages/NewTag';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path="/newTag" element = {<NewTag/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
