import React, { useState, useEffect } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Acceuil(props) {
    const [newSeries, setNewSeries] = useState(null);

    useEffect(() => {
        axios.get('https://api.betaseries.com/news/last', {
            params: {
              v: 3.0,
              key: process.env.REACT_APP_API_KEY
            }
          })
          .then(function (response) {
            setNewSeries(response.data.news.slice(0,4));
            console.log(newSeries);
          })
          .catch(function (error) {
            console.log(error);
          })
    }, [])

    return (
        <main>
            {console.log(newSeries)}
            { newSeries ? 
                <section className='netflixClone-acceuil'>
                    <Carousel fade >
                        {newSeries.map((serie) => 
                            <Carousel.Item key={ serie.id }>
                                <Button variant="light" className="netflixClone-acceuil-button"><Link to='home' className='netfilxClone-acceuil-link'>Accéder au site</Link></Button>{' '}
                                <img className='caroussel-image' src={ serie.picture_url } alt='nextflixClone-acceuil-image' />
                                <Carousel.Caption>
                                    <h3>{ serie.title }</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )}
                    </Carousel>
                </section> : ''
            }
        </main>
    );
}

export default Acceuil;