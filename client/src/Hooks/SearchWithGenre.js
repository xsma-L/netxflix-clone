import {React, useState, useEffect} from 'react';
import axios from 'axios'

/*
1. Récupère en props le type (film/série), l'id du genre (string) ainsi que la taiile du tabeau souhaité (int).

2. Effectue une requête qui recupere tous les films/séries.

3.  Boucle sur le tableau de resultat & si il y a une occurence dans le tableau, on le set dans le state.

3.1. Boucler sur les elements du tableau.

3.2. Verifier le présence de l'id dans chaque elements.

3.3 Si non, passer.

3.4 Si oui, insérer dans le state.

3.5 Faire en sorte qu'il y ait 5 film et 5 series dans chaques tableau.

4.  filtre avec l'id du genre et les affiches.

MoviesGenre : 
    0: {id: 28, name: 'Action'} x
    1: {id: 12, name: 'Aventure'} x
    2: {id: 16, name: 'Animation'} x
    3: {id: 35, name: 'Comédie'} x
    4: {id: 80, name: 'Crime'} x
    5: {id: 99, name: 'Documentaire'} x
    6: {id: 18, name: 'Drame'} x 
    7: {id: 10751, name: 'Familial'} x
    8: {id: 14, name: 'Fantastique'} x
    9: {id: 36, name: 'Histoire'}
    10: {id: 27, name: 'Horreur'}
    11: {id: 10402, name: 'Musique'}
    12: {id: 9648, name: 'Mystère'} x
    13: {id: 10749, name: 'Romance'}
    14: {id: 878, name: 'Science-Fiction'} x
    15: {id: 10770, name: 'Téléfilm'} o
    16: {id: 53, name: 'Thriller'} o
    17: {id: 10752, name: 'Guerre'} x
    18: {id: 37, name: 'Western'} x

tvGenres : 

    0: {id: 10759, name: 'Action & Adventure'} x
    1: {id: 16, name: 'Animation'} x
    2: {id: 35, name: 'Comédie'} x
    3: {id: 80, name: 'Crime'} x
    4: {id: 99, name: 'Documentaire'} x
    5: {id: 18, name: 'Drame'} x
    6: {id: 10751, name: 'Familial'} x
    7: {id: 10762, name: 'Kids'} o
    8: {id: 9648, name: 'Mystère'} x
    9: {id: 10763, name: 'News'} o
    10: {id: 10764, name: 'Reality'} o
    11: {id: 10765, name: 'Science-Fiction & Fantastique'} x
    12: {id: 10766, name: 'Soap'} o 
    13: {id: 10767, name: 'Talk'} o
    14: {id: 10768, name: 'War & Politics'} x
    15: {id: 37, name: 'Western'} x


*/

function SearchWithGenre(props) {

    const moviesGenre = props.moviesGenre;
    const tvGenres = props.tvGenres;
    const [datas, setDatas] = useState([]);


    useEffect(() => {
        // console.log(datas.length)
        if(datas.length === 0) {
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
        } else if (datas.length === 10) {
            searchMoviesByGenre(props.genreName)
        } else {
            return;
        }
    }, [datas]);
    
    const searchMoviesByGenre = (genreName, twoGenres = false) => {
        switch (genreName) {
            case 'Action & Adventure':
                moviesGenre.map(genre => {
                    if(genre.name === 'Aventure')
                        addMovies(genre.id);
                })
                break;
            case 'Kids' :
                console.log('kids');
                break;
            case 'News' : 
                console.log('news')
                break;
            case 'Reality' : 
                console.log('reality');
                break;
            case 'Science-Fiction & Fantastique' :
                break;
            case 'Soap' : 
                console.log('soap');
                break;
            case 'Talk' : 
                console.log('talk');
                break;
            case 'War & Politics' : 
                console.log('war');
            default :
            moviesGenre.map(genre => {
                if(genre.name === genreName)
                    addMovies(genre.id);
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
                                        <>
                                            <img className='show-poster' alt={ show.name } src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
                                            <span className='show-name'>{ show.name }</span>
                                        </>
                                    :  
                                        <>
                                            <img className='show-poster' alt={ show.title } src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
                                            <span className='show-name'>{ show.title }</span>
                                        </>
                                    }
                                </div>
                            )
                        })
                    : ""}
                </div>
            </div>            
        </div>
    );
}

export default SearchWithGenre;