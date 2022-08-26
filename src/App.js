import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Acceuil from './Components/Acceuil';
import Home from './Components/Home';
import Catalogue from "./Components/Catalogue";
import Movie from "./Components/Movie";
import TvShow from "./Components/TvShow";

import './App.css';

function App() {

  const [userName, setUserName] = useState(null);
  const [userPicture, setUserPicture] = useState(null);

  return (
    <>
    <Helmet>
        <title>Flixnet netflix sans streaming !</title>
        <meta name="flixnet" content="Flixnet netflix sans streaming !" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Helmet>
    <nav>
      <div className="logo-container">
        <span className="logo">FLIXNET</span>
      </div>
      { userName ?
        <div className="nav-user">
          <span className="nav-userName">{ userName }</span>
          <img className="nav-userPicture" src={userPicture} alt='nav-userPicture' />
        </div>
      : ''}
    </nav>

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Acceuil />} />
        <Route path='home' element={<Home />} />
        <Route path='catalogue/:genreName/:genreID' element={<Catalogue />} />
        <Route path='movie/:shownName' element={<Movie />} />
        <Route path='tv-show/:shownName' element={<TvShow />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
