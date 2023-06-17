/**
 * Factorial of 5 (5!) = 5 * 4 * 3 * 2 * 1 = 120
 */

const factorial = (number) => {
  let fact = 1;

  // loop through given number to 1
  for (let i = number; i > 1; i--) {
    fact *= i;
    console.log(fact);
  }

  return fact;
};

console.log(factorial(5));
console.log(factorial(4));
console.log(factorial(10));
console.log(factorial(6));
