import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Connexion from './Components/Connexion';
import Home from './Components/Home';
import Catalogue from "./Components/Catalogue";
import Movie from "./Components/Movie";
import TvShow from "./Components/TvShow";

import './App.css';

function App() {

  return (
    <>
    <Helmet>
        <title>Flixnet un netflix sans streaming !</title>
        <meta name="flixnet" content="Flixnet netflix sans streaming !" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Helmet>

      <BrowserRouter>
        <nav>
          <div className="logo-container">
            <Link to={'home'}><span className="logo">FLIXNET</span></Link>
          </div>
        </nav>
      <Routes>
        <Route path='/' element={<Connexion />} />
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
