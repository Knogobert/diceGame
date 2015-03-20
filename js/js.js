//diceGame script

function randomizer(bottom, top) {
	return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
}

var roundScore = 0;
var totalScore = 0;
var chancesLeft = 10;

function diceRoll(){
	var guess = document.getElementById('guess').value;
	if(guess >= 3 && guess <= 18 ){
		if(chancesLeft>0){
			var d1 = randomizer(1, 6);
			var d2 = randomizer(1, 6);
			var d3 = randomizer(1, 6);
			var d4 = randomizer(1, 6);
			document.getElementById('d1').innerHTML = "<p>"+d1+"</p>";
			document.getElementById('d2').innerHTML = d2;
			document.getElementById('d3').innerHTML = d3;
			document.getElementById('d4').innerHTML = d4;
			
			roundScore = 0;
			var diceSum = (d1+d2+d3);
			console.log("diceGame: The 3 dice sum is: "+diceSum);
			console.log("diceGame: The 4th die shows: "+d4);
			document.getElementById('diceSum').innerHTML = diceSum;
			
			if(guess==diceSum){
				roundScore = diceSum*d4;
				totalScore += roundScore;
				document.getElementById('roundScore').innerHTML = roundScore;
				document.getElementById('totalScore').innerHTML = totalScore;
				console.log("diceGame: Your score this round is: "+roundScore);
				console.log("diceGame: Correct guess! "+guess+" was right!");
			}else {
				document.getElementById('roundScore').innerHTML = roundScore;
				document.getElementById('totalScore').innerHTML = totalScore;
				console.log("diceGame: Incorrect guess, try again.");
			}
			chancesLeft--;
			document.getElementById('chancesLeft').innerHTML = chancesLeft;
			console.log("diceGame: You have "+chancesLeft+" chances left");
			scoreLog(diceSum,d4,roundScore,totalScore,chancesLeft,guess);
			if(chancesLeft==0){
				sendUserScore(sessionID,totalScore);
				document.getElementById('tryAgain').style.backgroundColor="#FE5000";
				document.getElementById('tryAgain').style.color="#FFF";
			}
		}else{
			errorMessage ('You have no chances left, try again', 'show');
		}
	}else{
		errorMessage ('Enter a number between 3 and 18', 'show');
	}
}

function resetScore(){
	totalScore = 0;
	roundScore = 0;
	chancesLeft = 10;
	document.getElementById('d1').innerHTML = '.';
	document.getElementById('d2').innerHTML = '..';
	document.getElementById('d3').innerHTML = '.:';
	document.getElementById('d4').innerHTML = '::';
	document.getElementById('diceSum').innerHTML = '0';
	document.getElementById('roundScore').innerHTML = '0';
	document.getElementById('totalScore').innerHTML = '0';
	document.getElementById('chancesLeft').innerHTML = 10;
	document.getElementById('scoreLog').innerHTML = '<h4>scoreLog</h4>';
}

// Images instead
// document.getElementsByTagName('img')[i].setAttribute('src', 'img/'+i+'.jpg');

// Score logging, creates an entry every time diceRoll() is run
function scoreLog(diceSum,d4,roundScore,totalScore,chancesLeft,guess){
	var resultThisRound = document.createElement('p');
	if(guess==diceSum){
		resultThisRound.setAttribute('style', 'color: #FE5000;');
	}
	resultThisRound.innerHTML = '<span>'+(chancesLeft+1)+'</span> You rolled: <span class="fat">'+diceSum+' x '+d4+'</span>, your score this round was: <span>'+roundScore+'</span> and your total score is: <span>'+totalScore+'</span>';
	document.getElementById('scoreLog').appendChild(resultThisRound);
}

