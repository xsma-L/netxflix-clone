import {React, useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import SearchWithGenre from './SearchWithGenre';

function Home() {
    const [popularMovies, setPoularMovies] = useState([]);
    const [popularTvShows, setPopularTvShows] = useState([]);
    const [moviesGenre, setMoviesGenres] = useState([]);
    const [tvGenre, setTvGenres] = useState([]);
    const location = useLocation();
    const user = location.state;
    
    useEffect(() => {
        if(user) 
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userPicture', user.picture);

        axios.get('https://api.themoviedb.org/3/movie/popular/', {
            params : {
                api_key: process.env.REACT_APP_TMB_API_KEY,
                language : 'fr-FR'
            }
        })
        .catch(err => console.log(err))
        .then(res => setPoularMovies(res.data.results))

        axios.get('https://api.themoviedb.org/3/tv/popular/', {
            params : {
                api_key: process.env.REACT_APP_TMB_API_KEY,
                language : 'fr-FR'
            }
        })
        .catch(err => console.log(err))
        .then(res => setPopularTvShows(res.data.results))

        axios.get('https://api.themoviedb.org/3/genre/movie/list', {
            params: {
                api_key: process.env.REACT_APP_TMB_API_KEY,
                language: 'fr-FR'
            }
        })
        .catch(err => console.log(err))
        .then(res => setMoviesGenres(res.data.genres))

        axios.get('https://api.themoviedb.org/3/genre/tv/list', {
            params: {
                api_key: process.env.REACT_APP_TMB_API_KEY,
                language: 'fr-FR'
            }
        })
        .catch(err => console.log(err))
        .then(res => setTvGenres(res.data.genres))
    }, []);


    return (
        <main className='home-main'>
            <section className='nouveautés'>
                <div className='popular-movies'>
                    <h3>Films populaires</h3>
                    <div className='discover-content'>
                        { popularMovies ?
                            popularMovies.map(show => {
                                return (
                                    <Link to={`/show/${show.title}`} state={{showId: show.id, showType: 'movie'}} key={ show.id }>
                                        <div className='show-container'>
                                            <img className='show-poster' alt={ show.title } src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
                                            <span className='show-name'>{ show.title }</span>
                                        </div>
                                    </Link>
                                )
                            })
                        : ""}
                    </div>
                </div>
                <div className='popular-tvShow'>
                    <h3>Séries populaires</h3>
                    <div className='discover-content'>
                        { popularTvShows ?
                            popularTvShows.map(show => {
                                return (
                                    <Link to={`/show/${show.name}`} state={{showId: show.id, showType: 'tv'}} key={ show.id }>
                                        <div className='show-container'>
                                            <img className='show-poster' alt={ show.name } src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
                                            <span className='show-name'>{ show.name }</span>
                                        </div>
                                    </Link>
                                )
                            })
                        : ""}
                    </div>
                </div>
            </section>
            <section className='discover'>
                { moviesGenre.length > 0 && tvGenre.length > 0 ?
                    tvGenre.map(genre => {
                        return (
                            <SearchWithGenre key={genre.id} idGenre={genre.id} genreName={genre.name} limit={10} genre={genre} moviesGenre={moviesGenre}/>
                        )
                    })
                : ""}
            </section>
        </main>
    );
}

export default Home;