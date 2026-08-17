const grid = document.getElementById('memory-grid');
const movesDisplay = document.getElementById('moves');
const winMessage = document.getElementById('win-message');
const finalMoves = document.getElementById('final-moves');

// Cute emojis for the memory game
const emojis = ['🌸', '🧸', '🎀', '💖', '✨', '🍓', '☁️', '🦋'];
let cardsArray = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matchedPairs = 0;

function initGame() {
    // Clear grid
    grid.innerHTML = '';
    
    // Create pairs and shuffle
    cardsArray = [...emojis, ...emojis];
    cardsArray.sort(() => 0.5 - Math.random());
    
    // Reset stats
    moves = 0;
    matchedPairs = 0;
    movesDisplay.innerText = moves;
    winMessage.classList.remove('show');
    
    // Generate cards
    cardsArray.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.emoji = emoji;
        
        const front = document.createElement('div');
        front.classList.add('memory-card-front');
        front.innerText = emoji;
        
        const back = document.createElement('div');
        back.classList.add('memory-card-back');
        back.innerText = '❓';
        
        card.appendChild(front);
        card.appendChild(back);
        
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second click
    secondCard = this;
    moves++;
    movesDisplay.innerText = moves;
    
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

    if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === emojis.length) {
            setTimeout(showWinMessage, 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    // Add matched class instead of using opacity to avoid breaking 3D context
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function showWinMessage() {
    finalMoves.innerText = moves;
    winMessage.classList.add('show');
}

function restartGame() {
    // Flip all cards back first for effect if resetting while won
    const allCards = document.querySelectorAll('.memory-card');
    allCards.forEach(card => card.classList.remove('flip'));
    
    setTimeout(() => {
        initGame();
    }, 300);
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);
