//diceGame script

function randomizer (bottom, top) {
	return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}

var roundScore = 0;
var totalScore = 0;
var chancesLeft = 10;

function diceRoll (){
	var guess = new Number(document.getElementById('guess').value);
	if ( guess >= 3 && guess <= 18 ){
		if (chancesLeft>0){
			var d1 = randomizer (1, 6);
			var d2 = randomizer (1, 6);
			var d3 = randomizer (1, 6);
			var d4 = randomizer (1, 6);
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

// General visibility classes, WIP
function close (showOrHide){
	var divName = element.getElementsByTagName(this)[0].nodeName;
	if (showOrHide=='hide'){
		divName.classList.remove('show');
		divName.classList.add('hide');
		console.log("Hiding element");
	}else{
		divName.classList.remove('hide');
		divName.classList.add('show');
		console.log("Showing element");
	}
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
				alert("fel på servern");
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
// Create user
function createUser(){
	//temporary
	JSONPRequest('http://edunet.cust.bluerange.se/dice/user/create.aspx?callback=createUserId');
	if (clickCount<1){
		
		JSONPRequest('http://edunet.cust.bluerange.se/dice/user/create.aspx?callback=createUserId');
		clickCount++;
	}else{
		alert("STOP Clicken!")
	}
}
// Login user
function loginUser(){
	if (clickCount<1){
		JSONPRequest('http://edunet.cust.bluerange.se/dice/user/login.aspx?callback=loginUserId');
		clickCount++;
	}else{
		alert("STOP Clicken!")
	}
}
function createUserId(response){

console.log(response);

//response.status
	return false;

	if (response.status==400){
		console.log("USER CREATED!");
	}else if (response.status==200){
		console.log("USER NOT CREATED!");
	}else {
		console.log("This is the else statement");
	}
}
// Highscore List gets data from server and writes it out.
var clickCount = 0;
var highscoreList=document.getElementById('highscoreList');
function getHighscore(){
	if (clickCount<1){
		JSONPRequest('http://edunet.cust.bluerange.se/dice/score/top.aspx?callback=highscore');
		clickCount++;
	}else{
		alert("STOP Clicken!")
	}
}
function removeHighscoreList(){
	if (clickCount!=0){
		highscoreList.innerHTML = "";
		clickCount=0;
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




