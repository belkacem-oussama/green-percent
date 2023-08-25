import React from 'react'
import GPLogo from '../assets/images/green-percent-logo.png'
import '../assets/styles/layouts/header.scss'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <Link to="/">
            <div className="header">
                <h1>
                    Green-Percent<span className="green-dot">.</span>
                </h1>
                <img className="logo" src={GPLogo} alt="Green-Percent Logo" />
            </div>
        </Link>
    )
}
