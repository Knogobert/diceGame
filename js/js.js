//Dice-Game script
/*var die1 = new Number(document.getElementById('d1').value);,
	die2 = new Number(document.getElementById('d2').value);,
	die3 = new Number(document.getElementById('d3').value);,
	die4 = new Number(document.getElementById('d4').value);,
	dice = [];
*/

function randomizer (bottom, top) {
	return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}
var roundScore = 0;
var chancesLeft = 10;

function diceRoll (d1,d2,d3,d4){
	var totalScore =+ roundScore;
	if (chancesLeft>0){
		var d1 = randomizer (1, 2);
		var d2 = randomizer (1, 2);
		var d3 = randomizer (1, 2);
		var d4 = randomizer (1, 2);
		guess = new Number(document.getElementById('guess').value);
		document.getElementById('d1').innerHTML = d1;
		document.getElementById('d2').innerHTML = d2;
		document.getElementById('d3').innerHTML = d3;
		document.getElementById('d4').innerHTML = d4;
		
		var diceSum = (d1+d2+d3);
		console.log("The 3 dice sum is: "+diceSum);
		console.log("The 4th die shows: "+d4);
		document.getElementById('diceSum').innerHTML = diceSum;
		
		if (guess==diceSum){
			roundScore = diceSum*d4;
			document.getElementById('roundScore').innerHTML = roundScore;
			document.getElementById('totalScore').innerHTML = totalScore;
			console.log("Your score this round is: "+roundScore);
			console.log("Correct guess! "+guess+" was right!");
		}else {
			document.getElementById('roundScore').innerHTML = roundScore;
			document.getElementById('totalScore').innerHTML = totalScore;
			console.log("Incorrect guess, try again.");
		}
		chancesLeft--;
		document.getElementById('chancesLeft').innerHTML = chancesLeft;
		console.log("You have "+chancesLeft+" chances left");
	}else{
		errorMessage ("Try Again pleeez!");
	}
}

function errorMessage (error){
	document.getElementById('errorDisplay').innerHTML = error;
	console.log(error);
}

function resetScore (){
	totalScore = 0;
	roundScore = 0;
}
