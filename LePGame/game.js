const question = document.querySelector('#question');
const choice = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBARfull = document.querySelector('#progressBARfull');


let currentQuestion = {}
let acceptingAnswers = true
var score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Ce este placa de baza?',
        choice1: 'componenta principală din interiorul carcasei',
        choice2: 'denumirea generică pentru orice tip de memorie de calculator',
        choice3: 'partea cea mai rezistenta a unei constructii',
        answer: 1,
    },
    {
        question: 'Unde sunt utilizate microprocesoarele?',
        choice1: 'in cuptoarele cu microunde',
        choice2: 'in arhitecturi de calcul: PC-uri, servere, etc',
        choice3: 'aeronave cosmice care orbiteaza in galaxie',
        answer: 2,
    },
    {
        question: 'Ce este RAM?',
        choice1: 'Dodge RAM Trucks',
        choice2: 'Read a Meme',
        choice3: 'Random Access Memory',
        answer: 3,
    },
    {
        question: 'Cum influenteaza memoria RAM un sistem informatic?',
        choice1: 'economiseste energia nefolosita',
        choice2: 'crescandu-i viteza si performantele in timp real',
        choice3: 'regenereaza turbina',
        answer: 2,
    },
    {
        question: 'Ce reprezinta hardware-ul?',
        choice1: 'partea fizica a unui sistem informatic',
        choice2: 'windows10',
        choice3: 'echipa tehnica dintr-o uzina',
        answer: 1,
    }
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}

getNewQuestions = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../htmlP/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBARfull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

    const questionIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choice.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true
}


choice.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()
        }, 1000)     
    
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()