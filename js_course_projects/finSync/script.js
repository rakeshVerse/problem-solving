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
  currDateEl: document.querySelector('.curr-date'),
  totDepositEl: document.querySelector('.in .status-amt'),
  totWithdrawlEl: document.querySelector('.out .status-amt'),
  interestEl: document.querySelector('.interest .status-amt'),
  allInputEl: document.querySelectorAll('input'),
  transferTo: document.querySelector('.transfer-to'),
  transferAmount: document.querySelector('.transfer-amt'),
  transferBtn: document.querySelector('.transfer-btn'),
};

// Config
const config = {
  firstLogin: true,
  currentAccount: {},
};

// FUNCTIONS

// Get initials of given string
const createUsername = () =>
  accounts.forEach(
    acc =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(word => word.at(0))
        .join(''))
  );

// Get account by given userName
const findAcc = userName =>
  accounts.filter(acc => userName === acc.username)[0];

// Validate user input for falsy values ('', 0)
const validateInput = inputs =>
  inputs.every(input => input !== '' && input !== 0);

// Clear input fields
const clearInputs = inputs => inputs.forEach(input => (input.value = ''));

// Show/Hide main section
const showHideMain = () => elements.mainContainerEl.classList.toggle('hidden');

const showBalanceAndDate = account => {
  // Show date
  const today = new Date();
  elements.currDateEl.textContent = `${today.getFullYear()}/${
    today.getMonth() + 1
  }/${today.getDate()}, ${today.getHours()}:${today.getMinutes()}`;

  // Show balance
  elements.currBalanceEl.textContent = `$${account.movements.reduce(
    (bal, amt) => amt + bal,
    0
  )}`;
};

const greet = account =>
  (elements.greetEl.textContent = `Welcome, ${account.owner.split(' ')[0]}!`);

// Calculate total deposit and withdrawl
const showSummary = account => {
  // Calculate and display total deposits and withdrawls
  const { deposit, withdrawl } = account.movements.reduce(
    (bal, amt) => {
      amt > 0 ? (bal.deposit += amt) : (bal.withdrawl += amt);
      return bal;
    },
    { deposit: 0, withdrawl: 0 }
  );

  elements.totDepositEl.textContent = `$${deposit}`;
  elements.totWithdrawlEl.textContent = `$${Math.abs(withdrawl)}`;

  /**
   * Calculate interest:
   * - interest for each deposit (deposit * interestRate/100)
   * - if interest is atleast one add interest
   */
  elements.interestEl.textContent = `$${account.movements.reduce(
    (totInterest, amt) => {
      // Calculate interest for each deposit
      const interest = amt > 0 && (amt * account.interestRate) / 100;

      // Calculate interest sum
      return interest >= 1 ? totInterest + interest : totInterest;
    },
    0
  )}`;
};

// Build transactions list
const showTransactions = account => {
  let html = '';
  account.movements.forEach((amt, i) => {
    html = `
    <li>
      <p class="transac-type transac-type-${amt > 0 ? `green` : `red`}">${
      i + 1
    } ${amt > 0 ? `deposit` : `withdrawl`}</p>
      <p class="transac-date">12/12/12</p>
      <p class="transac-amt">$${Math.abs(amt)}</p>
    </li>`;
    elements.transacListEl.insertAdjacentHTML('afterbegin', html);
  });
};

const clear = () => {
  // Hide main
  elements.mainContainerEl.classList.add('hidden');

  // Clear transaction list
  elements.transacListEl.textContent = '';

  // Clear greeting
  elements.greetEl.textContent = 'Log-in to get started';

  // Clear all input fields
  clearInputs(elements.allInputEl);

  // Remove focus from active element (in this case, pin input field)
  document.activeElement.blur();
};

// Update UI after successful login
const updateUIForLogin = account => {
  clear(); // clear previous account

  // If not first login, wait for 1s before log-in to get the fade-out fade-in effect
  let timer = config.firstLogin ? 0 : 1;
  config.firstLogin = false;

  setTimeout(() => {
    showHideMain();
    greet(account);
    showBalanceAndDate(account);
    showTransactions(account);
    showSummary(account);
  }, timer * 1000);
};

// Init
const init = () => {
  elements.userNameEl.focus(); // set focus on username input
  createUsername();
};
init();

////////////////////////// LOG IN /////////////////////////////
const loginCB = () => {
  const userName = elements.userNameEl.value.trim();
  const pin = +elements.pinEl.value;

  // validate input
  if (!validateInput([userName, pin])) return;

  // find user account using userName
  config.currentAccount = findAcc(userName);
  if (!config.currentAccount) return;

  // if PIN matches, log-in
  if (config.currentAccount.pin === pin) {
    updateUIForLogin(config.currentAccount);
  }
};

elements.loginBtn.addEventListener('click', loginCB);
/////////////////////////////////////////////////////////////////

////////////////////////// TRANSFER /////////////////////////////
const transferCB = () => {
  const transferTo = elements.transferTo.value.trim();
  const transferAmt = +elements.transferAmount.value;

  if (!validateInput([transferTo, transferAmt])) return;

  // transferAmt should be less than current Balanace
  // and current acc !== transfer acc
  if (
    transferAmt > 0 &&
    transferAmt < config.currentAccount.currBalance &&
    transferTo !== config.currentAccount.username
  ) {
    // Find account using transferTo
  }

  // Find transferTo account

  // Make entries on both (current & transerTo) accounts movements

  // Update UI
};

elements.transferBtn.addEventListener('click', transferCB);
/////////////////////////////////////////////////////////////////

////////////////////////// LOG IN /////////////////////////////

// On-enter
document.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    // Login
    e.target.classList.contains('pin') && loginCB();

    // Transfer
    e.target.classList.contains('transfer-amt') && transferCB();
  }
});
