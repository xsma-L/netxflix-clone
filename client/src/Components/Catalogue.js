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

    const switchType = () => {
        let newType = !isSerie;
        setIsSerie(newType)
        setSwitched(!switched);
    }

    return (
        <main className='catalogue' id='flixnet-catalogue'>
            {/* {console.log(genreId)} */}
            <section className='flixnet-catalogue'>
                <div className='flixnet-catalogue-tile'>
                    <h1>{genreName}</h1>
                    <div className='toogle-button'>
                        <input type='checkbox' id='switch' className='flixnet-catalog-switch catalog-checkbox'/>
                            {isSerie ?
                            <label htmlFor='switch' className='toogle series' onClick={switchType}>
                                <p className='toogle-series'>Séries</p>
                            </label>
                            :
                            <label htmlFor='switch' className='toogle films' onClick={switchType}>
                                <p className='toogle-films'>Films</p> 
                            </label> }
                    </div>
                </div>
                <InfiniteList data={data} setData={setData} infos={{genreId: genreId, isSerie: isSerie, switched: switched}}/>
            </section>
        </main>
    );
}

export default Catalogue;