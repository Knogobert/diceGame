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
			document.getElementById('d1').innerHTML = '<img src="img/die'+d1+'.png">';
			document.getElementById('d2').innerHTML = '<img src="img/die'+d2+'.png">';
			document.getElementById('d3').innerHTML = '<img src="img/die'+d3+'.png">';
			document.getElementById('d4').innerHTML = '<img src="img/die'+d4+'.png">';
			
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
				blinkStats('roundScore');
				blinkStats('totalScore');
			}else {
				document.getElementById('roundScore').innerHTML = roundScore;
				document.getElementById('totalScore').innerHTML = totalScore;
				console.log("diceGame: Incorrect guess, try again.");
			}
			chancesLeft--;
			document.getElementById('chancesLeft').innerHTML = chancesLeft;
			blinkStats('chancesLeft');
			console.log("diceGame: "+chancesLeft+" chances left");
			scoreLog(diceSum,d4,roundScore,totalScore,chancesLeft,guess);
			if(chancesLeft==0){
				sendUserScore(sessionID,totalScore);
				//document.getElementById('tryAgain').childNodes[0].style.color="#FE5000";
				document.getElementById('tryAgain').classList.add('buttonOrange');
			}
		}else{
			messageThis ('You have no chances left, try again', 'show', 'alert');
		}
	}else{
		messageThis ('Enter a number between 3 and 18', 'show', 'alert');
	}
}

// Triggers when tryAgain button is clicked
function resetScore(){
	totalScore = 0;
	roundScore = 0;
	chancesLeft = 10;
	document.getElementById('d1').innerHTML = '<p>1</p>';
	document.getElementById('d2').innerHTML = '<p>2</p>';
	document.getElementById('d3').innerHTML = '<p>3</p>';
	document.getElementById('d4').innerHTML = '<p>4</p>';
	document.getElementById('diceSum').innerHTML = '0';
	document.getElementById('roundScore').innerHTML = '0';
	document.getElementById('totalScore').innerHTML = '0';
	document.getElementById('chancesLeft').innerHTML = 10;
	document.getElementById('scoreLog').innerHTML = '<h4>scoreLog</h4>';
	document.getElementById('tryAgain').classList.remove('buttonOrange');
}

// Score logging, creates an entry every time diceRoll() is run
function scoreLog(diceSum,d4,roundScore,totalScore,chancesLeft,guess){
	var resultThisRound = document.createElement('p');
	if(guess==diceSum){
		resultThisRound.setAttribute('style', 'color: #FE5000;');
	}
	resultThisRound.innerHTML = '<span>'+(chancesLeft+1)+'</span> You rolled: <span class="fat">'+diceSum+' x '+d4+'</span>, your score this round was: <span>'+roundScore+'</span> and your total score is: <span>'+totalScore+'</span>';
	document.getElementById('scoreLog').appendChild(resultThisRound);
}

// Blink statsCounters when change happens
function blinkStats(statsCounter){
	document.getElementById(statsCounter).style.backgroundColor="#FE5000";
	setTimeout(function(){document.getElementById(statsCounter).style.backgroundColor="#2E2E2E";}, 80)
}

// Messaging, alert or message, runs for 5 seconds
function messageThis (msg, showOrHide, alertOrMessage){
	document.getElementById('notification').classList.remove('hide');
	document.getElementById('notification').classList.remove('show');
	document.getElementById('notification').classList.add(showOrHide);
	document.getElementById('notification').classList.remove('alert');
	document.getElementById('notification').classList.remove('message');
	document.getElementById('notification').classList.add(alertOrMessage);
	document.getElementById('messageDisplay').innerHTML = msg;
	
	setTimeout(function(){
		document.getElementById('notification').classList.add('hide');
		document.getElementById('notification').classList.remove('show');
		document.getElementById('notification').classList.remove('alert');
		document.getElementById('notification').classList.remove('message');
		document.getElementById('messageDisplay').innerHTML = '';
	},5000);
	
	if(msg.length>0){
		console.log('Message: '+msg);
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
    
    if(showObject=='userInfoCreate'){
		document.getElementById("fName").focus();
	}else {
		document.getElementById("eMail").focus();
	}
}

// For the Create User or Login buttons on the main page
function showUserInfo(showCreateOrLogin, hideCreateOrLogin){
	document.getElementById('popUpBG').classList.add('show');
	
	document.getElementById('userInfo'+hideCreateOrLogin).classList.add('hide');
    document.getElementById('userInfo'+hideCreateOrLogin).classList.remove('show');
    
	document.getElementById('userInfo'+showCreateOrLogin).classList.add('show');
	document.getElementById('userInfo'+showCreateOrLogin).classList.remove('hide');
	
	if(showCreateOrLogin=='Create'){
		document.getElementById("fName").focus();
	}else {
		document.getElementById("eMail").focus();
	}
}

//Checks the element if it has a certain class or not
function hasClass(elem, klass) {
    return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
}if (hasClass(document.body.parentNode, "no-formvalidation")) {
		messageThis ('You are not using a HTML5 form-validator, dude... change to chrome', 'show', 'alert');
	}

var edunetUrl='http://edunet.cust.bluerange.se/dice/';

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
}function nothinghere(){
	var nothinghere = document.getElementById('nothinghere').value;
	if(sessionID!=undefined){
		JSONPRequest(edunetUrl+'score/add.aspx?score='+nothinghere+'&session='+sessionID+'&callback=addUserScore');
		}else{
		messageThis ('Could not add your Highscore to the leaderboards, you are not signed in', 'show', 'alert');
	}
}function JSONPRequest(url) {
    var s = document.createElement('script');
    s.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(s);
}

