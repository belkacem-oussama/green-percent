import React from 'react'
import Header from './layouts/Header.tsx'
import Home from './pages/Home.tsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import '../src/assets/styles/main.scss'
import Interview from './pages/Interview.tsx'

export default function App() {
    const location = useLocation()

    return (
        <React.Fragment>
            {location.pathname !== '/' && <Header />}{' '}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/interview" element={<Interview />} />
            </Routes>
        </React.Fragment>
    )
}
