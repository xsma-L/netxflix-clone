import { React, useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';


function InfiniteList(props) {
    const [loadMore, setLoadMore] = useState(true);
    const [page, setPage] = useState(1);
    const ref = useRef();
    
    // The scroll listener
    const handleScroll = useCallback(() => {
        let nextPage = page;
        const div = ref.current;
        let scrHeight = div.scrollHeight;
        let scrTop = div.scrollTop;
        let clientHeight = div.clientHeight;
        console.log(`scrolling on page ${nextPage}`);
        
        if(scrHeight === scrTop + clientHeight || scrHeight === scrTop + clientHeight - 0.5) {
            setLoadMore(true);
            const div = ref.current;
            div.removeEventListener('scroll', handleScroll);
            // console.log(page);
            // getData();
            // setLoadMore(true);
            
            // nextPage++;
            // console.log(nextPage);
            // setPage(nextPage);
            console.log('end of the catalogue');
        }
    }, [])
    
    // Attach the scroll listener to the div
    useEffect(() => {
        console.log(`useEffect is running... page state value: ${page}`)
        const div = ref.current;
        if(loadMore) {
            getData();
            setLoadMore(false);
            return () =>  div.removeEventListener('scroll', handleScroll);
        }
        div.addEventListener("scroll", handleScroll);
    }, [loadMore, page])
    
    const getData = () => {
        if(loadMore)
        console.log('getData is running...')
        axios.get('https://api.themoviedb.org/3/discover/tv', {
            params :{
                api_key: process.env.REACT_APP_TMB_API_KEY,
                language : 'fr-FR',
                with_genres : props.genreID,
                page : page,
            }
        })
        .then((res) => {
            console.log(res.data.results)
            props.setData([...props.data, ...res.data.results]);
            setLoadMore(false)
            let nextPage = page;
            nextPage++;
            setPage(nextPage)
        })
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