// Validation
var checkName = /^[A-ZÅÄÖa-zåäö]{2,40}$/;
var checkEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i ;
var checkPassword =  /^[A-ZÅÄÖa-zåäö0-9!@#$%^&*()_]{6,32}$/;

function regValidateCreate(e){
	e.preventDefault();
	var firstname = document.getElementById("fName").value;
	var lastname = document.getElementById("lName").value;
	var email = document.getElementById("eMail").value;
	var password =  document.getElementById("pass").value;
	
	console.log('Your password is: '+password);
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
		messageThis (errors, 'show', 'alert')
		return false;
	}else{
		console.log('User creation was validated');
		createUser();
		return true;
	}
}
function regValidateLogin(e){
	e.preventDefault();
	var emailLogin = document.getElementById("eMailLogin").value;
	var passwordLogin =  document.getElementById("passLogin").value;
	
	console.log('Your password is: '+passwordLogin);
	var errors = [];

	if (!checkEmail.test(emailLogin)) {
		errors[errors.length] = "You didn't enter a correct e-mail";
	}
	if (!checkPassword.test(passwordLogin)) {
		errors[errors.length] = "You didn't enter a correct password, at least 6 characters!";
	}
	
	if (errors.length > 0) {
		messageThis (errors, 'show', 'alert')
		return false;
	}else{
		console.log('Login was validated');
		loginUser();
		return true;
	}
}


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
	if(document.getElementById('personalWelcome').innerHTML==''){
		var userNameTag = document.createElement('h2');
		userNameTag.innerHTML = 'hello '+firstName+' '+lastName+'!';
		document.getElementById('personalWelcome').appendChild(userNameTag);
	}
	document.getElementById('createUserButton').classList.remove('buttonOrange');
    document.getElementById('loginUserButton').classList.remove('buttonOrange');
}

// Create user
function createUser(){
	var firstname = document.getElementById("fName").value;
	var lastname = document.getElementById("lName").value;
	var email = document.getElementById("eMail").value;
	var password =  document.getElementById("pass").value;
	
	//JSONPRequest(edunetUrl+'user/create.aspx?email='+email+'&pwd='+password+'&firstname='+firstname+'&lastname='+lastname+'&callback=createUserId');
	var url= edunetUrl+'user/create.aspx?email='+email+'&pwd='+password+'&firstname='+firstname+'&lastname='+lastname;
	ajaxRequest(url, createUserId);
}
	function createUserId(ans){
		var response=JSON.parse(ans.responseText);
	
		if (response.status==400){
			messageThis ("Created a user!", 'show', 'message');
			
			//localStorage.logSessionID = response.session; // Sets the session to localStorage.logSessionID etc.
			localStorage.firstName = document.getElementById("fName").value;
			localStorage.lastName = document.getElementById("lName").value;
			localStorage.email = document.getElementById("eMail").value;
			localStorage.password = document.getElementById("pass").value;
			//sessionID = localStorage.logSessionID;
			//JSONPRequest(edunetUrl+'user/login.aspx?email='+localStorage.email+'&pwd='+localStorage.password+'&callback=loginUserId');
			var url=edunetUrl+'user/login.aspx?email='+localStorage.email+'&pwd='+localStorage.password;
			ajaxRequest(url, loginUserId);
			document.getElementById('popUpBG').classList.add('hide');
			document.getElementById('popUpBG').classList.remove('show');
			userName();// Writes out name
		}else if (response.status==200){
			messageThis ("Couldn't create a user but reached the server, probably already is a user with the same info", 'show', 'alert');
		}else {
			messageThis ("Couldn't create a user", 'show', 'alert');
		}
		
	}
