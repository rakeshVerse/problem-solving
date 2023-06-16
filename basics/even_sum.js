/**
 * Write a program to calculate the sum of all even numbers
 * between two given numbers using the modulo operator.
 *
 * Steps:
 *  - loop through first number to last (excluding first and last number)
 *  - If even number then add to sum variable
 *
 */

const evenSum = (num1, num2) => {
  let sum = 0;
  for (let i = num1 + 1; i < num2; i++) {
    if (i % 2 == 0) sum += i;
  }

  return sum;
};

console.log(evenSum(4, 24));
