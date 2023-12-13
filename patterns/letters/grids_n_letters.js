// for (let i = 1; i < 6; i += 2) {
//   console.log(i);
// }
// console.log('\n');

// for (let i = 5; i > 0; i -= 2) {
//   console.log(i);
// }

// let op = '';
// let j = 1,
//   k = 5;
// for (let i = 1; i < 6; i++) {
//   op += `${j} ${k} \n`;
//   j += 2;
//   k -= 2;
// }
// console.log(op);

// const max_row = 5;
// const max_col = 5;
// let op = '';
// for (let i = 1; i <= max_row; i++) {
//   for (let j = 1; j <= max_col; j++) {
//     op += `*${j !== max_col ? '_' : ''}`;
//   }
//   op += '\n';
// }
// console.log(op);

// let op = '';
// for (let i = 3; i <= 8; i++) {
//   for (let j = 1; j <= 8; j++) {
//     op += `${i}<${j} `;
//   }
//   op += '\n';
// }
// console.log(op);

// // Prints Y
// let op = '';
// const rows = 9,
//   cols = 9;
// const midRow = Math.ceil(cols / 2);
// const midCol = Math.ceil(cols / 2);
// const forwardSlash = cols + 1;

// for (let row = 1; row <= rows; row++) {
//   for (let col = 1; col <= cols; col++) {
//     op +=
//       ((row === col || row + col === forwardSlash) && row <= midRow) ||
//       (col === midCol && row > midRow)
//         ? '*'
//         : ' ';
//   }
//   op += '\n';
// }
// console.log(op);

// // Prints Z
// let op = '';
// const rows = 5;
// const cols = 5;
// const frontSlash = rows + 1;

// for (let row = 1; row <= rows; row++) {
//   for (let col = 1; col <= cols; col++)
//     op += row === 1 || row === rows || row + col === frontSlash ? '*' : ' ';

//   op += '\n';
// }
// console.log(op);

// // Prints V
// let op = '';
// const rows = 11;
// const cols = 11;
// const midCol = Math.ceil(cols / 2);
// const backSlash = rows - midCol;
// const frontSlash = rows + midCol;

// for (let row = 1; row <= rows; row++) {
//   for (let col = 1; col <= cols; col++) {
//     op += row - col === backSlash || row + col === frontSlash ? `*` : ' ';
//   }

//   op += '\n';
// }
// console.log(op);

// Prints W
let op = '';
const rows = 7;
const cols = 7;
const midCol = Math.ceil(cols / 2);
const backSlash = rows - 1;
const frontSlash = rows + 1;

for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    op +=
      col === 1 ||
      col === cols ||
      ((row + col === frontSlash || row === col) && row >= midCol)
        ? `*`
        : ' ';
  }
  op += '\n';
}
console.log(op);
