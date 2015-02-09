//diceGame script

function randomizer (bottom, top) {
	return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}

var roundScore = 0;
var totalScore = 0;
var chancesLeft = 10;

function diceRoll (d1,d2,d3,d4){
	var guess = new Number(document.getElementById('guess').value);
	if ( guess >= 3 && guess <= 18 ){
		if (chancesLeft>0){
			var d1 = randomizer (1, 6);
			var d2 = randomizer (1, 6);
			var d3 = randomizer (1, 6);
			var d4 = randomizer (1, 6);
			document.getElementById('d1').innerHTML = d1;
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
			errorMessage ('Try again please', 'show');
		}
	}else{
		errorMessage ('Enter a number between 3 and 18 dumb-schmuck!!', 'show');
	}
}

function resetScore(){
	totalScore = 0;
	roundScore = 0;
	chancesLeft = 10;
	document.getElementById('d1').innerHTML = '';
	document.getElementById('d2').innerHTML = '';
	document.getElementById('d3').innerHTML = '';
	document.getElementById('d4').innerHTML = '';
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
	var divName = document.getElementsByClassName(this).parentNode.nodeName;
	if (showOrHide=='hide'){
		divName.classList.remove('show');
		divName.classList.add('hide');
		console.log("Hides element");
	}else{
		divName.classList.remove('hide');
		divName.classList.add('show');
		console.log("Shows element");
	}
}

// Temporary HTML class selection, WIP not working yet
/*
var formValidationChecker2 = document.getElementsByTagName('html')[0].classList;
var formValidationChecker = document.body.parentNode.classList('no-formvalidation');
if (formValidationChecker=='no-formvalidation') {
	errorMessage ('You are not using a HTML5 form-validator', 'show');
	console.log('You are not using a HTML5 form-validator');
}*/

function hasClass(elem, klass) {
    return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
}

if (hasClass(document.body.parentNode, "no-formvalidation")) {
    errorMessage ('You are not using a HTML5 form-validator', 'show');
}