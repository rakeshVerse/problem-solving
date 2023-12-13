/**
 * Diagonal logic
 *
 * - for front slash, add row & column
 * - for back slash, substract row & column
 */

const rows = 7;
const cols = 7;
const rowMid = Math.ceil(rows / 2); // Claculate the mid row
const upperDiagonal = rowMid + 1; // mid row + 1st column (front slash)
const lowerDiagonal = rowMid - 1; // mid row - 1st column (back slash)
let op = '';

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      col === 1 || row + col === upperDiagonal || row - col === lowerDiagonal
        ? '*'
        : ' ';
  }
  op += '\n';
}

console.log(op);
