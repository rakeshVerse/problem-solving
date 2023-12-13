'use strict';

/**
 * Steps:
 * - Calculate mid column (total columns must be an odd number)
 * - For front slash, first row + last column
 * - For back slash, row == col
 * - Draw diagonals only till row == mid column + 1
 */

const rows = 10;
const cols = 9;
const midCol = Math.ceil(cols / 2);
const frontSlash = 1 + cols; // first row + last column
let op = '';

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      col === 1 ||
      col === cols ||
      ((row === col || row + col === frontSlash) && row <= midCol + 1)
        ? '*'
        : ' ';
  }
  op += '\n';
}
console.log(op);
