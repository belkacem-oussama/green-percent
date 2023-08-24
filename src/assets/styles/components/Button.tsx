import Button from 'react-bootstrap/Button'

export default function ButtonComponent() {
    const handleClick = () => {
        console.log('Le bouton a été cliqué !')
    }

    return (
        <div className="mb-2">
            <Button variant="success" size="lg" onClick={handleClick}>
                Let's Go !
            </Button>
        </div>
    )
}
