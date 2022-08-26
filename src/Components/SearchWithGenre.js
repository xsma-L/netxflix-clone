import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SearchWithGenre(props) {

    const [datas, setDatas] = useState([]);
    const [movieGenreId, setMovieGenreId] = useState(null);
    const moviesGenre = props.moviesGenre;
    
    useEffect(() => {
        if(datas.length === 0) {
            if(props.idGenre === 10762 || props.idGenre === 10763 || props.idGenre === 10764 || props.idGenre === 10766 || props.idGenre === 10766 || props.idGenre === 10767) {
                axios.get('https://api.themoviedb.org/3/discover/tv', {
                params :{
                    api_key : process.env.REACT_APP_TMB_API_KEY,
                    language : 'fr-FR',
                    with_genres : props.idGenre
                } 
                })
                .catch(err => console.log(err))
                .then(res => {
                    const tvShowsResponse = res.data.results;
                    setDatas(tvShowsResponse);
                })
            } else {
                axios.get('https://api.themoviedb.org/3/discover/tv', {
                    params :{
                        api_key : process.env.REACT_APP_TMB_API_KEY,
                        language : 'fr-FR',
                        with_genres : props.idGenre
                    } 
                })
                .catch(err => console.log(err))
                .then(res => {
                    const tvShowsResponse = res.data.results;
                    let dataToSet = tvShowsResponse.slice(0, 10) 
                    setDatas(dataToSet);
                })
            }
        } else if (datas.length === 10) {
            findMoviesGenreID(props.genreName)
        } else {
            return;
        }
    }, [datas]);
    
    const findMoviesGenreID = (genreName) => {
        switch (genreName) {
            case 'Action & Adventure':
                moviesGenre.map(genre => {
                    if(genre.name === 'Aventure') {
                        addMovies(genre.id);
                        setMovieGenreId(genre.id);
                    }
                })
                break;
            case 'War & Politics' : 
                moviesGenre.map(genre => {
                    if(genre.name === 'Guerre') {
                        addMovies(genre.id);
                        setMovieGenreId(genre.id);
                    }
                })
                break;
            case 'Science-Fiction & Fantastique' :
                moviesGenre.map(genre => {
                    if(genre.name === 'Fantastique') {
                        addMovies(genre.id);
                        setMovieGenreId(genre.id);
                    }
                })
                break;
            default :
            moviesGenre.map(genre => {
                if(genre.name === genreName) {
                    setMovieGenreId(genre.id);
                    addMovies(genre.id);
                }
            })
        }

    } 
    
    const addMovies = (genreID, page = 1) => {
        axios.get('https://api.themoviedb.org/3/discover/movie', {
            params :{
                api_key : process.env.REACT_APP_TMB_API_KEY,
                language : 'fr-FR',
                with_genres : genreID,
                page : page
            } 
        })
        .catch(err => console.log(err))
        .then(res => {
            const response = res.data.results;
            let moviesFound = response.slice(0, 10);
            let previousDatas = datas;
            let newDatas = previousDatas.concat(moviesFound);
            newDatas.sort(()=> Math.random() - 0.5);
            setDatas(newDatas);
        })
    }
    
    
    return (
        <div>
            <div className='popular-tvShow'>
                <h3>{props.genreName}</h3>
                <div className='discover-content'>
                    { datas ?
                        datas.map(show => {
                            return (
                                <div key={ show.id } className='show-container'>
                                    {show.name ?
                                        <Link to={`/tv-show/${show.name}`} state={{showId: show.id, showType: 'tv'}} key={ show.id }>
                                            <img className='show-poster' alt={ show.name } src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
                                            <span className='show-name'>{ show.name }</span>
                                        </Link>
                                    :  
                                        <Link to={`/movie/${show.title}`} state={{showId: show.id, showType: 'movie'}} key={ show.id }>
                                            <img className='show-poster' alt={ show.title } src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
                                            <span className='show-name'>{ show.title }</span>
                                        </Link>
                                    }
                                </div>
                            )
                        })
                    : ""}
                    <div className='see-more'>
                        {movieGenreId ? 
                            <Link to={`/catalogue/${props.genreName}/${props.idGenre}`} state={{movieGenreId: movieGenreId}}>
                                <div className='show-poster see-more-pic'>
                                    <span className='cross'>+</span>
                                    <span className='see-more-text'>En voir plus</span>
                                </div>
                            </Link>
                        :
                            <Link to={`/catalogue/${props.genreName}/${props.idGenre}`} state={{movieGenreId: null}}>
                                <div className='show-poster see-more-pic'>
                                    <span className='cross'>+</span>
                                    <span className='see-more-text'>En voir plus</span>
                                </div>
                            </Link>
                        }
                    </div>
                </div>
            </div>            
        </div>
    );
}

export default SearchWithGenre;