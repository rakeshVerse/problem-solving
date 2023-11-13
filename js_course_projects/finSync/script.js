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

console.log(accounts);

// DOM Elements
const elements = {
  mainContainerEl: document.querySelector('main'),
  greetEl: document.querySelector('.greeting'),
  userNameEl: document.querySelector('.user-name'),
  pinEl: document.querySelector('.pin'),
  loginBtn: document.querySelector('.login-btn'),
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

// Update UI after successful login
const updateUIForLogin = owner => {
  elements.mainContainerEl.style.opacity = 1;
  elements.greetEl.textContent = `Welcome, ${owner.split(' ')[0]}!`;
};

// Validate user input for falsy values ('', 0)
const validateInput = inputs =>
  inputs.every(input => input !== '' && input !== 0);

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
    updateUIForLogin(currentAcc.owner);
  }
});
