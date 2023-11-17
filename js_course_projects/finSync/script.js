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
  // main
  mainContainerEl: document.querySelector('main'),
  transacListEl: document.querySelector('.transac ul'),

  // lables
  greetEl: document.querySelector('.greeting'),
  currBalanceEl: document.querySelector('.balance'),
  currDateEl: document.querySelector('.curr-date'),
  totDepositEl: document.querySelector('.in .status-amt'),
  totWithdrawlEl: document.querySelector('.out .status-amt'),
  interestEl: document.querySelector('.interest .status-amt'),
  logOutTimerEl: document.querySelector('.log-out-timer span'),

  // inputs
  userNameEl: document.querySelector('.user-name'),
  pinEl: document.querySelector('.pin'),
  transferTo: document.querySelector('.transfer-to'),
  transferAmount: document.querySelector('.transfer-amt'),
  loanAmount: document.querySelector('.loan-amt'),
  confirmUsrEl: document.querySelector('.confirm-usr'),
  confirmPinEl: document.querySelector('.confirm-pin'),
  allInputEl: document.querySelectorAll('input'),

  // buttons
  loginBtn: document.querySelector('.login-btn'),
  transferBtn: document.querySelector('.transfer-btn'),
  loanBtn: document.querySelector('.loan-btn'),
  closeAccBtn: document.querySelector('.close-acc-btn'),
  sortBtn: document.querySelector('.sort'),
};

