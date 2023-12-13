'use strict';

const rows = 9;
const cols = 7;
const midRow = Math.ceil(rows / 2);
let op = '';

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      row === 1 || // first row
      row === midRow || // mid row
      row === rows - 1 || // second last row
      row === rows || // last row
      ((col === 1 || col === 2) && row < midRow) || // first and second col
      (col === cols && row > midRow) // last col
        ? '*'
        : ' ';
  }
  op += '\n';
}
console.log(op);
