import { React, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";

import axios from 'axios';

function Movie(props) {
    const params = useLocation().state;

    const showId = params.showId;
    const showType = params.showType;
    const [showData, setShowData] = useState(null);
    const [movieVideo, setMovieVideo] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);
    const [vote, setVote] = useState(null);
    const [modal, setModal] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);

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
        if(res.data.results.length > 0)
        setMovieVideo(res.data.results[0]);
      })
    }, [])

    const openModal = () => {
        setModal(!modal);
    };

    const spinner = () => {
        setVideoLoading(!videoLoading);
    };

    return (
        <>
        {showData && movieVideo ?
            <>
                <section className='show-info' style={{backgroundImage: `linear-gradient(#000000c7, #000000c7), url('https://image.tmdb.org/t/p/w500${showData.backdrop_path}')`}}>
                    {modal ?
                        <section className='modal_bg'>
                            <div className='modal_align'>
                                <div className='modal_content' open={modal}>
                                    <span className='close_button' onClick={openModal}>X</span>
                                    <div className='modal_video-align'>
                                        {videoLoading ?
                                            <div className='modal-spinner'>
                                            </div>
                                            :""
                                        }
                                        <iframe className='modal_video-style' onLoad={spinner} loading="lazy" width='800' height='500' src={`https://www.youtube.com/embed/${movieVideo.key}`} title={movieVideo.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </section>
                        :""
                    }
                    { !modal ?
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
                                <div className='vote-content'>
                                    <div className='circle1'>
                                        <CircularProgressBar percent={vote} size={70} colorSlice={'red'} colorCircle={'#6a0905'} fontColor={'#FFFFFF'} round={true} speed={80} unit={'%'} />
                                    </div>
                                        <span className='vote-label'>Nombre de votes positifs</span>
                                </div>
                                {movieVideo ?
                                    <div className='teaser-button-container' onClick={openModal}>
                                        <img src='/play-button.png' alt='play-button'className='play-icon' />
                                        <span className='teaser-button-text'>Bande annonce</span>
                                    </div>
                                    :""
                                }
                            </div>
                            <span className='tagline'>{ showData.tagline }</span>
                            <div className='synopsis-title'>
                                <h4>Synopsis</h4>
                                <p className='synopsis-content'>{ showData.overview }</p>
                            </div>
                        </div>
                        </div>
                    : ""
                    }
                    
                </section>
            </>
            :
            <section className='show-info'></section>    
        }
        </>
    );
}

export default Movie;