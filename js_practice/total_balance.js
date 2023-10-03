// calculate total balance after converting USD to INR:
// get all the deposits
// convert to INR: 1USD = 83.19INR
// add them together to get total balance

const currUSD = [120, 457, -99, 487, -58, -97, 855, -9, 897];

const totalBalance = currUSD
  .filter(amt => amt > 0)
  .map(amt => amt * 83.19)
  .reduce((acc, amt) => acc + amt, 0);

console.log(totalBalance);

// Using reduce only
const totBal = currUSD.reduce(
  (acc, amt) => (amt > 0 ? acc + amt * 83.19 : acc),
  0
);
console.log(totBal);
