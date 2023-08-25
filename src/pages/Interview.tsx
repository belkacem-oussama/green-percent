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
    const [interviewFinished, setInterviewFinished] = useState<boolean>(false)
    const [resultLoaded, setResultLoaded] = useState(false)
    const [optionCounts, setOptionCounts] = useState<Object>({
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
            console.log('+ ' + maxValue)
        } else {
            console.log('- ' + maxValue)
        }
    }

    const handleInterview = (e) => {
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
    return resultLoaded ? (
        <div className="results">
            <p></p>
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
