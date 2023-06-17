/**
 * Write a program to find the largest and smallest elements in an array.
 */

const min = (arr) => {
  let min = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (min > arr[i]) min = arr[i];
  }

  return min;
};

const max = (arr) => {
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (max < arr[i]) max = arr[i];
  }

  return max;
};

const arr1 = [23, 4, 5, 67, 90, 0];
const arr2 = [23, 6, 5, 67, 0, 0, 200, -200, 350];

console.log(min(arr1));
console.log(max(arr1));

console.log(min(arr2));
console.log(max(arr2));
