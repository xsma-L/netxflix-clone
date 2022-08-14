import { React, useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';


function InfiniteList(props, ref) {
    // const [type, setType] = useState('tv');
    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);
    const [isSwitched, setIsSwitched] = useState(false);
    const [firstCall, setFirstCall] = useState(true);
    const [isSerie, setIsSerie] = useState(true);
    const refe = useRef();

    /*
        si switched === true et que le type 'a pas changer
        ajouter les elemnts à la suite et su
    */
  
    // Attach the scroll listener to the div
    useEffect(() => {
        const div = refe.current;

        if(!isSwitched) {
            setIsSwitched(props.infos.switched);
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
        const div = refe.current;
        
        if(div.scrollHeight === div.scrollTop + div.clientHeight || div.scrollHeight === div.scrollTop + div.clientHeight - 0.5)
        setLoadMore(true);
    }, [])

    const switchType = () => {
        console.log('clicked')
        let newType = !isSerie;
        setIsSerie(newType)
    }
    
    const getData = () => {
        if(loadMore)
        console.log('getting datas...')
        
        let type;
        let pageNb;

        if(props.infos.isSerie) {
            type = 'tv';
            // console.log('tv');
        } else {
            type = 'movie';
            // console.log('movie');
        }

        if(isSwitched ) {
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
                console.log('test')
                props.setData(res.data.results);
                setIsSwitched(false);
            } else {
                props.setData([...props.data, ...res.data.results]);
                setFirstCall(false);
            }
            setLoadMore(false)
            pageNb++
            setPage(pageNb);
        })
        .catch(err => console.log(err));
    } 

    return (
        <div className='pics-display'>
            <div className='button-container'>
                <input type='checkbox' id='switch' className='flixnet-catalog-switch catalog-checkbox'/>
                    {isSerie ? 
                    <label htmlFor='switch' className='toogle series' onClick={switchType}>
                        <p className='toogle-series'>Séries</p>
                    </label>
                    : 
                    <label htmlFor='switch' className='toogle films' onClick={switchType}>
                        <p className='toogle-films'>Films</p> 
                    </label> }
            </div>
            <div className='flixnet-catalogue-elements' ref={refe}>
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
        </div>
    );
}

export default InfiniteList;