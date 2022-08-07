import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import InfiniteList from './InfiniteList';

function Catalogue(props) {
    let { genreName, genreID } = useParams();

    const [showType, setShowType] = useState(true);
    const [data, setData] = useState([]);

    const switchType = (e) => {
        let newType = !showType;
        setShowType(newType)
        
    }

    return (
        <main className='catalogue' id='flixnet-catalogue'>
            <section className='flixnet-catalogue'>
                <div className='flixnet-catalogue-tile'>
                    <h1>{genreName}</h1>
                    <div className='toogle-button'>
                        <input type='checkbox' id='switch' className='flixnet-catalog-switch catalog-checkbox'/>
                            {showType ?
                            <label htmlFor='switch' className='toogle series' onClick={switchType}>
                                <p className='toogle-series'>Séries</p>
                            </label>
                            :
                            <label htmlFor='switch' className='toogle films' onClick={switchType}>
                                <p className='toogle-films'>Films</p> 
                            </label> }
                    </div>
                </div>
                <InfiniteList data={data} setData={setData} genreID={genreID} />
            </section>
        </main>
    );
}

export default Catalogue;