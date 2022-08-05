import {React, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [discoverContent, setDiscoverContent] = useState(null);
    const location = useLocation();
    const user = location.state;
    
    useEffect(() => {
        if(user) 
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userPicture', user.picture);

        axios.get('https://api.themoviedb.org/3/discover/movie', {
            params : {
                api_key: process.env.REACT_APP_TMB_API_KEY,
                langage : 'fr-FR',
            }
        })
        .catch(err => console.log(err))
        .then(res => setDiscoverContent(res.data.results))
    }, []);


    return (
        <main className='home-main'>
            <section className='nouveautés'>
                <h3>Populaire en ce moment</h3>
                <div className='discover-content'>
                    { discoverContent ?
                        discoverContent.map(show => {
                            return (
                                <div key={ show.id } className='show-container'>
                                    <img className='show-poster' alt={ show.title } src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
                                    <span className='show-name'>{ show.title }</span>
                                </div>
                            )
                        })
                    : ""}
                </div>
            </section>
        </main>
    );
}

export default Home;