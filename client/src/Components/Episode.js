import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';

function Episode(props) {

    const [episodes, setEpisodes] = useState(null);
    const [call, setCall] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const divElement = ref.current

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if(divElement.style.display === 'block') {
                    axios.get(`https://api.themoviedb.org/3/tv/${props.showId}/season/${props.saison}`, {
                    params :{
                        api_key : process.env.REACT_APP_TMB_API_KEY,
                        language : 'fr-FR',
                    } 
                    })
                    .catch(err => console.log(err))
                    .then(res => {
                        setEpisodes(res.data.episodes);
                    })
                }

            });    
          });
                    
          observer.observe(divElement, { 
            attributes: true, 
            attributeFilter: ['style'] 
          });
    }, [])

    return (
        <div className='episodes-container' style={{display: 'none'}} ref={ref}>
            { episodes ?
                episodes.map(episode => {
                    return (
                        <div key={episode.id} className='episode-container'>
                            { episode.still_path !== null ?
                                <img alt={episode.name} className='episode-poster' src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`} />
                                :
                                <span className='episode-poster no-pic'>FLIXNET</span>
                            }
                            <div className='episode-infos'>
                                <h5 className='episode-title'>{episode.name}</h5>
                                <p className='episode-resume'>{episode.overview}</p>
                            </div>
                        </div>
                    )
                })
                :""
            }
        </div>
    );
}

export default Episode;