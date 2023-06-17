/**
 * Factorial of 5 (5!) = 5 * 4 * 3 * 2 * 1 = 120
 */

const factorial = (num) => {
  if (num == 0 || num == 1)
    return 1; // Base case: if num is 0 or 1, factorial is 1
  else return num * factorial(num - 1);
};

console.log(factorial(5));
console.log(factorial(10));
