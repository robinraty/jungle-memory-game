// Faire le jeu du MEMORY : placer des paires d'images/cartes de même taille sur un plateau
// Le joueur clique sur une carte, ce qui l'affiche.
// Pour l'instant, on garde uniquement l'affichage simple des cartes.

// =================================
// 🌱 1. Sélection des éléments DOM
// =================================

const gameStarter = document.querySelector(".gameStarter");
const game = document.querySelector(".game");
const counter = document.querySelector(".counter");
const stats = document.querySelector(".stats");
const statsMoves = document.querySelector(".stat-value__moves")
const statsTime = document.querySelector(".stat-value__time")
const statsMatches = document.querySelector(".stat-value__matches")


const header = document.querySelector(".header");
const gameHeader = document.querySelector(".gameHeader");

// =================================
// 🧠 2. Variables globales / état
// =================================

let counterTotal = 0;
let cardsTurned = 0;
let matchCounter = 0;
let turnedCards = [];

// =================================
// 🎊 3. Fonctions (logique métier)
// =================================

function gameStart() {
    header.style.display = "none";
    gameHeader.style.display = "flex";
    game.style.display = "grid";
}


function compareCards(firstCard, secondCard, cardsArray) {
    const firstSymbol = firstCard.dataset.symbol;
    const secondSymbol = secondCard.dataset.symbol;
    
    if (firstSymbol !== secondSymbol){
        firstCard.classList.remove("active");
        secondCard.classList.remove("active");
    } else {
    matchCounter++
    statsMatches.textContent = matchCounter;
    }
    cardsArray.length = 0;
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
    
    card.classList.add("active");
    cardsTurned++
    turnedCards.push(card);
    
    if (cardsTurned === 2) {
        setTimeout(function () {
            compareCards(turnedCards[0], turnedCards[1], turnedCards)
            
            cardsTurned = 0;
        }, 1000);
    }
    
});