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

let p1Div = document.getElementById("p1");
let p2Div = document.getElementById("p2");
let player1 = {arr: createDice(p1Div)};
let player2 = {arr: createDice(p2Div)};

document.getElementById('p1Roll').onclick = function(){
	document.getElementById("p1Score").innerHTML = getScore(player1.arr);
}

document.getElementById('p2Roll').onclick = function(){
	document.getElementById("p2Score").innerHTML = getScore(player2.arr);
}