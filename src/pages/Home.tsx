import GPLogo from '../assets/images/green-percent-logo.png'
import ButtonComponent from '../assets/styles/components/Button.tsx'
import '../assets/styles/pages/home.scss'

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
            <ButtonComponent />
        </div>
    )
}
