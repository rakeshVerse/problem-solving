const rows = 7;
const cols = 7;
const rowMid = Math.ceil(rows / 2);
const colMid = Math.ceil(cols / 2);
let op = '';

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      row == 1 ||
      (col == colMid && row != rows) ||
      (row == rows && col < colMid && col > 1) ||
      (row >= rowMid && row != rows && col == 1)
        ? '*'
        : ' ';
  }
  op += '\n';
}

console.log(op);
