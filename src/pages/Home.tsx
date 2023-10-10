import { Link } from 'react-router-dom'

import ButtonComponent from '../components/Button.tsx'

import '../assets/styles/pages/home.scss'

import GPLogo from '../assets/images/green-percent-logo.png'
import GPGirl from '../assets/images/green-logo-girl.png'

export default function Home() {
    return (
        <div className="home">
            <div className="home-header">
                <h1>
                    Green-Percent<span className="green-dot">.</span>
                </h1>
                <img className="logo" src={GPLogo} alt="Green-Percent Logo" />
            </div>
            <p className="tagline">
                À quel point es-tu <span className="green-text">vert</span> ?
            </p>
            <p className="tagline">
                C'est ce que l'on te propose de savoir à travers ce petit
                questionnaire.
            </p>
            <p className="tagline">
                Répond à chaque question honnêtement afin de connaître le % de
                sang vert que tu as en toi, prêt ?
            </p>
            <img className="logo" src={GPGirl} alt="Green-Percent Logo" />
            <Link to="/interview">
                <ButtonComponent text="Let's Go !" />
            </Link>
        </div>
    )
}
