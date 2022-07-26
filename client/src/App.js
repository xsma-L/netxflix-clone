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

      </div>
    </nav>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Acceuil />} />
        <Route path='Home' element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