// Error messaging, runs for 5 seconds
function errorMessage (error, showOrHide){
	document.getElementById('notification').classList.remove('hide');
	document.getElementById('notification').classList.remove('show');
	document.getElementById('notification').classList.add(showOrHide);
	document.getElementById('hidden-notification').classList.remove('hide');
	document.getElementById('hidden-notification').classList.remove('show');
	document.getElementById('hidden-notification').classList.add(showOrHide);
	document.getElementById('errorDisplay').innerHTML = error;
	
	setTimeout(function(){
		document.getElementById('notification').classList.add('hide');
		document.getElementById('notification').classList.remove('show');
		document.getElementById('hidden-notification').classList.add('hide');
		document.getElementById('hidden-notification').classList.remove('show');
		document.getElementById('errorDisplay').innerHTML = '';
	},5000);
	
	if(error.length>0){
		console.log('Error: '+error);
	}
}

function reportErrors(errors){
	var msg = "Please Enter Valid Data...\n";
	for (var i = 0; i<errors.length; i++) {
		var numError = i + 1;
		msg += "\n" + numError + ". " + errors[i];
		console.log(msg);
	}
	alert(msg);
}

// swaps between the Create User and Login 
function swap(showObject, hideObject) {
	document.getElementById(hideObject).classList.add('hide');
    document.getElementById(hideObject).classList.remove('show');
    
    document.getElementById(showObject).classList.add('show');
    document.getElementById(showObject).classList.remove('hide');
}

// For the Create User or Login buttons on the main page
function showUserInfo(showCreateOrLogin, hideCreateOrLogin){
	document.getElementById('popUpBG').classList.add('show');
	
	document.getElementById('userInfo'+hideCreateOrLogin).classList.add('hide');
    document.getElementById('userInfo'+hideCreateOrLogin).classList.remove('show');
    
	document.getElementById('userInfo'+showCreateOrLogin).classList.add('show');
	document.getElementById('userInfo'+showCreateOrLogin).classList.remove('hide');
}

//Checks the element if it has a certain class or not
function hasClass(elem, klass) {
    return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
}

function submitUserInfo(){
	if (hasClass(document.body.parentNode, "no-formvalidation")) {
		errorMessage ('You are not using a HTML5 form-validator', 'show');
		H5F.setup(document.getElementsByTagName('form'), {
			onSubmit:document.getElementById('popUpBG').classList.add('hide')
			//onInvalid: function (invalidInputElement) {}
		});
	}
}

/*
//Checks for the class "no-formvalidation"
if (hasClass(document.body.parentNode, "no-formvalidation")) {
    errorMessage ('You are not using a HTML5 form-validator', 'show');
    H5F.setup(document.getElementsByTagName('form'));
}*/

