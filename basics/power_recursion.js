/**
 * Implement a program to calculate the power of a number using a recursive function.
 *
 * Edge cases: 
 * 1. num^0 = 1 
 * 2. num^1 = num
 * 
 * Example: 
  For 10^3 = 10 * 10 * 10 = 1000
  If power = 0 return 1
  Base case: If power = 1 return 10
  Recursive case: 10 * calcPower(3 - 1)

  calcPower(3) calls calcPower(2)
  calcPower(2) calls calcPower(1)
  calcPower(1) returns 10
  calcPower(2) = 10 * calcPower(1) = 10 * 10 = 100
  calcPower(3) = 10 * calcPower(2) = 10 * 100 = 1000
 */

const calcPower = (num, power) => {
  if (power == 0) return 1; // If power is 0, result is 1 e.g. 10^0 = 1
  else if (power == 1)
    return num; // Base Case: If power is 1, result is the number itself e.g. 10^1 = 10
  else return num * calcPower(num, power - 1); // Recursive Case: number * calcPower (power - 1)
};

console.log(calcPower(10, 3));
console.log(calcPower(6, 4));
console.log(calcPower(9, 0));
