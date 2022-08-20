import React, { useEffect, useState } from 'react';

import axios from 'axios';

function Saison(props) {

    const [episodes, setEpisodes] = useState(null);

    useEffect(() => {
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
    }, [])

    return (
        <div className='episodes-container' style={{display: 'none'}}>
            { episodes ?
                episodes.map(episode => {
                    return (
                        <div key={episode.id} className='episode-container'>
                            <img alt={episode.name} className='episode-poster' src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`} />
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

export default Saison;