'use strict';

const btnOpenModal = document.querySelector('.btn-login');
const btnCloseModal = document.querySelector('.btn-modal-close');
const modalLogin = document.querySelector('.modal-login');
const backdrop = document.querySelector('.backdrop');

/////////////////////// Modal ///////////////////////////

const showHideModal = () => {
  modalLogin.classList.toggle('hidden');
  backdrop.classList.toggle('hidden');
};

// click
document.addEventListener('click', function (e) {
  // when click on login btn or 'x' btn or backdrop, toggle modal
  if (
    e.target === btnOpenModal ||
    e.target === btnCloseModal ||
    e.target === backdrop
  )
    showHideModal();
});

// esc keypress
document.addEventListener('keyup', e => {
  if (e.key === 'Escape' && !modalLogin.classList.contains('hidden'))
    showHideModal();
});

///////////////////////// FAQ ///////////////////////////

const faqContainer = document.querySelector('.faqs-box');
const allFaqs = document.querySelectorAll('.faq-box');

faqContainer.addEventListener('click', function (e) {
  // select closest header
  const header = e.target.closest('header');
  if (!header) return;

  const currentFaq = header.closest('.faq-box');

  // remove open class from all the faqs except the current faq
  allFaqs.forEach(faq => {
    if (faq !== currentFaq) faq.classList.remove('open');
  });

  // toggle class 'open' for current faq
  currentFaq.classList.toggle('open');
});