// AJAX request, works only on same server
function ajaxRequest(url, callback) {
    var XHR = null;
    if (XMLHttpRequest) {
		XHR = new XMLHttpRequest();
	} else {
		XHR = new ActiveXObject("Microsoft.XMLHTTP"); 
	}
	XHR.onreadystatechange = function () {
		if (XHR.readyState == 4 || XHR.readyState == "complete") {
			if (XHR.status == 200) {
				callback(XHR); 
			} else {
				alert("Server problems.");
			}
		}
	}
    XHR.open("GET", url, true);
    XHR.send(null);
}
function JSONPRequest(url) {
    var s = document.createElement('script');
    s.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(s);
}
function get(){
	ajaxRequest('data.txt', 'highscore');
}
// Validation
var checkName = /^[A-ZÅÄÖa-zåäö]{2,20}$/;
var checkEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i ;
var checkPassword =  /^[A-ZÅÄÖa-zåäö0-9!@#$%^&*()_]{6,32}$/;

function regvalidate(firstform){
	firstform.preventDefault();
	var firstname = document.getElementById("firstname").value;
	var lastname = document.getElementById("lastname").value;
	var email = document.getElementById("email").value;
	var password =  document.getElementById("password").value;
	
	console.log(password);
	var errors = [];

	if (!checkName.test(firstname)) {
		errors[errors.length] = "You didn't enter a correct first name";
	}
	if (!checkName.test(lastname)) {
		errors[errors.length] = "You didn't enter a correct last name";
	}
	if (!checkEmail.test(email)) {
		errors[errors.length] = "You didn't enter a correct e-mail";
	}
	if (!checkPassword.test(password)) {
		errors[errors.length] = "You didn't enter a correct password, at least 6 characters!";
	}

	if (errors.length > 0) {
		return false;
	}
	console.log('VALIDATION WORKS');
		return true;
}
//document.getElementById("userInfoCreate").addEventListener("submit", validate);

// ---------------- Checks if client has a sessionID and decides to show the user form or not. If there is a sessionID, the name is written out too. -----------------------
// Sets the sessionID to the variable session
var sessionID = localStorage.logSessionID;
var firstName = localStorage.firstName;
var lastName = localStorage.lastName;

if(sessionID==undefined){
	document.getElementById('popUpBG').classList.add('show');
	document.getElementById('userInfoLogin').classList.add('show');
    document.getElementById('userInfoLogin').classList.remove('hide');
    
    document.getElementById('createUserButton').classList.add('buttonOrange');
    document.getElementById('loginUserButton').classList.add('buttonOrange');
}else{userName();}

// Writes out user name
function userName(){
	//sessionID = localStorage.logSessionID;
	firstName = localStorage.firstName;
	lastName = localStorage.lastName;
	var userNameTag = document.createElement('h2');
	userNameTag.innerHTML = 'hello '+firstName+' '+lastName+'!';
	document.getElementById('personalWelcome').appendChild(userNameTag);
	
	document.getElementById('createUserButton').classList.remove('buttonOrange');
    document.getElementById('loginUserButton').classList.remove('buttonOrange');
}

// Create user
function createUser(e){
	e.preventDefault();
	var firstname = document.getElementById("fName").value;
	var lastname = document.getElementById("lName").value;
	var email = document.getElementById("eMail").value;
	var password =  document.getElementById("pass").value;
	
	JSONPRequest('http://edunet.cust.bluerange.se/dice/user/create.aspx?email='+email+'&pwd='+password+'&firstname='+firstname+'&lastname='+lastname+'&callback=createUserId');
	//var url= 'http://edunet.cust.bluerange.se/dice/user/create.aspx?email='+email+'&pwd='+password+'&firstname='+firstname+'&lastname='+lastname+'&callback=createUserId';
	console.log('Created user2');
	//ajaxRequest(url, createUserId);
}
	function createUserId(response){
		console.log(response);
		console.log(response.message);
		//var ans=JSON.parse(response.responseText); LÄGG TILL NÄR DU ANVÄNDER AJAX
	
		if (response.status==400){
			errorMessage ("Created a user!", 'show');
			localStorage.logSessionID = response.session; // Sets the session to localStorage.logSessionID etc.
			localStorage.firstName = response.user.firstName;
			localStorage.lastName = response.user.lastName;
			sessionID = localStorage.logSessionID;
			document.getElementById('popUpBG').classList.add('hide');
			document.getElementById('popUpBG').classList.remove('show');
			userName();// Writes out name
		}else if (response.status==200){
			errorMessage ("Couldn't successfully create a user but reached the server", 'show');
		}else {
			errorMessage ("Couldn't successfully create a user", 'show');
		}
		
	}
// When the forms submit button is clicked the function createUser is run
document.getElementById("userInfoCreate").addEventListener("submit", createUser, false);

// Login user
function loginUser(e){
	e.preventDefault();
	var email = document.getElementById("eMailLogin").value;
	var password =  document.getElementById("passLogin").value;
	JSONPRequest('http://edunet.cust.bluerange.se/dice/user/login.aspx?email='+email+'&pwd='+password+'&callback=loginUserId')
	//var url='http://edunet.cust.bluerange.se/dice/user/login.aspx?email='+email+'&pwd='+password+'&callback=loginUserId';
}
	function loginUserId(response){
		console.log(response);
		console.log(response.message);
		//var ans=JSON.parse(response.responseText); LÄGG TILL NÄR DU ANVÄNDER AJAX
	
		if (response.status==400){
			console.log("Successfully logged in user");
			localStorage.logSessionID = response.session;
			localStorage.firstName = response.user.firstName;
			localStorage.lastName = response.user.lastName;
			sessionID = localStorage.logSessionID;
			document.getElementById('popUpBG').classList.add('hide');
			document.getElementById('popUpBG').classList.remove('show');
			userName();// Writes out name
		}else if (response.status==200){
			errorMessage ("Couldn't successfully log in but reached the server", 'show');
		}else {
			errorMessage ("Couldn't successfully log in", 'show');
		}
	}

// When the forms submit button is clicked the function loginUser is run
document.getElementById("userInfoLogin").addEventListener("submit", loginUser, false);

// Adds users highscore to the leaderboards
function sendUserScore(sessionID,totalScore){
	if(sessionID!=undefined){
		JSONPRequest('http://edunet.cust.bluerange.se/dice/score/add.aspx?score='+totalScore+'&session='+sessionID+'&callback=addUserScore');// Change totalScore to a high number to "hack" the leaderboards
	}else{
		errorMessage ('Could not add your Highscore to the leaderboards, you are not signed in', 'show');
	}
}
	function addUserScore(data){
		if(data.message=="score saved"){
			errorMessage ('Your Highscore was added to the leaderboards', 'show');
		}else{
			errorMessage ('Could not add your Highscore to the leaderboards', 'show');
		}
	}

// UserScoreList gets data from server and writes it out.
var userScoreClicks=0;
var userScoreList=document.getElementById('userScoreList');
function getUserScore(sessionID){
	if(sessionID!=undefined&&userScoreClicks<1){
		userScoreList.innerHTML = "";
		JSONPRequest('http://edunet.cust.bluerange.se/dice/score/user.aspx?session='+sessionID+'&callback=writeUserScore');
		userScoreClicks++;
		setTimeout(function(){userScoreClicks=0},2000);
	}else if(userScoreClicks!=0){
		errorMessage ('Stop spamming dude!', 'show');
	}else{
		errorMessage ('Could not get your highscore on the leaderboards, you are not signed in', 'show');
	}
}
	function writeUserScore(data){
		for (var i=0;i<data.scores.length||i<data.scores[10];i++){
			
			var points=document.createElement('h6');
			points.innerHTML=data.scores[i].points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
			points.className="floatLeft";
			
			var timestamp=document.createElement('h6');
			timestamp.innerHTML=data.scores[i].timestamp;
			timestamp.className="floatRight";
			
			userScoreList.appendChild(points);
			userScoreList.appendChild(timestamp);
			}
	}
function removeUserScoreList(){
	userScoreList.innerHTML = "";
	userScoreClicks=0;
}

// Highscore List gets data from server and writes it out.
var highscoreClicks = 0;
var highscoreList=document.getElementById('highscoreList');
function getHighscore(){
	if (highscoreClicks<1){
		highscoreList.innerHTML="";
		JSONPRequest('http://edunet.cust.bluerange.se/dice/score/top.aspx?callback=writeHighscore');
		highscoreClicks++;
		setTimeout(function(){highscoreClicks=0},2000);
	}else if(highscoreClicks!=0){
		errorMessage ('Stop spamming dude!', 'show');
	}else{
		errorMessage ('Could not get the highscores on the leaderboards', 'show');
	}
}
	function writeHighscore(data){
		console.log(data);
		for (var i=0;i<data.scores.length;i++){
			var name= document.createElement('h5');
			name.innerHTML=data.scores[i].name;
			name.className="floatLeft";
			
			var points=document.createElement('h6');
			points.innerHTML=data.scores[i].points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
			points.className="floatLeft";
			
			var timestamp=document.createElement('h6');
			timestamp.innerHTML=data.scores[i].timestamp;
			timestamp.className="floatRight";
			
			highscoreList.appendChild(name);
			highscoreList.appendChild(points);
			highscoreList.appendChild(timestamp);
			}
	}
function removeHighscoreList(){
	highscoreList.innerHTML = "";
	highscoreClicks=0;
}