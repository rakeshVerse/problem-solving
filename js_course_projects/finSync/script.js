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
  interestEl: document.querySelector('.interest .status-amt'),
  allInputEl: document.querySelectorAll('input'),
};

// Config
const config = {
  firstLogin: true,
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

// Clear input fields
const clearInputs = inputs => inputs.forEach(input => (input.value = ''));

// Show/Hide main section
const showHideMain = () => elements.mainContainerEl.classList.toggle('hidden');

const greet = account =>
  (elements.greetEl.textContent = `Welcome, ${account.owner.split(' ')[0]}!`);

// Calculate current balance
const showCurrBalance = account =>
  (elements.currBalanceEl.textContent = `$${account.movements.reduce(
    (bal, amt) => amt + bal,
    0
  )}`);

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
const transactionsListUI = account => {
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
    showCurrBalance(account);
    transactionsListUI(account);
    showSummary(account);
  }, timer * 1000);
};

const loginCB = () => {
  const userName = elements.userNameEl.value.trim();
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
};

// Init
const init = () => {
  elements.userNameEl.focus(); // set focus on username input
};
init();

////////////////////////// LOG IN /////////////////////////////

// On-click
elements.loginBtn.addEventListener('click', loginCB);

// On-enter
elements.pinEl.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) loginCB();
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
