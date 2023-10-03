// const transaction = [120, 457, -99, 487, -58, -97, 45, -98, 789, -8, -897];
const transaction = [120, 457, 0, 0];

// find max item
const max = transaction.reduce((acc, num) => (acc < num ? num : acc), 0);
console.log(max);

// find min item
const min = transaction.reduce((acc, num) => (acc < num ? acc : num), 0);
console.log(min);
