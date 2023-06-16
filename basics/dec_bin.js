/**
 *  Write a program to convert a decimal number to binary.
 *
 * Dividing the number by 2 will give the binary number.
 *
 * Steps:
 *  - Get remainder of number divided by 2 and store it in an array
 *  - Divide number by 2 to remove the last digit from the number
 *  - Repeat until number is 0
 *  - Reverse the array
 */

const decToBin = (number) => {
  const bin = [];
  let i = 0;

  while (number >= 1) {
    bin[i] = number % 2; // insert binary digit in the array
    number = Math.floor(number / 2); // remove last digit from number
    i++;
  }

  // print the binary representation in reverse order
  let binStr = ``;
  for (let j = i - 1; j >= 0; j--) {
    binStr += `${bin[j]} `;
  }
  return binStr;
};

console.log(decToBin(88));
console.log(decToBin(6));
console.log(decToBin(4));
console.log(decToBin(4874));
console.log(decToBin(52));
