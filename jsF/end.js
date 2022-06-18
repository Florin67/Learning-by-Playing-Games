const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const scoreText = document.querySelector('#score');

if(localStorage.getItem('mostRecentScore') !== null) {
	finalScore.innerText = localStorage.getItem('mostRecentScore');

	var xhr = new XMLHttpRequest();
	var url = "../php/update.php";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 401) {
		localStorage.removeItem("jwt");
		window.location.replace("./play.html");
	}
	};
	const data = {jwt: localStorage.getItem("jwt"), score: localStorage.getItem('mostRecentScore')};
	xhr.send(JSON.stringify(data));
	localStorage.removeItem('mostRecentScore');
}
else {
	window.location.replace("./play.html");
}

