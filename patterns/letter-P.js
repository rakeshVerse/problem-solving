'use strict';

const rows = 7;
const cols = 7;
const midRow = Math.ceil(rows / 2);
let op = '';

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      row === 1 ||
      row === midRow ||
      col === 1 ||
      (col === cols && row <= midRow)
        ? '*'
        : ' ';
  }
  op += '\n';
}
console.log(op);
