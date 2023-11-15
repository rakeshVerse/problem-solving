'use strict';

// Data
const account1 = {
  owner: 'John Smith',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jenny Johnson',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Brad Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Steve Bradshaw Lee',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// DOM Elements
const elements = {
  mainContainerEl: document.querySelector('main'),
  greetEl: document.querySelector('.greeting'),
  userNameEl: document.querySelector('.user-name'),
  pinEl: document.querySelector('.pin'),
  loginBtn: document.querySelector('.login-btn'),
  transacListEl: document.querySelector('.transac ul'),
  currBalanceEl: document.querySelector('.balance'),
  totDepositEl: document.querySelector('.in .status-amt'),
  totWithdrawlEl: document.querySelector('.out .status-amt'),
};

// FUNCTIONS

// Get initials of given string
const getInitials = str => {
  let initials = '';
  str
    .toLowerCase()
    .split(' ')
    .forEach(word => {
      initials += word.at(0);
    });

  return initials;
};

// Get account by given userName
const findAcc = userName =>
  accounts.filter(acc => userName === getInitials(acc.owner))[0];

// Validate user input for falsy values ('', 0)
const validateInput = inputs =>
  inputs.every(input => input !== '' && input !== 0);

// Calculate current balance
const calcCurrentBalance = account =>
  account.movements.reduce((bal, amt) => amt + bal, 0);

// Calculate total deposit and withdrawl
const calcDepositAndWithdrawl = account => {
  return account.movements.reduce(
    (bal, amt) => {
      amt > 0 ? (bal.deposit += amt) : (bal.withdrawl += amt);
      return bal;
    },
    { deposit: 0, withdrawl: 0 }
  );
};

// Build transactions list
const transactionsListUI = account => {
  let html = '';
  account.movements.forEach((amt, i) => {
    html = `
    <li>
      <p class="transac-type transac-type-${amt > 0 ? `green` : `red`}">${
      i + 1
    } ${amt > 0 ? `deposit` : `withdrawl`}</p>
      <p class="transac-date">12/12/12</p>
      <p class="transac-amt">${amt} $</p>
    </li>`;
    elements.transacListEl.insertAdjacentHTML('afterbegin', html);
  });
};

// Update UI after successful login
const updateUIForLogin = account => {
  elements.mainContainerEl.style.opacity = 1; // display main section
  elements.greetEl.textContent = `Welcome, ${account.owner.split(' ')[0]}!`; // greet
  elements.currBalanceEl.textContent = `${calcCurrentBalance(account)} $`; // current balance
  transactionsListUI(account); // display transaction list

  // display total deposit and withdrawl
  const { deposit, withdrawl } = calcDepositAndWithdrawl(account);
  elements.totDepositEl.textContent = deposit;
  elements.totWithdrawlEl.textContent = Math.abs(withdrawl);
};

////////////////////////// LOG IN /////////////////////////////

elements.loginBtn.addEventListener('click', function () {
  const userName = elements.userNameEl.value;
  const pin = +elements.pinEl.value;

  // validate input
  if (!validateInput([userName, pin])) return;

  // find user account using userName
  const currentAcc = findAcc(userName);
  if (!currentAcc) return;

  // if PIN matches, log-in
  if (currentAcc.pin === pin) {
    updateUIForLogin(currentAcc);
  }
});

/////////////////////////////////////////////////////////////////

////////////////////////// LOG IN /////////////////////////////

/////////////////////////////////////////////////////////////////
////////////////////////// LOG IN /////////////////////////////

/////////////////////////////////////////////////////////////////
////////////////////////// LOG IN /////////////////////////////

/////////////////////////////////////////////////////////////////
////////////////////////// LOG IN /////////////////////////////

/////////////////////////////////////////////////////////////////
////////////////////////// LOG IN /////////////////////////////

/////////////////////////////////////////////////////////////////
////////////////////////// LOG IN /////////////////////////////

/////////////////////////////////////////////////////////////////
////////////////////////// LOG IN /////////////////////////////

/////////////////////////////////////////////////////////////////
