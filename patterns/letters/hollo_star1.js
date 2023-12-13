'use strict';
const rows = 7;
const cols = 5;
const midRow = Math.ceil(rows / 2);
const midCol = Math.ceil(cols / 2);
let op = '';

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      row === col || // backslash
      row + col === cols + 1 ||
      // forwardslash
      col === midCol || // middle col
      row === midCol // middle row
        ? '*'
        : ' ';
  }
  op += '\n';
}

console.log(op);
