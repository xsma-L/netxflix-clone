import { React, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import InfiniteList from './InfiniteList';

function Catalogue() {
    
    let infos = useParams();
    let genreName = infos.genreName;
    let seriesGenreId = infos.genreID;

    const location = useLocation();
    const movieGenreId = location.state.movieGenreId;

    const [data, setData] = useState([]);

    return (
        <main className='catalogue' id='flixnet-catalogue'>
            <section className='flixnet-catalogue'>
                <InfiniteList data={data} setData={setData} infos={{ seriesGenre: seriesGenreId, movieGenre: movieGenreId, genreName: genreName}}/>
            </section>
        </main>
    );
}

export default Catalogue;