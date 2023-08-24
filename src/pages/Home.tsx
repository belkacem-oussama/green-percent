import GPLogo from '../assets/images/green-percent-logo.png'

export default function Home() {
    return (
        <div className="home-container">
            <img src={GPLogo} />
            <h1>Green-Percent</h1>
            <p>à quel point es-tu vert ?</p>
            <button>Lancer le questionnaire</button>
        </div>
    )
}
