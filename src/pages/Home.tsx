import GPLogo from '../assets/images/green-percent-logo.png'
import ButtonComponent from '../assets/styles/components/Button.tsx'
import '../assets/styles/pages/Home.scss'

export default function Home() {
    return (
        <div className="home">
            <div className="home-head">
                <img src={GPLogo} />
                <h1>Green-Percent.</h1>
            </div>
            <p>à quel point es-tu vert ?</p>
            <ButtonComponent />
        </div>
    )
}
