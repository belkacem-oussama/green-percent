import React from 'react'
import Home from './pages/Home.tsx'
import { Route, Routes } from 'react-router-dom'
import '../src/assets/styles/main.scss'

export default function App() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </React.Fragment>
    )
}
