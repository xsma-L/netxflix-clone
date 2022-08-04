import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Acceuil() {

    return (
        <main className='acceuil-content'>
            <h1>Qui est là ?</h1>
            <div className='accounts'>
                <div className='accountCard'>
                    <Link to='home'><img className='card-accountImage' src='account-picture.jpeg' alt='account-picture'/></Link>
                    <span className='card-accountName'>Ismaël</span>
                </div>
                <div className='accountCard'>
                    <Link to='home'><img className='card-accountImage' src='account-picture-2.jpg' alt='account-picture'/></Link>
                    <span className='card-accountName'>Aléxia</span>
                </div>
            </div>
        </main>
    );
}

export default Acceuil;