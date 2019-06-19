function roll_die( sides ){
	return Math.floor(Math.random() * (sides+1 - 1) + 1);
}

/////////////////////view////////////////////////

let Die = function( sides, div ){
	//works for now
	this.sides = sides;
	this.diceDiv = document.createElement('div');
	this.diceDiv.className = "die";
	this.diceDiv.innerHTML = 4;
	div.appendChild(this.diceDiv);
}

Die.prototype.roll = function(){
	let r = roll_die( this.sides );
	console.log(r);
	this.diceDiv.innerHTML = r;
	return r;
}

function getScore(arr){
	let total = 0;
	for(let i=0; i<arr.length; i++)
		total += arr[i].roll();
	return total;
}

function createDice(div){
	return new Array(new Die(4, div), new Die(6, div), new Die(8, div), new Die(10, div), new Die(12, div), new Die(20, div));
}

let p1Div = document.getElementById("p1").getElementsByClassName('dice')[0];
let p2Div = document.getElementById("p2").getElementsByClassName('dice')[0];

let player1 = {
	arr: createDice(p1Div),
	score: 0,
	wins: 0,
	isTurn: true
};

let player2 = {
	arr: createDice(p2Div),
	score: 0,
	wins: 0,
	isTurn: false
};


document.getElementById('p1Roll').onclick = function(){
	if(!player1.isTurn)
		return;
	player1.score = getScore(player1.arr);
	document.getElementById("p1Score").innerHTML = player1.score;
	player1.isTurn = false;
	player2.isTurn = true;
	p1Div.style.border = "none";
	p2Div.style.border = "thick solid #0000FF"; 
}


function resetValues(){
	player1.wins = 0;
	player2.wins = 0;
	document.getElementsByClassName('Wins')[0].innerHTML = "";
	document.getElementsByClassName('Wins')[1].innerHTML = "";
}

document.getElementById('p2Roll').onclick = function(){
	if(!player2.isTurn)
		return;

	player2.score = getScore(player2.arr);
	document.getElementById("p2Score").innerHTML = getScore(player2.arr);
	player1.isTurn = true;
	player2.isTurn = false;

	p2Div.style.border = "none";
	p1Div.style.border = "thick solid #0000FF"; 

	if(player1.score > player2.score){
		player1.wins++;
		document.getElementsByClassName("Wins")[0].innerHTML = player1.wins;
	} else{
		player2.wins++;
		document.getElementsByClassName("Wins")[1].innerHTML = player2.wins;
	}

	//Checks if there is a winner
	if(player1.wins > 2){
		alert("Player 1 Wins!");
		resetValues();
	} else if(player2.wins > 2){
		alert("Player 2 Wins!");
		resetValues();
	}
}