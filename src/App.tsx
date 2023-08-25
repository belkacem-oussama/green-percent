import React from 'react'
import Home from './pages/Home.tsx'
import { Route, Routes } from 'react-router-dom'
import '../src/assets/styles/main.scss'
import Interview from './pages/Interview.tsx'

export default function App() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/interview" element={<Interview />} />
            </Routes>
        </React.Fragment>
    )
}
