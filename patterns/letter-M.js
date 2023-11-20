'use strict';

/**
 * Steps:
 * - Calculate mid column (total columns must be an odd number)
 * - Draw diagonals only till row == mid column
 */

const rows = 7;
const cols = 7;
const midCol = Math.ceil(cols / 2);
const frontSlash = 1 + cols; // 1st row + cols (5) = 6
let op = '';

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      col === 1 ||
      col === cols ||
      ((row === col || row + col === frontSlash) && row <= midCol)
        ? '*'
        : ' ';
  }
  op += '\n';
}

console.log(op);
