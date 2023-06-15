/**
 * Write a program to check whether a given number is a prime number or not.
 *
 * Prime Number:a whole number greater than 1 that cannot be exactly divided
 * by any whole number other than itself and 1 (e.g. 2, 3, 5, 7, 11).
 */

const primeNumber = (number) => {
  if (number > 1) {
    for (let i = 2; i < number; i++) {
      if (number % i == 0) return `not prime`;
    }
    return `prime`;
  } else return `not prime`;
};

console.log(primeNumber(1));
console.log(primeNumber(-3));
console.log(primeNumber(12));
console.log(primeNumber(23));
console.log(primeNumber(79));
console.log(primeNumber(11));
