const accounts = [
  {
    owner: 'John Doe',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
  },
  {
    owner: 'Thomas Lee',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  },
  {
    owner: 'Steven Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  },
  {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  },
];

// TASKS

// I. How much has been deposited in total in the bank
const totDeposite = accounts
  .flatMap(acc => acc.movements)
  .reduce((tot, amt) => (amt > 0 ? tot + amt : tot), 0);
console.log(totDeposite); // 25180

// using forEach()
let totalDeposit = 0;
accounts.forEach(acc => {
  acc.movements.forEach(amt => {
    if (amt > 0) totalDeposit += amt;
  });
});
console.log(totalDeposit); // 25180

// using reduce()
const totDepBal = accounts.reduce((bal, acc) => {
  const dep = acc.movements.reduce(
    (tot, amt) => (amt > 0 ? tot + amt : tot),
    0
  );
  return bal + dep;
}, 0);
console.log(totDepBal); // 25180

// II. How many deposits there have been in the bank with at least 1000 USD (length)
const deposite1k = accounts
  .flatMap(acc => acc.movements)
  .filter(amt => amt >= 1000).length;
console.log(deposite1k); // 6

// alternate solution
const deposite1klen = accounts
  .flatMap(acc => acc.movements)
  .reduce((len, amt) => (amt >= 1000 ? (len += 1) : len), 0);
console.log(deposite1klen); // 6

// using forEach
let depositOver1k = 0;
accounts.forEach(acc => {
  acc.movements.forEach(amt => (amt >= 1000 ? depositOver1k++ : depositOver1k));
});
console.log(depositOver1k); // 6

// using reduce()
const depOver1k = accounts.reduce((depCnt, acc) => {
  return (
    depCnt +
    acc.movements.reduce((cnt, amt) => (amt >= 1000 ? (cnt += 1) : cnt), 0)
  );
}, 0);
console.log(depOver1k); // 6

// III. Create an object that contains the sum of the deposits and the withdrawls
const { dep, withd } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, amt) => {
      // Using dot
      // amt > 0 ? (acc.dep += amt) : (acc.withd += amt);

      // Using square bracket
      acc[amt > 0 ? 'dep' : 'withd'] += amt;

      return acc;
    },
    {
      dep: 0,
      withd: 0,
    }
  );
console.log(dep, withd);

// IV. Create a function to convert any string to a title case e.g. 'this is a nice title' -> 'This Is a Nice Title'
const createTitleCase = title => {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const capitalize = word => word.replace(word[0], word[0].toUpperCase());

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return titleCase;
};

console.log(createTitleCase('this is a nice title'));
console.log(createTitleCase('this is a LONG title but not too long'));
console.log(createTitleCase('and here is another title with an EXAMPLE'));
