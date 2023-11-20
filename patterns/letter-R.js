'use strict';

/**
 * Steps
 *
 * Rows
 * - Draw 1st row till second last col
 * - Draw mid row from 2nd col to second last col
 *
 * Cols
 * - Draw 2nd col completely
 * - Draw second last col (cols -1) till mid row
 *
 * Diagonal
 * - Draw backslash from mid row
 *
 *
 */

const rows = 11;
const cols = 7;
const midRow = Math.ceil(rows / 2);
const backSlash = midRow - 2; // mid row + second column
let op = '';

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      (row === 1 && col !== cols) || // 1st row
      (row === midRow && col !== 1 && col !== cols) || // mid row
      col === 2 || // first col
      (col === cols - 1 && row <= midRow) || // last col
      (row - col === backSlash && col !== 1) // diagonal
        ? '*'
        : ' ';
  }
  op += '\n';
}
console.log(op);
