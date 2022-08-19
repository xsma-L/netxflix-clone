import React, { useEffect } from 'react';

import axios from 'axios';

function Saison(props) {
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/${props.showId}/season/${props.saison}`, {
            params :{
                api_key : process.env.REACT_APP_TMB_API_KEY,
                language : 'fr-FR',
            } 
        })
        .catch(err => console.log(err))
        .then(res => {
            console.log(res.data)
        })
    }, [])

    return (
        <div>
            
        </div>
    );
}

export default Saison;