/**
 * Write a program to calculate the factorial of a given number using recursion.
 * 
 * Edge cases:
 * 1. 0! = 1
 * 2. 1! = 1
 * 
 * Example: 
  Factorial of 3 (3!) = 3 * 2 * 1 = 6
  Base case: Base case: if num is 0 or 1, factorial is 1
  Recursive case: num * factorial(num - 1)

  factorial(3) calls factorial(2)
  factorial(2) calls factorial(1)
  factorial(1) returns 1
  factorial(2) = 2 * factorial(1) = 2 * 1 = 2
  factorial(3) = 3 * factorial(2) = 3 * 2 = 6
 */

const factorial = (num) => {
  if (num == 0 || num == 1)
    return 1; // Base case: if num is 0 or 1, factorial is 1
  else return num * factorial(num - 1);
};

console.log(factorial(5));
console.log(factorial(10));
