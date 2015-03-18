//diceGame script

function randomizer(bottom, top) {
	return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
}

var roundScore = 0;
var totalScore = 0;
var chancesLeft = 10;

function diceRoll(){
	var guess = new Number(document.getElementById('guess').value);
	if ( guess >= 3 && guess <= 18 ){
		if (chancesLeft>0){
			var d1 = randomizer(1, 6);
			var d2 = randomizer(1, 6);
			var d3 = randomizer(1, 6);
			var d4 = randomizer(1, 6);
			document.getElementById('d1').innerHTML = "<p>"+d1+"</p>";
			document.getElementById('d2').innerHTML = d2;
			document.getElementById('d3').innerHTML = d3;
			document.getElementById('d4').innerHTML = d4;
			
			var diceSum = (d1+d2+d3);
			console.log("diceGame: The 3 dice sum is: "+diceSum);
			console.log("diceGame: The 4th die shows: "+d4);
			document.getElementById('diceSum').innerHTML = diceSum;
					
			if (guess==diceSum){
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
		}else{
			errorMessage ('Try again', 'show');
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
}

// Error messaging
function errorMessage (error, showOrHide){
	document.getElementById('notification').classList.remove('hide');
	document.getElementById('notification').classList.remove('show');
	document.getElementById('notification').classList.add(showOrHide);
	document.getElementById('hidden-notification').classList.remove('hide');
	document.getElementById('hidden-notification').classList.remove('show');
	document.getElementById('hidden-notification').classList.add(showOrHide);
	document.getElementById('errorDisplay').innerHTML = error;
	if(error==''){
		console.log(error);
	}else{
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

// General visibility classes, WIP
function scruub(that, showOrHide){
	console.log('AOISHFLKASFNAL');
	var divName = that.parentNode.parentNode;
	var divParent = that.parentNode;
	if(showOrHide=='hide'){
		divName.classList.remove('show');
		divName.classList.add('hide');
		divParent.classList.remove('show');
		divParent.classList.add('hide');
		console.log("Hiding element");
	}else{
		divName.classList.remove('hide');
		divName.classList.add('show');
		divParent.classList.remove('hide');
		divParent.classList.add('show');
		console.log("Showing element");
	}
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

// Create user
var createClicks = 0;
function createUser(e){
	e.preventDefault();
	console.log('Created user');
	
	if (createClicks<1){		
		var firstname = document.getElementById("fName").value;
		var lastname = document.getElementById("lName").value;
		var email = document.getElementById("eMail").value;
		var password =  document.getElementById("pass").value;
		
		JSONPRequest('http://edunet.cust.bluerange.se/dice/user/create.aspx?email='+email+'&pwd='+password+'&firstname='+firstname+'&lastname='+lastname+'&callback=createUserId');
		//var url= 'http://edunet.cust.bluerange.se/dice/user/create.aspx?email='+email+'&pwd='+password+'&firstname='+firstname+'&lastname='+lastname+'&callback=createUserId';
		console.log('Created user2');
		//ajaxRequest(url, createUserId);
		
		createClicks++;
	}else{
		alert("STOP Clicken!")
	}
}
	function createUserId(response){
	
		console.log(response);
		console.log(response.message);
		//var ans=JSON.parse(response.responseText); LÄGG TILL NÄR DU ANVÄNDER AJAX
		var ans=response.message;
		/*if(ans=="user created"){
			alert('User created');
		}else if (ans=="failed to create user"){
			alert('Failed to create user');
			return false;
		}
		else{
			alert('User already exists');
			return false;
		}*/
	
		if (response.status==400){
			console.log("USER CREATED!");
		}else if (response.status==200){
			console.log("USER NOT CREATED!");
		}else {
			console.log("This is the else statement");
		}
		
	}
// When the forms submit button is clicked the function createUser is run
	document.getElementById("userInfoCreate").addEventListener("submit", createUser, false);

// Login user
var loginClicks = 0;
function loginUser(e){
	e.preventDefault();
	if (loginClicks<1){
		var email = document.getElementById("eMailLogin").value;
		var password =  document.getElementById("passLogin").value;
		JSONPRequest('http://edunet.cust.bluerange.se/dice/user/login.aspx?email='+email+'&pwd='+password+'&callback=loginUserId')
		//var url='http://edunet.cust.bluerange.se/dice/user/login.aspx?email='+email+'&pwd='+password+'&callback=loginUserId';
		loginClicks++;
	}else{
		alert("STOP Clicken!")
	}
}
	function loginUserId(response){
	
		console.log(response);
		console.log(response.message);
		//var ans=JSON.parse(response.responseText); LÄGG TILL NÄR DU ANVÄNDER AJAX
		var ans=response.message;
		/*if(ans.message=="user created"){
			alert('User logged in');
		}
		else{
			alert('User already exists');
		}
		*/
		//response.status
		//return false;
	
		if (response.status==400){
			console.log("Successfully logged in user");
		}else if (response.status==200){
			console.log("Couldn't successfully log in user");
		}else {
			console.log("This is the else statement");
		}
	}

// When the forms submit button is clicked the function loginUser is run
	document.getElementById("userInfoLogin").addEventListener("submit", loginUser, false);

//Detta är en funktion som skickar iväg användardetaljer
/*function createuser(e){
	e.preventDefault();
	var firstname = document.getElementById("firstname").value;
	var surname = document.getElementById("surname").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	
	ajaxRequest ("http://edunet.cust.bluerange.se/dice/user/create.aspx?email="+email+"&pwd="+password+"&firstname="+firstname+"&lastname="+surname, createusercallback);
}*/

// Highscore List gets data from server and writes it out.
var highscoreClicks = 0;
var highscoreList=document.getElementById('highscoreList');
function getHighscore(){
	if (highscoreClicks<1){
		JSONPRequest('http://edunet.cust.bluerange.se/dice/score/top.aspx?callback=highscore');
		highscoreClicks++;
	}else{
		alert("STOP Clicken!")
	}
}
function removeHighscoreList(){
	if (highscoreClicks!=0){
		highscoreList.innerHTML = "";
		highscoreClicks=0;
	}else{
		alert("STOP Clicken!")
	}
}
function highscore(data){
	console.log(data);
	for (var i=0;i<data.scores.length;i++){
		var name= document.createElement('h5');
		name.innerHTML=data.scores[i].name;
		name.className="floatLeft";
		
		var point=document.createElement('h6');
		point.innerHTML=data.scores[i].points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
		point.className="floatLeft";
		
		var timestamp=document.createElement('h6');
		timestamp.innerHTML=data.scores[i].timestamp;
		timestamp.className="floatRight";
		
		highscoreList.appendChild(name);
		highscoreList.appendChild(point);
		highscoreList.appendChild(timestamp);
		}
}




