import React, { useState } from 'react'
import survey from '../assets/json/questions.json'
import ButtonComponent from '../components/Button.tsx'
import '../assets/styles/pages/interview.scss'

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
    const [interviewFinished, setInterviewFinished] = useState(false)

    //themes
    const theme: Theme = survey.themes[currentTheme]

    console.log(theme)

    const themeName: string = theme.name
    const desiredTheme = survey.themes.find((theme) => theme.name === themeName)

    //questions
    const questionsByTheme: string[] = desiredTheme?.questions[0].question || []
    const currentQuestionText = questionsByTheme[currentQuestion]

    //answers
    const options: string[] = survey.themes[6].options

    //functions
    const handleInterview = () => {
        if (currentQuestion < questionsByTheme.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            if (currentTheme < 5) {
                setCurrentTheme(currentTheme + 1)
                setCurrentQuestion(0)
            } else {
                setInterviewFinished(!interviewFinished)
            }
        }
    }

    return interviewFinished ? (
        "Merci d'avoir répondu"
    ) : (
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
