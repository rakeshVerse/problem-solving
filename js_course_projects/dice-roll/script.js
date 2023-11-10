// DOM

// Btns
const rollBtn = document.querySelector('.roll');
const holdBtn = document.querySelector('.hold');
const resetBtn = document.querySelector('.reset');

// Msgs
const diceEl = document.querySelector('.dice');
const firstPlayerTotalScoreEl = document.querySelector('.tot-score');
const secondPlayerTotalScoreEl = document.querySelector('.tot-score-2');
const firstPlayerCurrentScoreEl = document.querySelector('.curr-score');
const secondPlayerCurrentScoreEl = document.querySelector('.curr-score-2');
const winningScoreEl = document.querySelector('h1 span');
const playersCardEl = document.querySelectorAll('.player');

// INIT
let currentScore = 0;
let currentPlayer = 0; // 0: player one, 1: player two
let firstPlayerTotalScore = 0;
let secondPlayerTotalScore = 0;
let dice;
const winningScore = 20;
winningScoreEl.textContent = winningScore;

// FUNCTIONS

const switchPlayer = () => {
  // Switch player
  currentPlayer = !currentPlayer;

  // Display switch
  playersCardEl.forEach(player => {
    player.classList.toggle('current-player');
    player.classList.toggle('other-player');
  });
};

const displayCurrentScore = () =>
  currentPlayer
    ? (secondPlayerCurrentScoreEl.textContent = currentScore)
    : (firstPlayerCurrentScoreEl.textContent = currentScore);

// EVENTS

rollBtn.addEventListener('click', function () {
  // Generate a random no. between 1-6
  dice = Math.trunc(Math.random() * 6 + 1);
  console.log(dice);

  // Display the no./Dice
  diceEl.classList.remove('hidden');
  diceEl.setAttribute('src', `images/${dice}.png`);

  // If dice is 1, then
  if (dice === 1) {
    // Set current score to 0
    currentScore = 0;

    // Display current score
    displayCurrentScore();

    // Switch player
    switchPlayer();
  } else {
    // Add dice to current score
    currentScore += dice;

    // Display current score
    displayCurrentScore();
  }
});

holdBtn.addEventListener('click', function () {
  // Add current score to total score of current player and display it
  if (currentPlayer) {
    // Player 2
    secondPlayerTotalScore += currentScore;
    secondPlayerTotalScoreEl.textContent = secondPlayerTotalScore;
  } else {
    // Player 1
    firstPlayerTotalScore += currentScore;
    firstPlayerTotalScoreEl.textContent = firstPlayerTotalScore;
  }

  // Set current score to 0 and display it
  currentScore = 0;
  displayCurrentScore();

  // If, total score is >= winningScore, current player wins
  if (
    firstPlayerTotalScore >= winningScore ||
    secondPlayerTotalScore >= winningScore
  ) {
    playersCardEl[currentPlayer ? 1 : 0].classList.add('winner');
    rollBtn.disabled = true;
    holdBtn.disabled = true;
    return;
  }

  // If total score is < winningScore, switch player
  switchPlayer();
});

resetBtn.addEventListener('click', function () {
  location.reload();
});
