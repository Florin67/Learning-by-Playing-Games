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
        question: 'Sistemul informatic este alcatuit din:',
        choice1: 'calculatoare, programe, utilizatori, retele de calculatoare',
        choice2: 'totalitatea informatorilor de pe un sector',
        choice3: 'CIA',
        answer: 1,
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
    },
    {
        question: 'Ce este un monitor?',
        choice1: 'supervizorul dintr-ul Mall',
        choice2: 'TV',
        choice3: 'un ecran monocrom sau color de diferite dimensiuni',
        answer: 3,
    },
    {
        question: 'Unde mai pot fi gasite placile grafice?',
        choice1: 'in Altex',
        choice2: 'pot fi integrate in procesor',
        choice3: 'intrebarea este gresita',
        answer: 2,
    },
    {
        question: 'Care este diferenta dintre monitor si TV?',
        choice1: 'diferenta consta in marimile acestora',
        choice2: 'undele electromagnetice emise',
        choice3: 'monitoarele nu receptioneaza semnalele tv',
        answer: 3,
    },
    {
        question: 'Peripheral Component Interconnect Express cu abrevierea oficiala PCI-e a fost construit in anul:',
        choice1: '2004',
        choice2: '2005',
        choice3: '2001',
        answer: 1,
    },
    {
        question: 'Ce reprezinta unitatea optica?',
        choice1: 'un fascicul proeminent de lumina',
        choice2: 'unitatea de citire sau scriere a datelor',
        choice3: 'lentile de vedere',
        answer: 2,
    },
    {
        question: 'Care este primul software rulat de calculator?',
        choice1: 'software-ul de testare al memoriei RAM',
        choice2: 'BIOS-ul',
        choice3: 'windows-ul',
        answer: 2,
    },
    {
        question: 'Care este rolul driverelor?',
        choice1: 'actioneaza ca o interfata intre între o anumita componenta hardware si software',
        choice2: 'imbunatateste performanta calculatorului',
        choice3: 'racirea calculatorului',
        answer: 1,
    },
    {
        question: 'Care sunt diferitele întreruperi într-un sistem cu microprocesor?',
        choice1: 'pene de curent',
        choice2: 'intreruperi interne, externe si ale software-ului',
        choice3: 'intreruperea continuitatii fluxului de date',
        answer: 2,
    },
    {
        question: 'Datele pot fi alcatuite din:',
        choice1: 'numere, litere, imagini, ...',
        choice2: 'cantitatea de MB alocata unei cartele',
        choice3: 'ZZ / LL / AAAA',
        answer: 1,
    },
    {
        question: 'Care sunt componentele comune ale unui microprocesor?',
        choice1: 'Unitățile de control, unitățile I / O',
        choice2: 'memoria cache, ALU și registrele',
        choice3: 'toate variantele sunt corecte',
        answer: 3,
    },
    {
        question: 'Structura de principiu a unui sistem de calcul contine urmatoarele componente principale:',
        choice1: 'unitatea de intrarea, unitatea de iesire',
        choice2: 'unitatea aritmetico-logica, unitatea de comanda si control',
        choice3: 'unitatea de memorie interna, unitatea aritmetico-logica',
        answer: 2,
    },
    {
        question: 'Care este componenta care gestioneaza procesele ce au loc?',
        choice1: 'placa de baza',
        choice2: 'microprocesorul',
        choice3: 'placa grafica',
        answer: 2,
    },
    {
        question: 'Care este componenta care face legatura intre microprocesor si memoria interna?',
        choice1: 'placa de baza',
        choice2: 'microprocesorul',
        choice3: 'placa grafica',
        answer: 1,
    },
    {
        question: 'In categoria echipamentelor periferice se pot enumera:',
        choice1: 'monitor, imprimanta',
        choice2: 'hard discul, mouse-ul',
        choice3: 'tastatura, placa grafica',
        answer: 1,
    },
    {
        question: 'Dintre variantele urmatoare, dispozitivele de memorare sunt:',
        choice1: 'monitorul si tastatura',
        choice2: 'hard discul si floppy discul',
        choice3: 'floppy discul si microprocesorul',
        answer: 2,
    },
    {
        question: 'Care din urmatoarele componente, nu face parte din componentele hard discului:',
        choice1: 'capul de citire-scriere',
        choice2: 'brat mobil la capatul caruia este fixat capul de citire-scriere',
        choice3: 'conectori de alimentare si de magistrala',
        answer: 3,
    },
    {
        question: 'Varianta corecta de organizare a informatilor pe disc este:',
        choice1: 'fisiere sistem si fisiere de aplicatii',
        choice2: 'fisiere si foldere',
        choice3: 'folder de sistem si fisiere de aplicatii',
        answer: 2,
    },
    {
        question: 'Care dintre afirmatiile urmatoare, referitoare la fisiere este incorecta:',
        choice1: 'fisierele au o extensie formata din 3 litere',
        choice2: 'extensia fisierului indica numele acestuia',
        choice3: 'fisierele reprezinta colectii organizate de date cu un anumit format',
        answer: 2,
    },
    {
        question: 'In cadrul carei componente a ferestrei se afla numele aplicatiei',
        choice1: 'bara de titlu',
        choice2: 'spatiul de lucru al ferestrei',
        choice3: 'barele de defilare',
        answer: 1,
    }
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 5
const SCORE_POINTS_NEG = -5

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
        else{
            incrementScore(SCORE_POINTS_NEG)
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