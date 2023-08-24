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
    const [currentTheme, setCurrentTheme] = useState<number>(3)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)

    //questions
    const theme: Theme = survey.themes[currentTheme]
    const themeName: string = theme.name

    const desiredTheme = survey.themes.find((theme) => theme.name === themeName)
    const questionsByTheme = desiredTheme?.questions[0].question || []

    console.log(questionsByTheme)

    const question: Question = theme.questions[currentQuestion]

    const themeQuestion = Array.isArray(question.question)
        ? question.question[currentQuestion]
        : question.question

    //answers
    const options = survey.themes[6].options

    //functions
    const handleInterview = () => {}

    return (
        <div className="interview">
            <p>{themeQuestion}</p>
            {Array.isArray(question.question) &&
                options.map((option, index) => (
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
