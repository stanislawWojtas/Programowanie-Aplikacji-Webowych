const cardDataEmojis = {
	animals : [
	"🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
	"🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔",
	"🐧", "🐦", "🐤", "🦆", "🦅", "🦉", "🦇", "🐺",
	"🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞"
	],

	clothes : [
	"👚", "👕", "👖", "🧥", "🧢", "👗", "👔", "👙",
	"🥿", "👠", "👡", "👢", "🧦", "🧤", "🧣", "🎩",
	"🎓", "🧳", "👛", "👜", "💼", "🎒", "👝", "🕶️",
	"🥽", "🥾", "🩴", "🩱", "🩲", "🩳", "👘", "🥻"
	],

	food : [
	"🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇",
	"🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥",
	"🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️",
	"🌽", "🥕", "🧄", "🧅", "🥔", "🍠", "🥐", "🍞"
	]
}

// stan gry
const gameState = {
	hasFlippedCard: false,
	firstCard: null,
	secondCard: null,
	lockBoard: false,
	moves: 0,
	lockedPairs: 0,
	boardSize: null,
	seconds: 0,
	timerInterval: null // zeby nie było dwoch timerow na raz
}

// API adres
const API_URL = "https://api.jsonblob.com/019a9707-23a9-7474-b000-e74468bc2d9c";

const startingButton = document.querySelector('.start-button');
const board = document.querySelector('.game-board');
const movesCounter = document.querySelector('.moves-count')
const timer = document.querySelector('.time-count');
const pauseButton = document.querySelector('.pause-button');
const playAgainButtons = document.querySelectorAll('.restart-button');
const submitResultButton = document.querySelector('.submit-button');


const startGame = (boardSize, cardType) => {

	board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
	document.querySelector('.start-container').classList.add('hidden');
	document.querySelector('.game-container').classList.remove('hidden');
	gameState.boardSize = boardSize;
	

	// shuffle emotek żeby nie były wybierane zawsze te same
	const deck = shuffleCards(cardDataEmojis[cardType]).slice(0, boardSize*boardSize/2);
	let gameCards = [...deck, ...deck]; // duplicate cards for pairs

	gameCards = shuffleCards(gameCards);

	gameCards.forEach(card => {
		const cardElement = document.createElement('div');
		cardElement.classList.add('card');
		cardElement.innerHTML = `<div class="card-inner">
									<div class="card-front">?</div>
									<div class="card-back">${card}</div>
								</div>`;
		cardElement.addEventListener('click', handleCardClick);
		board.appendChild(cardElement);
	})
}

