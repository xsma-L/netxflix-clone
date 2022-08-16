import { React, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function WatchShow(props) {
    const params = useLocation().state;

    const [showId, setShowID] = useState(params.showId);
    const [showType, setShowType] = useState(params.showType);
    const [showData, setShowData] = useState(null);
    const [showVideos, setShowVideos] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);

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
        <section className='show-info'>
            {showData && showVideos ?
                <div className='show-main'>
                    <div className='show-img-container'>
                        <img src={`https://image.tmdb.org/t/p/w500/${showData.poster_path}`} alt={showData.original_title} />
                    </div>
                    <div className='show-infos'>
                        <span className='show-name'>{ showData.original_title }</span>
                        <div className='show-date-genres'>
                            <span className='show-date'>{ releaseDate} &#8226;</span>
                            <div className='show-genres'>
                                {showData.genres.map(genre => {
                                    return (
                                        <span>{ genre.name }</span>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='vote-container'>
                            <div className='circle1'>
                                <span className='circle2'>
                                    
                                </span>
                            </div>
                        </div>
                        <span className='tagline'>{ showData.tagline }</span>
                    </div>
                </div>
                :""
            }
        </section>
    );
}

export default WatchShow;