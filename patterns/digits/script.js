let row;
let col;
let rows;
let cols;
let midRow;
let midCol;

const container = document.getElementById('container');

/**
 *
 * @param {Object} expr Function that returns Boolean value based on given params
 */
const printPattern = expr => {
  let op = '';

  const div = document.createElement('div');

  for (row = 1; row <= rows; row++) {
    for (col = 1; col <= cols; col++) {
      op += expr(row, col) ? '*' : '&nbsp;&nbsp;';
    }

    op += '<br>';
  }

  div.innerHTML = op;
  container.appendChild(div);
  container.insertAdjacentElement('afterbegin', div);
};

/**
 * Generate a Pattern for given digit
 * @param {Number} digit Digit to be printed
 */
const getDigitExpr = digit => {
  let expr = '';
  switch (digit) {
    case 0:
      expr = (row, col) =>
        col === 1 || col === cols || row === 1 || row === rows;
      break;
    case 1:
      const oneFrontSlash = midCol + 1;
      expr = (row, col) =>
        col === midCol ||
        (row + col === oneFrontSlash && row <= midRow) ||
        row === rows;
      break;
    case 2:
      expr = (row, col) =>
        (col === 1 && row > midRow) ||
        (col === cols && row <= midRow) ||
        row === 1 ||
        row === rows ||
        row === midRow;
      break;
    case 3:
      expr = (row, col) =>
        col === cols ||
        row === 1 ||
        row === rows ||
        (row === midRow && col > 2);
      break;
    case 4:
      expr = (row, col) =>
        (col === 1 && row <= midRow) || col === cols || row === midRow;
      break;
    case 5:
      expr = (row, col) =>
        (col === 1 && row < midRow) ||
        (col === cols && row > midRow) ||
        row === 1 ||
        row === midRow ||
        row === rows;
      break;
    case 6:
      expr = (row, col) =>
        col === 1 ||
        (col === cols && row > midRow) ||
        row === 1 ||
        row === rows ||
        row === midRow;
      break;
    case 7:
      expr = (row, col) =>
        row === 1 || col === cols || (row === midRow && col > midCol);
      break;
    case 8:
      expr = (row, col) =>
        col === 1 ||
        col === cols ||
        row === 1 ||
        row === rows ||
        row === midRow;
      break;
    case 9:
      expr = (row, col) =>
        (col === 1 && row < midRow) ||
        col === cols ||
        row === 1 ||
        row === rows ||
        row === midRow;
      break;
    default:
  }

  printPattern(expr);
};

// Form submit
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const validateDate = inputs =>
    inputs.every(input => isFinite(input) && input > 0);

  // Get user input
  const userInput = new FormData(document.getElementById('form'));
  let num = +userInput.get('num');
  rows = +userInput.get('rows');
  cols = +userInput.get('cols');

  // Validate user input
  if (!validateDate([num, rows, cols])) {
    alert('Invalid input! All the inputs must be positive numbers.');
    return;
  }

  // Claculate mid-row & mid-col values
  midCol = Math.ceil(cols / 2);
  midRow = Math.ceil(rows / 2);

  // Empty container
  container.textContent = '';

  // Extract digits from Number
  while (num !== 0) {
    getDigitExpr(num % 10);
    num = Math.floor(num / 10);
  }
});
