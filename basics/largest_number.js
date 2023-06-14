/**
 * Write a program to find the largest among three numbers.
 */

const largestNumber = (num1, num2, num3) => {
  if (num1 > num2 && num1 > num3) return num1;
  else if (num2 > num3) return num2;
  else return num3;
};

console.log(largestNumber(15, 0, 89));
console.log(largestNumber(15, 99, 89));
console.log(largestNumber(155, 99, 89));
