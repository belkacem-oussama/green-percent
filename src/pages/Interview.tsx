import React, { useState } from 'react'
import survey from '../assets/json/questions.json'
import ButtonComponent from '../components/Button.tsx'
import earthLoader from '../assets/images/green-percent-earth.png'
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
    const themeName: string = theme.name
    const desiredTheme = survey.themes.find((theme) => theme.name === themeName)

    //questions
    const questionsByTheme: string[] = desiredTheme?.questions[0].question || []
    const currentQuestionText = questionsByTheme[currentQuestion]

    //answers
    const options: string[] = survey.themes[6].options

    //functions
    const handleInterview = (e) => {
        console.log(e.target.value)
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
        <div className="loader">
            <img src={earthLoader} />
            <p className="tagline">
                Vos résultats sont en cours de calculs ...
            </p>
        </div>
    ) : (
        <div className="interview">
            <p className="tagline">{currentQuestionText}</p>
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
