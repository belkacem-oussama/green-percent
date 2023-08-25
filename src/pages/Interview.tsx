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
    const handleInterview = (e) => {
        let result: number = 0
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
                setInterviewFinished(!interviewFinished)
            }
        }
    }

    let topResponse = optionCounts.Toujours
    let mediumResponse = optionCounts.Souvent
    let notToBadResponse = optionCounts.Parfois
    let badResponse = optionCounts.Jamais

    let questionsSum =
        topResponse + mediumResponse + notToBadResponse + badResponse

    let partCalcTop = (topResponse / questionsSum) * 100
    let partCalcMedium = (mediumResponse / questionsSum) * 100
    let partCalcNotToBad = (notToBadResponse / questionsSum) * 100
    let partCalcBad = (badResponse / questionsSum) * 100

    let arrayPartCalc = [
        Math.round(partCalcTop),
        Math.round(partCalcMedium),
        Math.round(partCalcNotToBad),
        Math.round(partCalcBad),
    ]

    console.log(arrayPartCalc)

    if (
        parseFloat(arrayPartCalc[0]) + parseFloat(arrayPartCalc[1]) >
        parseFloat(arrayPartCalc[2]) + parseFloat(arrayPartCalc[3])
    ) {
        console.log(
            'nice ! ' +
                (parseFloat(arrayPartCalc[0]) + parseFloat(arrayPartCalc[1])) +
                ' %'
        )
    } else {
        console.log(
            'pas nice ! ' +
                (parseFloat(arrayPartCalc[2]) + parseFloat(arrayPartCalc[3])) +
                ' %'
        )
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
