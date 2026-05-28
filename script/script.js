// Faire le jeu du MEMORY : placer des paires d'images/cartes de même taille sur un plateau
// Le joueur clique sur une carte, ce qui l'affiche.
// Pour l'instant, on garde uniquement l'affichage simple des cartes.

// =================================
// 🌱 1. Sélection des éléments DOM
// =================================

const gameStarter = document.querySelector(".gameStarter");

const game = document.querySelector(".game");
const stats = document.querySelector(".stats");

const counter = document.querySelector(".counter");
const statsMoves = document.querySelector(".stat-value__moves")
const statsTime = document.querySelector(".stat-value__time")
const statsMatches = document.querySelector(".stat-value__matches")

const endGamePanel = document.querySelector(".endGamePanel");
const finalMoves = document.querySelector(".final-moves");
const finalTime = document.querySelector(".final-time");
const restartButton = document.querySelector(".restartButton");

const header = document.querySelector(".header");
const gameHeader = document.querySelector(".gameHeader");


const animals = ["🐵", "🦁", "🐯", "🐸", "🦜", "🐍", "🐘", "🦧", "🦒", "🦓", "🦛", "🐊"];
const totalPairs = animals.length;

// =================================
// 🧠 2. Variables globales / état
// =================================

let counterTotal = 0;
let cardsTurned = 0;
let matchCounter = 0;
let turnedCards = [];

let timerInterval;
let timerStarted = false;
let seconds = 0;


// =================================
// 🎊 3. Fonctions (logique métier)
// =================================

function gameStart() {
    header.style.display = "none";
    gameHeader.style.display = "flex";
    game.style.display = "grid";
    createBoard();
}

function compareCards(firstCard, secondCard, cardsArray) {
    const firstSymbol = firstCard.dataset.symbol;
    const secondSymbol = secondCard.dataset.symbol;
    
    if (firstSymbol !== secondSymbol){
        firstCard.classList.remove("active");
        secondCard.classList.remove("active");
    } else {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchCounter++
        statsMatches.textContent = matchCounter;
        if (matchCounter === totalPairs) {
            endGame()
        }
    }
    cardsArray.length = 0;
}

function gameTimer() {
    timerInterval = setInterval(function () {
        seconds++;
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        statsTime.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0");
        
    }, 1000);
}

function createCard(animalImage) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = animalImage;

    card.innerHTML = `
        <div class="up">?</div>
        <div class="down">${animalImage}</div>
    `;

    game.appendChild(card);
}


// fisher yates shuffle method ! 
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        const temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;
}


function createBoard() {
    const cardSymbols = [...animals, ...animals]; // spread operator pour "duppliquer le tableau sans creer un deuxieme tableau !"

    shuffleCards(cardSymbols);
    console.log(cardSymbols);

    for (let i = 0; i < cardSymbols.length; i++) {
        createCard(cardSymbols[i])
        
    }


}

function endGame() {
    console.log("You Win !");
    game.style.display = "none";
    gameHeader.style.display = "none";
    endGamePanel.style.display = "flex";
    
    finalMoves.textContent = counterTotal;
    clearInterval(timerInterval);
    finalTime.textContent = statsTime.textContent;
}

function restartGame() {
    counterTotal = 0;
    cardsTurned = 0;
    matchCounter = 0;
    turnedCards = [];
    
    timerStarted = false;
    seconds = 0;

    allCards.forEach(function(card) {
        card.classList.remove("matched");
        card.classList.remove("active");
    });

    endGamePanel.style.display = "none";

    statsMoves.textContent = counterTotal
    statsTime.textContent = "00:00"
    statsMatches.textContent = matchCounter
    game.innerHTML = "";
    gameStart()
}

// =================================
// 🧲 4. Événements (interactions)
// =================================

gameStarter.addEventListener("click", function () {
    gameStart();
});



game.addEventListener("click", function (event) {
    
    const card = event.target.closest(".card");
    if (!card) return;
    if(cardsTurned >= 2) return;
    if (card.classList.contains("active")) return;
    if (card.classList.contains("matched")) return;
    
    if (!timerStarted) {
        gameTimer();
        timerStarted = true;
    }
    
    
    card.classList.add("active");
    cardsTurned++
    counterTotal++
    statsMoves.textContent = counterTotal
    turnedCards.push(card);
    
    if (cardsTurned === 2) {
        setTimeout(function () {
            compareCards(turnedCards[0], turnedCards[1], turnedCards)
            
            cardsTurned = 0;
        }, 1000);
    }
});



restartButton.addEventListener("click", function(){
    restartGame()
})