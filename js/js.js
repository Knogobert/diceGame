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

var randomizer = randomizer (1, 6);

var chancesLeft = 10;

if (chancesLeft>0){
	function diceRoll (d1,d2,d3,d4,chancesLeft){
		for (; chancesLeft>=0 ; chancesLeft--) {
			var d1 = Math.floor( Math.random() * ( 1 + 6 - 1 ) ) + 1;
			var d2 = Math.floor( Math.random() * ( 1 + 6 - 1 ) ) + 1;
			var d3 = Math.floor( Math.random() * ( 1 + 6 - 1 ) ) + 1;
			var d4 = Math.floor( Math.random() * ( 1 + 6 - 1 ) ) + 1;
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
				var roundScore = diceSum*d4;
				document.getElementById('roundScore').innerHTML = roundScore;
				console.log("Your score this round is: "+roundScore);
				console.log("Correct guess! "+guess+" was right!");
			}else {
				var roundScore = 0;
				document.getElementById('roundScore').innerHTML = roundScore;
				console.log("Incorrect guess, try again.");
			}
			document.getElementById('chancesLeft').innerHTML = chancesLeft;
			console.log("You have "+chancesLeft+" chances left");
		}
	}
}else {
	console.log("Try Again!");
}
/*function diceRoll (d1, d2, d3){
	for (var i=0; i<dice.length-1; i++) {
	    console.log(Hej);
	}
}*/
