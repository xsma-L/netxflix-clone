import { React, useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';


function InfiniteList(props) {
    // const [type, setType] = useState('tv');
    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);
    const [isSwitched, setIsSwitched] = useState(false);
    const [isSerie, setIsSerie] = useState(null);
    const ref = useRef();
    /*
    Si switch === true => films
    Si switch === false => séries

    1. Changer le type en fonction de switch (tv/movie)
    2. Remettre la page à 1
    3. Verifier si c'est une serie ou non & mettre a jour getData

    3.5 Quand GetData aura fonctioné :
    */
  
    // Attach the scroll listener to the div
    useEffect(() => {
        const div = ref.current;

        // if(props.infos.isSerie && props.infos.genreId) {
        //     // Series
        //     setIsSwitched(true);
        //     if(loadMore === false)
        //     console.log('go see a show');
        //     // setLoadMore(true);
        // } 
        // else {
        //     // Films
        //     setIsSwitched(true);
        //     if(loadMore === false) 
        //     console.log('go see a movie');
        //     // setLoadMore(true);
        // }


        if(loadMore) {
            getData();
            setLoadMore(false);
            return () =>  div.removeEventListener('scroll', handleScroll);
        }

        div.addEventListener("scroll", handleScroll);
    }, [loadMore, props.infos.genreId])

      // The scroll listener
      const handleScroll = useCallback(() => {
        const div = ref.current;
        
        if(div.scrollHeight === div.scrollTop + div.clientHeight || div.scrollHeight === div.scrollTop + div.clientHeight - 0.5)
        setLoadMore(true);
    }, [])
    
    const getData = () => {
        if(loadMore)
        console.log('getting datas...')
        
        let type;
        let pageNb;

        if(props.infos.isSerie) {
            type = 'tv';
            console.log('tv');
        } else {
            type = 'movie';
            console.log('movie');
        }

        if(isSwitched) {
            pageNb = 1;
        } else {
            pageNb = page;
        }

        axios.get(`https://api.themoviedb.org/3/discover/${type}`, {
            params :{
                api_key: process.env.REACT_APP_TMB_API_KEY,
                language : 'fr-FR',
                with_genres : props.infos.genreId,
                page : pageNb,
            }
        })
        .then((res) => {
            if(isSwitched) {
                props.setData(res.data.results);
                setIsSwitched(false);
            } else {
                props.setData([...props.data, ...res.data.results]);
            }
            setLoadMore(false)
            pageNb++
            setPage(pageNb);
        })
        .catch(err => console.log(err));
    } 

    return (
        <div className='flixnet-catalogue-elements' ref={ref}>
            { props.data ?
                props.data.map(show => {
                    return (
                        <div key={ show.id } className='show-container'>
                            <img className='show-poster' alt={ show.name } src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
                            <span className='show-name'>{ show.name }</span>
                        </div>
                    )
                })
            : ""}
        </div>
    );
}

export default InfiniteList;