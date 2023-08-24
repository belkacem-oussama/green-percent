import React, { useState } from 'react'
import survey from '../assets/json/questions.json'
import ButtonComponent from '../components/Button.tsx'

interface Theme {
    name: string
    questions: Question[]
    options: string[]
}

interface Question {
    question: string[] | string
}

const Interview: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<number>(0)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)

    const theme = survey.themes[currentTheme]
    let themeQuestion = theme.questions[0].question[currentQuestion]

    //answers
    const options = survey.themes[6].options

    return (
        <div className="interview">
            <p>{themeQuestion}</p>
            {options.map((option, index) => (
                <ButtonComponent key={index} text={option} />
            ))}
        </div>
    )
}

export default Interview
