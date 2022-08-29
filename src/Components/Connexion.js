import { Link } from 'react-router-dom';

function Connexion() {

    return (
        <main className='acceuil-content'>
            <h1>Qui est là ?</h1>
            <div className='accounts'>
                <div className='accountCard'>
                    <Link to='home' state={{name: 'ismael', picture: 'account-picture.jpeg'}}><img className='card-accountImage' src='account-picture.jpeg' alt='account'/></Link>
                    <span className='card-accountName'>Ismaël</span>
                </div>
                <div className='accountCard'>
                    <Link to='home' state={{name: 'ismael', picture: 'account-picture.jpeg'}}><img className='card-accountImage' src='account-picture-2.jpg' alt='account'/></Link>
                    <span className='card-accountName'>Aléxia</span>
                </div>
            </div>
        </main>
    );
}

export default Connexion;