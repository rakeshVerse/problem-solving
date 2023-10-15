const unsorted = [4, 1, 5, 8, -9, 3, 0];

// Logic:
// To keep the order return negative number
// To switch the order return positive number

// Ascending
unsorted.sort(function (first, second) {
  if (first > second) return 1; // switch order
  if (first < second) return -1; // keep order
});
console.log(unsorted);

// Descending
unsorted.sort(function (first, second) {
  if (first > second) return -1; // keep order
  if (first < second) return 1; // switch order
});

// Alternate way
// Ascending
unsorted.sort((a, b) => a - b);
console.log(unsorted);

// Descending
unsorted.sort((a, b) => b - a);
console.log(unsorted);
