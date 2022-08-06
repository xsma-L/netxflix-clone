import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import InfiniteList from './InfiniteList';

function Catalogue(props) {
    let { genreID } = useParams();

    const [data, setData] = useState([]);

    return (
        <main className='catalogue'>
            <section className='flixnet-catalogue'>
                <h1>Catalogue</h1>
                <InfiniteList data={data} setData={setData} genreID={genreID} />
            </section>
        </main>
    );
}

export default Catalogue;