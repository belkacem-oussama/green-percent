import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ButtonComponent from '../components/Button.tsx'

import '../assets/styles/pages/interview.scss'

import survey from '../assets/json/questions.json'

import earthLoader from '../assets/images/green-percent-earth.png'
import earthHappy from '../assets/images/green-percent-earth-happy.png'
import earthSad from '../assets/images/green-percent-earth-sad.png'

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
    const [interviewFinished, setInterviewFinished] = useState<boolean>(false)
    const [resultLoaded, setResultLoaded] = useState<boolean>(false)
    const [positiveResult, setPositiveResult] = useState<number>(0)
    const [negativeResult, setNegativeResult] = useState<number>(0)

    const [optionCounts, setOptionCounts] = useState<Record<string, number>>({
        Toujours: 0,
        Souvent: 0,
        Parfois: 0,
        Jamais: 0,
    })

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
    const handleStats = () => {
        const topResponse = optionCounts.Toujours
        const mediumResponse = optionCounts.Souvent
        const notToBadResponse = optionCounts.Parfois
        const badResponse = optionCounts.Jamais

        const questionsSum =
            topResponse + mediumResponse + notToBadResponse + badResponse

        const calculatePercentage = (response) =>
            (response / questionsSum) * 100

        const arrayPartCalc = [
            Math.round(calculatePercentage(topResponse)),
            Math.round(calculatePercentage(mediumResponse)),
            Math.round(calculatePercentage(notToBadResponse)),
            Math.round(calculatePercentage(badResponse)),
        ]

        localStorage.setItem(
            'goodResult',
            parseFloat(arrayPartCalc[0]) + parseFloat(arrayPartCalc[1])
        )
        localStorage.setItem(
            'badResult',
            parseFloat(arrayPartCalc[2]) + parseFloat(arrayPartCalc[3])
        )
    }

    const handleResults = () => {
        let GoodResultResultLocalStorage = parseFloat(
            localStorage.getItem('goodResult')
        )
        let BadResultResultLocalStorage = parseFloat(
            localStorage.getItem('badResult')
        )

        let maxValue = Math.max(
            GoodResultResultLocalStorage,
            BadResultResultLocalStorage
        )

        if (maxValue === GoodResultResultLocalStorage) {
            setPositiveResult(maxValue)
        } else {
            setNegativeResult(maxValue)
        }
    }

    const handleInterview = (e: React.MouseEvent<HTMLButtonElement>) => {
        const selectedOption: string = e.target.value
        setOptionCounts((prevCounts) => ({
            ...prevCounts,
            [selectedOption]: prevCounts[selectedOption] + 1,
        }))

        if (currentQuestion < questionsByTheme.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            if (currentTheme < 5) {
                setCurrentTheme(currentTheme + 1)
                setCurrentQuestion(0)
            } else {
                handleStats()
                setInterviewFinished(true)

                setTimeout(() => {
                    handleStats()
                    handleResults()
                    setInterviewFinished(false)
                    setResultLoaded(true)
                }, 5000)
            }
        }
    }

    let resultMessage: string = positiveResult
        ? "C'est plutôt pas mal !"
        : 'Pas ouf...'
    let resultImage: JSX.Element = positiveResult ? (
        <img src={earthHappy} className="logo" />
    ) : (
        <img src={earthSad} className="logo" />
    )

    return resultLoaded ? (
        <div className={`results ${positiveResult ? 'positive' : 'negative'}`}>
            <p className="result-image">{resultImage}</p>
            <p className="result-value">
                {positiveResult
                    ? `+ ${positiveResult.toFixed(2)}%`
                    : `- ${negativeResult.toFixed(2)}%`}
            </p>
            <p className="result-message">{resultMessage}</p>
            <Link to="/">
                <ButtonComponent text="Accueil" />
            </Link>
        </div>
    ) : interviewFinished ? (
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
