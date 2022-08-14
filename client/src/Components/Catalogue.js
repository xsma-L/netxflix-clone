import { React, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import InfiniteList from './InfiniteList';

function Catalogue(props) {
    let infos = useParams();
    let genreName = infos.genreName;
    let seriesGenreId = infos.genreID;

    const location = useLocation();
    const movieGenreId = location.state.movieGenreId;

    const [isSerie, setIsSerie] = useState(true);
    const [genreId, setGenreId] = useState(null);
    const [data, setData] = useState([]);
    const [switched, setSwitched] = useState(false);

    useEffect(() => {
        if(isSerie) {
            setGenreId(seriesGenreId);
        } else {
            setGenreId(movieGenreId);
        }
    }, [isSerie])



    return (
        <main className='catalogue' id='flixnet-catalogue'>
            <section className='flixnet-catalogue'>
                <div className='flixnet-catalogue-tile'>
                    <h1>{genreName}</h1>
                    <div className='toogle-button'>
                    </div>
                </div>
                <InfiniteList data={data} setData={setData} infos={{genreId: genreId, isSerie: isSerie, switched: switched, seriesGenre: seriesGenreId, movieGenre: movieGenreId}}/>
            </section>
        </main>
    );
}

export default Catalogue;