// DOM elements
const btnCheck = document.querySelector('.btn-check');
const btnPlay = document.querySelector('.btn-play');
const inputEl = document.querySelector('input');
const msgEl = document.querySelector('.msg');
const scoreEl = document.querySelector('.score span');
const highscoreEl = document.querySelector('.high-score span');
const bodyEl = document.querySelector('body');
const wonEl = document.querySelector('.guess p');

let myNum, score;
const init = () => {
  myNum = Math.trunc(Math.random() * 20 + 1); // My number
  console.log(myNum);
  score = 20; // Number of attempts
  scoreEl.textContent = score; // show initial score
  highscoreEl.textContent = localStorage.getItem('highscore') || 0;
};

init();

const displayMsg = type => {
  let msg;
  switch (type) {
    case 'high':
    case 'low':
      msg = `Too ${type.toUpperCase()}`;
      break;
    case 'correct':
      msg = `${type.toUpperCase()}!!!`;
      break;
    case 'over':
      msg = 'GAME OVER! What A looser ;)';
      break;
    case 'wrong':
      msg = 'Wrong Input! Number must be between 1-20.';
      break;
    default:
      break;
  }
  msgEl.textContent = msg;
};

const wrongGuessHandler = type => {
  // Display msg
  displayMsg(type);

  // Reduce score and display it
  score--;
  scoreEl.textContent = score;

  // If score is 0, game over
  if (score < 1) {
    // Display message
    displayMsg('over');

    // Display number
    wonEl.textContent = myNum;

    // Disable check button
    btnCheck.disabled = true;
  }
};

const rightGuessHandler = () => {
  // Display message
  displayMsg('correct');

  // Display number
  wonEl.textContent = myNum;

  // Disable check button
  btnCheck.disabled = true;

  // Change background color
  bodyEl.style.backgroundColor = '#74f474';

  /**
   * Highscore:
   * if highscore is stored in localStorage then update the highscore only if score > highscore
   * else set the score in localStorage as a highscore
   */
  const highscore = localStorage.getItem('highscore');

  // Set highscore for the first time
  if (!highscore) {
    localStorage.setItem('highscore', score);
  }

  // Update highscore if highscore < score
  if (highscore && highscore < score) {
    localStorage.setItem('highscore', score);
  }

  // Show highscore
  highscoreEl.textContent = localStorage.getItem('highscore');
};

// EVENTS

// Check
btnCheck.addEventListener('click', function () {
  const userInput = +inputEl.value;

  // Guard clauses
  if (userInput < 1 || userInput > 20) {
    displayMsg('wrong');
    return;
  }

  if (userInput > myNum) {
    wrongGuessHandler('high');
    return;
  }

  if (userInput < myNum) {
    wrongGuessHandler('low');
    return;
  }

  // when input === myNum
  rightGuessHandler();
});

// Play again
btnPlay.addEventListener('click', function () {
  inputEl.value = '';
  location.reload();
});
