'use strict';

const btnOpenModal = document.querySelector('.btn-login');
const btnCloseModal = document.querySelector('.btn-modal-close');
const modalLogin = document.querySelector('.modal-login');
const backdrop = document.querySelector('.backdrop');

//----------------- Modal ----------------------//

const showHideModal = () => {
  modalLogin.classList.toggle('hidden');
  backdrop.classList.toggle('hidden');
};

// Open modal
btnOpenModal.addEventListener('click', showHideModal);

// Close modal
// 'x' click
btnCloseModal.addEventListener('click', showHideModal);

// backdrop click
backdrop.addEventListener('click', showHideModal);

// esc keypress
document.addEventListener('keyup', e => {
  if (e.key === 'Escape' && !modalLogin.classList.contains('hidden'))
    showHideModal();
});
