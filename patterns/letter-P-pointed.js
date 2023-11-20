'use strict';

/**
 * Steps:
 * - Calc mid col
 *
 * - Back slash, row == col
 * - Draw back slash till row <= mid col
 *
 * - Front slash, first row + last column
 * - Draw front slash from row > mid col
 */

const rows = 10;
const cols = 7;
const midCol = Math.ceil(cols / 2);
const frontSlash = 1 + cols; // first row + last column
let op = '';

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      col === 1 ||
      (row === col && row <= midCol) ||
      (row + col === frontSlash && row > midCol)
        ? '*'
        : ' ';
  }

  op += '\n';
}

console.log(op);
