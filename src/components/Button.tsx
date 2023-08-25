import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import '../assets/styles/components/button.scss'

interface ButtonComponentProps {
    text: string
    linkTo?: string
    onClick?: () => void
    children?: ReactNode
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
    text,
    onClick,
    children,
}) => {
    const buttonContent = (
        <Button className={`button-home`} onClick={onClick} value={text}>
            {text || children}
        </Button>
    )

    return <div className="mb-2">{buttonContent}</div>
}

ButtonComponent.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node,
}

export default ButtonComponent
