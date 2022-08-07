import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import InfiniteList from './InfiniteList';

function Catalogue(props) {
    let { genreName, genreID } = useParams();

    const [data, setData] = useState([]);

    return (
        <main className='catalogue'>
            <section className='flixnet-catalogue'>
                <h1>{genreName}</h1>
                <InfiniteList data={data} setData={setData} genreID={genreID} />
            </section>
        </main>
    );
}

export default Catalogue;