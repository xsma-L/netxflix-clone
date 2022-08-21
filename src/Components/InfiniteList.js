import { React, useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function InfiniteList(props) {
    const [isSerie, setIsSerie] = useState(true);
    const [genreId, setGenreId] = useState(props.infos.seriesGenre);
    const [type, setType] = useState('tv');
    const [pageNb, setPageNb] = useState(1);
    const [loadMore, setLoadMore] = useState(true);
    const [divClassName, setDivClassName] = useState('flixnet-catalogue-elements')
    const ref = useRef();

    // Attach the scroll listener to the div
    useEffect(() => {
        const div = ref.current;
        
        if(!props.infos.movieGenre) {
            setDivClassName('flixnet-catalogue-elements only-series')
        }

        if(loadMore) {
            getData();
            setLoadMore(false);
            return () =>  div.removeEventListener('scroll', handleScroll);
        }

        div.addEventListener("scroll", handleScroll);
    }, [loadMore, props.infos])

    // The scroll listener
    const handleScroll = useCallback(() => {
        const div = ref.current;
        
        if(div.scrollHeight === div.scrollTop + div.clientHeight || div.scrollHeight === div.scrollTop + div.clientHeight - 0.5)
        setLoadMore(true);
    }, [])

    const switchType = () => {

        if(isSerie) {
            setIsSerie(false);
            setType('movie');
            setGenreId(props.infos.movieGenre);
            setPageNb(1);
            props.setData([]);
            setLoadMore(true);
        } else {
            setIsSerie(true);
            setType('tv');
            setGenreId(props.infos.seriesGenre);
            setPageNb(1);
            props.setData([]);
            setLoadMore(true);
        }
    }
    
    const getData = () => {
        axios.get(`https://api.themoviedb.org/3/discover/${type}`, {
            params :{
                api_key: process.env.REACT_APP_TMB_API_KEY,
                language : 'fr-FR',
                with_genres : genreId,
                page : pageNb,
            }
        })
        .then((res) => {
            props.setData([...props.data, ...res.data.results]);
            setLoadMore(false)
            let nextPage = pageNb;
            nextPage++
            setPageNb(nextPage);
        })
        .catch(err => console.log(err));
    } 

    return (
        <div className='pics-display'>
            <div className='button-container'>
                    { props.infos.movieGenre ?
                        <>
                            <input type='checkbox' id='switch' className='flixnet-catalog-switch catalog-checkbox'/>
                            {isSerie ?  
                            <label htmlFor='switch' className='toogle series' onClick={switchType}>
                                <p className='toogle-series'>Séries</p>
                            </label>
                            : 
                            <label htmlFor='switch' className='toogle films' onClick={switchType}>
                                <p className='toogle-films'>Films</p> 
                            </label> } 
                        </>
                    :""}
            </div>
                <div className={divClassName} ref={ref}>
                { props.data ?
                    props.data.map(show => {
                        return (
                            <div key={ show.id } className='show-container'>
                                {isSerie ?
                                    <Link to={`/tv-show/${show.name}`} state={{showId: show.id, showType: 'tv'}}>
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
            </div> 
        </div>
    );
}

export default InfiniteList;