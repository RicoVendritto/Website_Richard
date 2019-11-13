let cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	}, {
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	}, {
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	}, {
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];
let cardsInPlay = [];
let controlArray = [];

let resetCardsInPlay = () => {
	cardsInPlay = [];
}

let resetControlArray = () => {
	controlArray = [];
}

//Sound effect created with the assistance of repl.it user: -Aloeb83 at: https://repl.it/talk/learn/Coin-Flipper-with-Sound-using-HTML-and-JavaScript/8003
//Soujd effect is royalty free download from Freesound.org  user: f4ngy at: https://freesound.org/people/f4ngy/sounds/240776/
let cardFlipSound = new Audio("resources/cardflip.wav");

let checkControl = () => {
	if (controlArray[0] === controlArray[1]) {
		alert("Please select another card");
		controlArray.pop();
		cardsInPlay.pop();
	} else if (cardsInPlay.length > 2) {
		alert("A new game will be created");
		resetBoard();
		resetCardsInPlay();
		resetControlArray();
	} else {
		cardFlipSound.play();
		setTimeout(checkForMatch, 100); //This solved below issues, decreased timeout from 500ms to 100ms
	}
}

//Sometimes the browser executes this function twice with the same set of cards and increases the score with 2 points instead of 1 -> I cannot figure out why. 
//Only tested with Chrome. I suspect it has to do with the delay function.
let checkForMatch = () => {
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0] === cardsInPlay[1]) {
			alert("You Found A Match!");
			increaseScore();
		} else {
			alert("Sorry Mate! Try Again!");
		}
	} 
}


function flipCard() {
	let cardId = this.getAttribute("data");
	//console.log(cardId);
	this.setAttribute("src", cards[cardId].cardImage);
	console.log(`User flipped ${cards[cardId].rank}`);
	cardsInPlay.push(cards[cardId].rank);
	controlArray.push(cards[cardId].cardImage);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	checkControl();
	//setTimeout(checkControl, 500); //included delay as I want the card to flip before the alert
}


//Please explain why this type of function does not work with the 'this' getAttribute function
/*main.js:77 Uncaught TypeError: this.getAttribute is not a function
    at HTMLImageElement.flipCard (main.js:77)*/
/*
//I think I understand the difference. The bottom one (arrow function) is a function expression wherea the top one is a function declaration. 
//Hence, is not affected by the top-to-bottom flow of code (hoisting?)
let flipCard = () => {
	let cardId = this.getAttribute("data");
	//console.log(cardId);
	this.setAttribute("src", cards[cardId].cardImage);
	console.log(`User flipped ${cards[cardId].rank}`);
	cardsInPlay.push(cards[cardId].rank);
	controlArray.push(cards[cardId].cardImage);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	checkControl();
	//setTimeout(checkControl, 500); //included delay as I want the card to flip before the alert
}
*/

let resetBoard = () => {
	let nodes = document.getElementsByClassName("cards");
	for (i = 0; i < nodes.length; i++) {
		nodes[i].setAttribute("src", "images/back.png");
	}
	resetCardsInPlay();
	resetControlArray();

}

let resetScore = () => {
	resetBoard();
	document.getElementById("score").value = "";
	resetCardsInPlay();
	resetControlArray();
}

let increaseScore = () => {
	let field = document.getElementById("score");
	let score = +field.value;
	field.value = score + 1;
}

let createBoard = () => {
	for (i = 0; i < cards.length; i++) {
		let cardElement = document.createElement("img");
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data", i);
		cardElement.addEventListener("click", flipCard);
		cardElement.setAttribute("class", "cards");
		cardElement.setAttribute("title", "playcard");
		cardElement.setAttribute("alt", "playcar");
		document.getElementById("game-board").appendChild(cardElement);
	}
}

createBoard();
document.getElementById("next").onclick = resetBoard;
document.getElementById("clear").onclick = resetScore;