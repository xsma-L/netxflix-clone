import { React, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";

import Episode from './Episode';
import axios from 'axios';

function TvShow(props) {
    const params = useLocation().state;

    const [showId, setShowID] = useState(params.showId);
    const [showType, setShowType] = useState(params.showType);
    const [showData, setShowData] = useState(null);
    const [showVideo, setShowVideo] = useState([]);
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
        let date = new Date(res.data.first_air_date);
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
        setShowVideo(res.data.results[0]);
      })
    }, [])

    const saisonClicked = (e) => {
        let element = e.target;

        let elementContainer

        if(element.className === 'saison-title') {
            elementContainer = element.parentElement;
        } else {
            elementContainer = element.parentElement.parentElement
        }

        let episodesContainer = elementContainer.children[1];


        if(episodesContainer.style.display === 'none') {
            episodesContainer.style.display = 'block';
        } else {
            episodesContainer.style.display = 'none';
        }
    }

    const openModal = () => {
        setModal(!modal);
    };

    const spinner = () => {
        setVideoLoading(!videoLoading);
    };

    return (
        <>
        {showData && showVideo ?
            <>
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
                                    <iframe className='modal_video-style' onLoad={spinner} loading="lazy" width='800' height='500' src={`https://www.youtube.com/embed/${showVideo.key}`} title={showVideo.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </section>
                    :""
                }
                { !modal ?
                    <>
                        <section className='show-info' style={{backgroundImage: `linear-gradient(#000000c7, #000000c7), url('https://image.tmdb.org/t/p/w500${showData.backdrop_path}')`}}>
                            <div className='show-main'>
                                <div className='show-img-container'>
                                    <img src={`https://image.tmdb.org/t/p/w500${showData.poster_path}`} alt={showData.name} />
                                </div>
                                <div className='show-infos'>
                                    <h2 className='show-name'>{ showData.name }</h2>
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
                                        { vote ?
                                            <>
                                                <div className='circle1'>
                                                    <CircularProgressBar percent={vote} size={70} colorSlice={'red'} colorCircle={'#6a0905'} fontColor={'#FFFFFF'} round={true} speed={80} unit={'%'} />
                                                </div> 
                                                <span className='vote-label'>Nombre de votes positifs</span>
                                            </>
                                            : ""
                                        }
                                            {showVideo ?
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
                        </section>
                        <section className='saisons-episodes'>
                            <h3 style={{color: '#FFFFFF'}}>Saisons & épisodes</h3>
                            <main className='saisons-container'>
                                { showData.seasons.map(saison => {
                                    return (
                                        <div key={saison.name} className='saison-content'>
                                            <div className='saison-title' onClick={saisonClicked}>
                                                { saison.poster_path !== null ?
                                                    <img src={`https://image.tmdb.org/t/p/w500${saison.poster_path}`} className='saison-img' alt={saison.name} />
                                                    :
                                                    <span className='saison-img no-pic'>F</span>
                                                }
                                                <h5 className='saison-name'>{saison.name}</h5>
                                            </div>
                                            <Episode showId={showData.id} saison={saison.season_number} displayed={false}/>
                                        </div>
                                    )
                                })

                                }
                            </main>
                        </section>
                    </> :""
                }
            </>
            :
            <section className='show-info'></section>    
        }
        </>
    );
}

export default TvShow;