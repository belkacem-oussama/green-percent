import Button from 'react-bootstrap/Button'
import '../assets/styles/components/buttons.scss'

export default function ButtonComponent() {
    const handleClick = () => {
        console.log('Le bouton a été cliqué !')
    }

    return (
        <div className="mb-2">
            <Button className="button-home" size="lg" onClick={handleClick}>
                Let's Go !
            </Button>
        </div>
    )
}
