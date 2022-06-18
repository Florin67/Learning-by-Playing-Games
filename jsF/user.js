function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function logout() {
	localStorage.removeItem("jwt");
	checklogin();
}

function checklogin() {
	if (localStorage.getItem("jwt") !== null) {
		document.getElementById('logged').style.display = "inline";
		document.getElementById('button').style.display = "none";
		document.getElementById('logged-user').innerHTML = parseJwt(localStorage.getItem("jwt")).data.username;
		checkscore();
	} else {
		document.getElementById('logged').style.display = "none";
		document.getElementById('button').style.display = "inline";
	}
}

function addUser() {
 var xhr = new XMLHttpRequest();
  var url = "../php/create.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
      var json = JSON.parse(xhr.responseText);
	  document.getElementById('form_message').innerHTML = json.message;
	  document.getElementById('form_message').style.display = "block";
  }
};
const user = document.getElementById('username').value;
const pass1 = document.getElementById('password1').value;
const pass2 = document.getElementById('password2').value;
if(!document.getElementById('username').checkValidity()) {
	document.getElementById('form_message').innerHTML = "Invalid Username";
	document.getElementById('form_message').style.display = "block";
}
else if (!document.getElementById('password1').checkValidity()) {
	document.getElementById('form_message').innerHTML = "Invalid Password";
	document.getElementById('form_message').style.display = "block";
}
else if( pass1 !== pass2 ) {
	document.getElementById('form_message').innerHTML = "Passwords don't match!";
	document.getElementById('form_message').style.display = "block";
}else {
	document.getElementById('username').value = '';
	const data = {username: user, password: pass1};
	xhr.send(JSON.stringify(data));
}
document.getElementById('password1').value = '';
document.getElementById('password2').value = '';

}


function authUser() {
 var xhr = new XMLHttpRequest();
  var url = "../php/login.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
      var json = JSON.parse(xhr.responseText);
	  if (json.jwt) {
		localStorage.setItem("jwt", json.jwt);
		window.location.replace("../index.html");
	}
	else {
		document.getElementById('form_message').innerHTML = json.message;
		document.getElementById('form_message').style.display = "block";
	}
  }
};
const pass = document.getElementById('password').value;
const user = document.getElementById('username').value;
document.getElementById('password').value = '';
document.getElementById('username').value = '';
const data = {username: user, password: pass};
xhr.send(JSON.stringify(data));

}

function checkscore() {
	var xhr = new XMLHttpRequest();
	var url = "http://localhost/Learning-by-Playing-Games-main/php/score.php";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 401) {
		localStorage.removeItem("jwt");
		checklogin();
	}
	if (xhr.readyState == 4 && xhr.status == 200) {
		var json = JSON.parse(xhr.responseText);
		document.getElementById('logtext').innerHTML = 'Score: ' + json.score;
	}
	};
	const data = {jwt: localStorage.getItem("jwt")};
	xhr.send(JSON.stringify(data));
}

function loadLeaderboard() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", '../php/leaderboard.php', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
	if(xhr.status == 200) {
	  var div = document.getElementById('leaderboard2');
	  var board = div.parentElement;
      if (div !== null) {
          div.remove();
      }
      var json = JSON.parse(xhr.responseText);
      var div = document.createElement("tbody");
      div.setAttribute("id", "leaderboard2");
      //div.innerHTML = '';
      board.appendChild(div);
	  var i = 1;
	  for (const element of json.records) {
         var div2 = document.createElement("tr");
         let str = '<td class="rankL">';
         str = str + i + '</td><td class="nicknameL">' + element.username + '</td><td class="spL">' + element.score + '</td><td class="gamesL">' + element.played_matches + '</td>';
         div2.innerHTML = str;
         div.appendChild(div2);
		 i = i + 1;
      }
	}
	
  }
};
xhr.send();
}

function read(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
	if(xhr.status == 200) {
	  var div = document.getElementById('leaderboard');
	  var board = div.parentElement;
      if (div !== null) {
          div.remove();
      }
      var json = JSON.parse(xhr.responseText);
      var div = document.createElement("tbody");
      div.setAttribute("id", "leaderboard");
      //div.innerHTML = '';
      board.appendChild(div);
	  var i = 1;
	  for (const element of json.records) {
         var div2 = document.createElement("tr");
         let str = '<td class="rank">';
         str = str + i + '</td><td class="nickname">' + element.username + '</td><td class="sp">' + element.score + '</td>';
         div2.innerHTML = str;
         div.appendChild(div2);
		 i = i + 1;
      }
	}
	
  }
 
};
xhr.send();
}





