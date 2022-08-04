import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Acceuil from './Components/Acceuil';
import Home from './Components/Home';
import './App.css';

function App() {
  return (
    <>
    <nav>
      <div className="logo-container">
        <span className="logo">FLIXNET</span>
      </div>
      {/* <div className="nav-menu">
        <span>Se connecter</span>
        <span>S'inscrire</span>
      </div> */}
    </nav>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Acceuil />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
