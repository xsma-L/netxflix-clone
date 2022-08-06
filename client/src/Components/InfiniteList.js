import { React, useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';


function InfiniteList(props) {
    const [page, setPage] = useState(1);
    const ref = useRef();
    
    // The scroll listener
    const handleScroll = useCallback(() => {
        const div = ref.current;
        let scrHeight = div.scrollHeight;
        let scrTop = div.scrollTop;
        let clientHeight = div.clientHeight;
        console.log(`elementScrHeight: ${scrHeight}/elementScrTop&clientHeight: ${scrTop + clientHeight}`);        
    }, [])
    
    // Attach the scroll listener to the div
    useEffect(() => {
        const div = ref.current;
        div.addEventListener("scroll", handleScroll);
        getData();
    }, [handleScroll])
    
    const getData = () => {
        axios.get('https://api.themoviedb.org/3/discover/tv', {
            params :{
                api_key: process.env.REACT_APP_TMB_API_KEY,
                language : 'fr-FR',
                with_genres : props.genreID,
                page : page,
            }
        })
          .then(res => props.setData([...props.data, ...res.data.results]))
          .catch(console.log);
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