'use strict';
const rows = 9;
const cols = 5;
const midRow = Math.ceil(rows / 2);
const midCol = Math.ceil(cols / 2);
const backslash = midRow - midCol;
const forwardslash = midRow + midCol;
let op = '';

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      col === midCol ||
      row + col === forwardslash ||
      row - col === backslash ||
      row - col === 1 - midCol ||
      row + col === midCol + rows
        ? '*'
        : ' ';
  }
  op += '\n';
}

console.log(op);