// tasowanie algorytmem Fisher-Yates
function shuffleCards(array){
	for(let i = array.length - 1; i > 0; i--){
		const j = Math.floor(Math.random() * (i+1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function handleCardClick(event){
	if(gameState.lockBoard) return;
	if(event.currentTarget === gameState.firstCard) return;
	const clickedCard = event.currentTarget;
	clickedCard.classList.add('flip'); // flip the card

	const resetBoardState = () => {
		gameState.firstCard = null;
		gameState.secondCard = null;
		gameState.hasFlippedCard = false;

		// jesli jest pauza to nie odblokowujemy planszy
		if(gameState.timerInterval !== null){
			gameState.lockBoard = false;
		}
		
	};

	const checkForWin = () => {
		if(gameState.lockedPairs === (gameState.boardSize**2)/2){
			setTimeout(() => {
				handleGameWin();
			}, 500);
		}
	};

	if (!gameState.hasFlippedCard) {
		gameState.firstCard = clickedCard;
		gameState.hasFlippedCard = true;
		return;
	}

	gameState.secondCard = clickedCard;
	gameState.lockBoard = true; // blokujemy plansze na chwile

	gameState.moves += 1;
	movesCounter.innerHTML = `<span>Moves: </span>${gameState.moves}`;
	// sprawdzamy czy karty sie zgadzaja
	const cardsMatch = gameState.firstCard.querySelector('.card-back').textContent 
	=== gameState.secondCard.querySelector('.card-back').textContent;

	if(cardsMatch){
		gameState.firstCard.removeEventListener('click', handleCardClick);
		gameState.secondCard.removeEventListener('click', handleCardClick);
		gameState.lockedPairs += 1;
		checkForWin();
		resetBoardState();
		return;
	}

	setTimeout(() => {
		gameState.firstCard.classList.remove("flip");
		gameState.secondCard.classList.remove("flip");
		resetBoardState();
	}, 1000);
};

const startTimer = () => {
	if(gameState.timerInterval) clearInterval(gameState.timerInterval);
	gameState.timerInterval = setInterval(() => {
		gameState.seconds += 1;
		timer.innerHTML = `<span>Time: </span>${gameState.seconds}s`;
	}, 1000);
};
const pauseTimer = () => {
	clearInterval(gameState.timerInterval);
	gameState.timerInterval = null;
}

const handleGameWin = () => {
	const finalMoves = gameState.moves;
	const finalTime = gameState.seconds;

	// reset game state
	gameState.firstCard = null;
	gameState.secondCard = null;
	gameState.hasFlippedCard = false;
	gameState.lockBoard = false;
	gameState.lockedPairs = 0;
	pauseTimer();

	movesCounter.innerHTML = `<span>Moves: </span>0`;
	timer.innerHTML = `<span>Time: </span>0s`;
	pauseButton.textContent = "Pause";

	

	board.innerHTML = '';
	document.querySelector('.game-container').classList.add('hidden');
	document.querySelector('.results-container').classList.remove('hidden');
	document.querySelector('.final-moves').innerHTML = `<span>Total Moves: </span> ${finalMoves}`;
	document.querySelector('.final-time').innerHTML = `<span>Total Time: </span> ${finalTime}s`;

};

// funkcja do wysylania wyniku do API
const handleResultSubmit = async () => {
	const playerName = document.querySelector('.player-name').value;
	if(playerName.trim() === ""){
		alert("Please enter your name before submitting the result.");
		return;
	}	

	submitResultButton.disabled = true;
	const resultData = await getHighScores();

	// sortowanie po ruchach, potem czasie
	if(gameState.boardSize === 4){
		resultData.ranking4x4.push({
			name: playerName,
			moves: gameState.moves,
			time: gameState.seconds
		})
		resultData.ranking4x4.sort((a,b) => {
			if(a.moves === b.moves){
				return a.time - b.time;
			}
			return a.moves - b.moves;
		})
	}else if(gameState.boardSize === 6){
		resultData.ranking6x6.push({
			name: playerName,
			moves: gameState.moves,
			time: gameState.seconds
		});
		resultData.ranking6x6.sort((a,b) => {
			if(a.moves === b.moves){
				return a.time - b.time;
			}
			return a.moves - b.moves;
		});
	}else if(gameState.boardSize === 8){
		resultData.ranking8x8.push({
			name: playerName,
			moves: gameState.moves,
			time: gameState.seconds
		});
		resultData.ranking8x8.sort((a,b) => {
			if(a.moves === b.moves){
				return a.time - b.time;
			}
			return a.moves - b.moves;
		});
	}else{
		alert("Unexpected board size. Cannot submit result.");
		return;
	}

	await submitHighScores(resultData);
	submitResultButton.disabled = false;
	printHighScores(resultData);
};

async function getHighScores() {
	try {
		const response = await fetch(API_URL);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const scores = await response.json();
		return scores;

	}catch (error) {
		console.error("Error fetching high scores:", error);
		return [];
	};
};

// wysłanie danych z powrotem do API
async function submitHighScores(updatedScores){
	try {
		await fetch(API_URL, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedScores)
		})
	} catch (error) {
		console.error("Error submitting high scores:", error);
	}
}

const printHighScores = (scoresData) => {
	['4','6','8'].forEach(size => {
		const listElement = document.querySelector(`.ranking-${size} ul`);
		listElement.innerHTML = '';

		const scoresList = scoresData[`ranking${size}x${size}`].slice(0,10); //top 10

		console.log(scoresList);
		if(scoresList.length === 0){
			listElement.innerHTML = '<li>No scores yet.</li>';
			return;
		}

		scoresList.forEach((score, index) => {
			const listItem = document.createElement('li');
			listItem.textContent = `${score.name} - Moves: ${score.moves}, Time: ${score.time}s`;
			listElement.appendChild(listItem);
		})
	});

	document.querySelector('.results-container').classList.add('hidden');
	document.querySelector('.ranking-container').classList.remove('hidden');
};


startingButton.addEventListener('click', (e) => {
	e.preventDefault();
	const boardSize = parseInt(document.getElementById('board-size').value);
	const cardType = document.getElementById('card-type').value;
	startGame(boardSize, cardType);
	startTimer();
})

pauseButton.addEventListener('click', () => {
	if(pauseButton.textContent === "Pause"){
		pauseTimer();
		pauseButton.textContent = "Resume";
		gameState.lockBoard = true;
	} else if(pauseButton.textContent === "Resume"){
		startTimer();
		pauseButton.textContent = "Pause";
		gameState.lockBoard = false;
	}else{
		alert("Unexpected button state. Please reload the game.");
	}
});

playAgainButtons.forEach(button => {
	button.addEventListener('click', () => {
		document.querySelector('.results-container').classList.add('hidden');
		document.querySelector('.start-container').classList.remove('hidden');
		if(!document.querySelector('.ranking-container').classList.contains('hidden')){
			document.querySelector('.ranking-container').classList.add('hidden');
		}
		gameState.moves = 0;
		gameState.seconds = 0;
		gameState.boardSize = null;
	});
});

submitResultButton.addEventListener('click', handleResultSubmit);


