import { React, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";

import axios from 'axios';

function WatchShow(props) {
    const params = useLocation().state;

    const [showId, setShowID] = useState(params.showId);
    const [showType, setShowType] = useState(params.showType);
    const [showData, setShowData] = useState(null);
    const [showVideos, setShowVideos] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);
    const [vote, setVote] = useState(null);

    // .toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month:'long', day:'numeric'})

    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/${showType}/${showId}`, {
        params :{
            api_key : process.env.REACT_APP_TMB_API_KEY,
            language : 'fr-FR',

        }
      })
      .catch((err) => console.log(err))
      .then((res) => {
        setShowData(res.data);
        let date = new Date(res.data.release_date);
        let frenchDate = date.toLocaleDateString('fr-FR', { year: 'numeric', month:'long', day:'numeric'});
        setReleaseDate(frenchDate);

        let voteNb = res.data.vote_average * 10;
        let n = voteNb.toFixed();
        // parseInt(n, 10)
        let newVote = parseInt(n, 10);
        setVote(newVote);
      })

      axios.get(`https://api.themoviedb.org/3/${showType}/${showId}/videos`, {
        params :{
            api_key : process.env.REACT_APP_TMB_API_KEY,
            language : 'fr-FR',

        }
      })
      .catch((err) => console.log(err))
      .then((res) => {
        setShowVideos(res.data.results);
      })
    }, [])

    return (
        <>
        {showData && showVideos ?
            <>
                <div className='filter' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${showData.backdrop_path})`}}></div>
                <section className='show-info'>
                    <div className='show-main'>
                        <div className='show-img-container'>
                            <img src={`https://image.tmdb.org/t/p/w500${showData.poster_path}`} alt={showData.original_title} />
                        </div>
                        <div className='show-infos'>
                            <h2 className='show-name'>{ showData.original_title }</h2>
                            <div className='show-date-genres'>
                                <span className='show-date'>{ releaseDate} &#8226;</span>
                                <div className='show-genres'>
                                    {showData.genres.map(genre => {
                                        return (
                                            <span key={genre.id}>{ genre.name }</span>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='vote-container'>
                                <div className='circle1'>
                                    <CircularProgressBar percent={vote} size={70} colorSlice={'red'} colorCircle={'#6a0905'} fontColor={'#FFFFFF'} round={true} speed={80} unit={'%'} />
                                </div>
                                <span className='vote-label'>Nombre de votes positifs</span>
                                <div className='teaser-button-container'>
                                    <img src='/play-button.png' alt='play-button'className='play-icon' />
                                    <span className='teaser-button-text'>Bande annonce</span>
                                </div>
                            </div>
                            <span className='tagline'>{ showData.tagline }</span>
                            <div className='synopsis-title'>
                                <h4>Synopsis</h4>
                                <p className='synopsis-content'>{ showData.overview }</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
            :
            <section className='show-info'></section>    
        }
        </>
    );
}

export default WatchShow;