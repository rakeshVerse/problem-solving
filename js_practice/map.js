const accounts = [
  {
    owner: 'John Doe',
    transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
  },
  {
    owner: 'Thomas Davis',
    transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  },
  {
    owner: 'Steven Williams',
    transactions: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  },
  {
    owner: 'Sarah Smith',
    transactions: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  },
];

const totBal = accounts
  .flatMap(acc => acc.transactions)
  .filter(amt => amt > 0)
  .reduce((sum, amt) => sum + amt, 0);
console.log(totBal);

console.log([3, 4, 4, [3, [2]]].flat(2));
