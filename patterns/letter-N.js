'use strict';

const rows = 7;
const cols = 5;
const midRow = Math.ceil(rows / 2);
let op = '';

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      col === 1 ||
      col === cols ||
      row === col || // first backslash
      row - col === 1 || // second backslash
      row - col === 2 // third backslash
        ? '*'
        : ' ';
  }
  op += '\n';
}

console.log(op);
