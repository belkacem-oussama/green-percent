import React, { useState } from 'react'
import survey from '../assets/json/questions.json'
import ButtonComponent from '../components/Button.tsx'

interface Theme {
    name: string
    questions: Question[]
    options: string[]
}

interface Question {
    question: string[]
}

const Interview: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<number>(0)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)

    //themes
    const theme: Theme = survey.themes[currentTheme]
    const themeName: string = theme.name
    const desiredTheme = survey.themes.find((theme) => theme.name === themeName)

    //questions
    const questionsByTheme: string[] = desiredTheme?.questions[0].question || []
    const currentQuestionText = questionsByTheme[currentQuestion]

    //answers
    const options: string[] = survey.themes[6].options

    //functions
    const handleInterview = () => {}

    return (
        <div className="interview">
            <p>{currentQuestionText}</p>
            {options.map((option, index) => (
                <ButtonComponent
                    key={index}
                    text={option}
                    onClick={handleInterview}
                />
            ))}
        </div>
    )
}

export default Interview