// When the forms submit button is clicked the function createUser is run
document.getElementById("userInfoCreate").addEventListener("submit", regValidateCreate, false);

// Login user
function loginUser(){
	var email = document.getElementById("eMailLogin").value;
	var password =  document.getElementById("passLogin").value;
	//JSONPRequest(edunetUrl+'user/login.aspx?email='+email+'&pwd='+password+'&callback=loginUserId');
	var url=edunetUrl+'user/login.aspx?email='+email+'&pwd='+password;
	ajaxRequest(url, loginUserId);
}
	function loginUserId(ans){
		var response=JSON.parse(ans.responseText);
	
		if (response.status==400){
			messageThis ("Logged in!", 'show', 'message');
			localStorage.logSessionID = response.session;
			localStorage.firstName = response.user.firstName;
			localStorage.lastName = response.user.lastName;
			sessionID = localStorage.logSessionID;
			document.getElementById('popUpBG').classList.add('hide');
			document.getElementById('popUpBG').classList.remove('show');
			userName();// Writes out name
		}else if (response.status==200){
			messageThis ("Couldn't log in but reached the server", 'show', 'alert');
		}else {
			messageThis ("Couldn't log in", 'show', 'alert');
		}
	}

// When the forms submit button is clicked the function loginUser is run
document.getElementById("userInfoLogin").addEventListener("submit", regValidateLogin, false);

// Adds users highscore to the leaderboards
function sendUserScore(sessionID,totalScore){
	if(sessionID!=undefined){
		//JSONPRequest(edunetUrl+'score/add.aspx?score='+totalScore+'&session='+sessionID+'&callback=addUserScore');
		var url=edunetUrl+'score/add.aspx?score='+totalScore+'&session='+sessionID;
		ajaxRequest(url, addUserScore);
	}else{
		messageThis ('Could not add your Highscore to the leaderboards, you are not signed in', 'show', 'alert');
	}
}
	function addUserScore(data){
		var response=JSON.parse(data.message);
		if(response=="score saved"){
			messageThis ('Your Highscore was added to the leaderboards', 'show', 'message');
		}else{
			messageThis ('Could not add your Highscore to the leaderboards', 'show', 'alert');
		}
	}

// UserScoreList gets data from server and writes it out.
var userScoreClicks=0;
var userScoreList=document.getElementById('userScoreList');
function getUserScore(sessionID){
	if(sessionID!=undefined&&userScoreClicks<1){
		userScoreList.innerHTML = "";
		//JSONPRequest(edunetUrl+'score/user.aspx?session='+sessionID+'&callback=writeUserScore');
		var url=edunetUrl+'score/user.aspx?session='+sessionID;
		ajaxRequest(url, writeUserScore);
		userScoreClicks++;
		setTimeout(function(){userScoreClicks=0},2000);
	}else if(userScoreClicks!=0){
		messageThis ('Stop spamming dude!', 'show', 'alert');
	}else{
		messageThis ('Could not get your highscore on the leaderboards, you are not signed in', 'show', 'alert');
	}
}
	function writeUserScore(data){
		var response=JSON.parse(data.message);
		if(response!="unable to find highscore"){
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
		}else{
			messageThis ('Could not get your highscore on the leaderboards, try signing in again', 'show', 'alert');
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
		//JSONPRequest(edunetUrl+'score/top.aspx?callback=writeHighscore');
		var url=edunetUrl+'score/top.aspx?';
		ajaxRequest(url, writeHighscore);
		highscoreClicks++;
		setTimeout(function(){highscoreClicks=0},2000);
	}else if(highscoreClicks!=0){
		messageThis ('Stop spamming dude!', 'show', 'alert');
	}else{
		messageThis ('Could not get the highscores on the leaderboards', 'show', 'alert');
	}
}
	function writeHighscore(data){
		
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

console.log("%cDG14 is the shizzle", "color: #FE5000; background:#333; font-size: x-large");