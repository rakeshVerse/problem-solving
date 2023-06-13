/**
 * Given an array 'a' of integers and a positive integer 'k', find the number of pairs
 * where, i < j and sum of i and j is evenly divisible by 'k'
 *
 * Example:
 * I/p: a = [1, 3, 2, 6, 1, 2] and k = 3
 * O/p: 5
 *
 * Explanation:
 * (0, 2) = 3
 * (0, 5) = 3
 * (1, 3) = 9
 * (2, 4) = 3
 * (4, 5) = 3
 *
 */

const a = [1, 3, 2, 6, 1, 2];
const k = 3;
let pairs = 0;

for (let i = 0; i < a.length; i++)
  for (let j = i + 1; j < a.length; j++) (a[i] + a[j]) % k === 0 ? pairs++ : "";

console.log(pairs);
