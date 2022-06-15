const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const scoreText = document.querySelector('#score');

finalScore.innerText = localStorage.getItem('mostRecentScore');