/**
 * Write a program to calculate the sum of the digits of a given number.
 *
 * Solution: After dividing a number (e.g, 459) by 10, remainder gives the last digit(9) and
 * questiont gives the remaining number (45), repeate till
 */

const calcDigitSum = (number) => {
  let sum = 0;
  while (number >= 1) {
    sum += number % 10; // get the last digit
    number = Math.floor(number / 10); // remove the last digit from the number
  }
  return sum;
};

console.log(calcDigitSum(0));
console.log(calcDigitSum(1));
console.log(calcDigitSum(5));
console.log(calcDigitSum(100));
console.log(calcDigitSum(120));
console.log(calcDigitSum(178956));
console.log(calcDigitSum(495));