// Config
const config = {
  firstLogin: true,
  currentAccount: {},
  isSorted: false,
  logOutTimer: 300, // in seconds
  logOutInterval: '',
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

const showBalanceAndDate = () => {
  // Show date
  const today = new Date();
  elements.currDateEl.textContent = `${today.getFullYear()}/${
    today.getMonth() + 1
  }/${today.getDate()}, ${today.getHours()}:${today.getMinutes()}`;

  // Show balance
  const balance = config.currentAccount.movements.reduce(
    (bal, amt) => amt + bal,
    0
  );
  config.currentAccount.currBalance = balance;
  elements.currBalanceEl.textContent = `$${balance}`;
};

const greet = () =>
  (elements.greetEl.textContent = `Welcome, ${
    config.currentAccount.owner.split(' ')[0]
  }!`);

// Calculate total deposit and withdrawl
const showSummary = () => {
  // Calculate and display total deposits and withdrawls
  const { deposit, withdrawl } = config.currentAccount.movements.reduce(
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
  elements.interestEl.textContent = `$${config.currentAccount.movements
    .reduce((totInterest, amt) => {
      // Calculate interest for each deposit
      const interest =
        amt > 0 && (amt * config.currentAccount.interestRate) / 100;

      // Calculate interest sum
      return interest >= 1 ? totInterest + interest : totInterest;
    }, 0)
    .toFixed(2)}`;
};

// Sort movements and store it in config
const sortMovements = () =>
  (config.sortedMovements = [...config.currentAccount.movements].sort(
    (a, b) => a - b
  ));

// Build transactions list
const showTransactions = () => {
  const movements = config.isSorted
    ? config.sortedMovements
    : config.currentAccount.movements;

  let html = '';
  elements.transacListEl.textContent = '';
  movements.forEach((amt, i) => {
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

const clearData = () => {
  // Clear transaction list
  elements.transacListEl.textContent = '';

  // Clear all input fields
  clearInputs(elements.allInputEl);

  // Remove focus from active element (in this case, pin input field)
  document.activeElement.blur();
};

const updateData = () => {
  showBalanceAndDate();
  config.isSorted && sortMovements(); // sort movements before displaying transactions
  showTransactions();
  showSummary();
};

// Init
const init = () => {
  elements.userNameEl.focus(); // set focus on username input
  createUsername();

  // temp login
  // config.currentAccount = account1;
  // updateUIForLogin();
};
init();

//////////////////////////// LOGOUT ///////////////////////////////////
const logOut = () => {
  // Hide main
  elements.mainContainerEl.classList.add('hidden');

  // Clear greeting
  elements.greetEl.textContent = 'Log-in to get started';

  // Reset isSorted to false
  config.isSorted = false;

  // Clear timer
  clearInterval(config.logOutInterval);

  clearData();
};

//////////////////////////// TIMER ///////////////////////////////////
const startLogOutTimer = () => {
  const tick = () => {
    // clac mins and secs
    const minutes = String(Math.trunc(timer / 60)).padStart(2, 0);
    const seconds = String(Math.trunc(timer % 60)).padStart(2, 0);

    // display mins and secs
    elements.logOutTimerEl.textContent = `${minutes}: ${seconds}`;

    // if timer 0, logout
    timer === 0 && logOut();

    // decrement timer by 1
    timer--;
  };

  let timer = config.logOutTimer;
  tick();
  config.logOutInterval = setInterval(tick, 1000);
};

////////////////////////// LOG IN /////////////////////////////
// Update UI after successful login
const updateUIForLogin = () => {
  logOut(); // clear previous account

  // If not first login, wait for 1s before log-in to get the fade-out fade-in effect
  let timer = config.firstLogin ? 0 : 1;
  config.firstLogin = false;

  setTimeout(() => {
    showHideMain();
    greet();
    updateData();
    startLogOutTimer();
  }, timer * 1000);
};

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
    updateUIForLogin();
  }
};

elements.loginBtn.addEventListener('click', loginCB);

////////////////////////// TRANSFER /////////////////////////////
const transferCB = () => {
  const transferTo = elements.transferTo.value.trim();
  const transferAmt = +elements.transferAmount.value;

  if (!validateInput([transferTo, transferAmt])) return;

  // Find transferTo account
  const transferAccount = findAcc(transferTo);

  // Validation
  // there should be an account for given username
  // transferAmt should be less than current Balanace
  // and current acc !== transfer acc
  if (
    transferAmt > 0 &&
    transferAmt < config.currentAccount.currBalance &&
    transferTo !== config.currentAccount.username &&
    transferAccount
  ) {
    // Make entries on both (current & transerTo) accounts movements
    config.currentAccount.movements.push(-transferAmt);
    transferAccount.movements.push(transferAmt);

    // Update UI
    clearData();
    updateData();
  }
};

elements.transferBtn.addEventListener('click', transferCB);

////////////////////////// REQUEST LOAN ////////////////////////////
const requestLoanCB = () => {
  const loanAmount = +elements.loanAmount.value;
  if (!validateInput([loanAmount])) return;

  // At least one deposite with at least 10% of the Loan amount
  // i.e. if Loan amount is 100 then at least one deposit shoud be 10 or greater
  if (
    config.currentAccount.movements
      .filter(amt => amt > 0)
      .some(deposit => deposit >= loanAmount * 0.1)
  ) {
    // Add loan amount to movements
    config.currentAccount.movements.push(loanAmount);
    // Update UI
    clearData();
    updateData();
  }
};

elements.loanBtn.addEventListener('click', requestLoanCB);

////////////////////////// CLOSE ACCOUNT ////////////////////////////
const closeAccCB = () => {
  const username = elements.confirmUsrEl.value.trim();
  const pin = +elements.confirmPinEl.value;

  if (!validateInput([username, pin])) return;

  // Find account
  // provided username and pin should match with an account
  // and that account must be the current logged in account user
  const closeAccount = accounts.filter(
    acc =>
      acc.username === username &&
      acc.pin === pin &&
      acc.username === config.currentAccount.username
  )[0];

  if (!closeAccount) return;

  // Remove current account object from accounts array
  const index = accounts.indexOf(closeAccount);
  accounts.splice(index, 1);

  // Logout
  logOut();
};

elements.closeAccBtn.addEventListener('click', closeAccCB);
////////////////////////////// KEY PRESS EVENTS //////////////////////
// On-enter
document.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    // Login
    e.target.classList.contains('pin') && loginCB();

    // Transfer
    e.target.classList.contains('transfer-amt') && transferCB();

    // Loan
    e.target.classList.contains('loan-amt') && requestLoanCB();

    // close account
    e.target.classList.contains('confirm-pin') && closeAccCB();
  }
});

////////////////////////// SORT ////////////////////////////

elements.sortBtn.addEventListener('click', () => {
  config.isSorted = !config.isSorted;

  // Sort movements
  config.isSorted && sortMovements();

  // UpdateUI
  showTransactions();
});
