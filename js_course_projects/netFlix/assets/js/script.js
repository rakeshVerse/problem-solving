'use strict';

const btnOpenModal = document.querySelector('.btn-login');
const btnCloseModal = document.querySelector('.btn-modal-close');
const modalLogin = document.querySelector('.modal-login');
const backdrop = document.querySelector('.backdrop');

/////////////////////// Modal (Sign In) ///////////////////////////

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

///////////////////////// TABS (Devices) ///////////////////////////

const containerTabHead = document.querySelector('.devices-tab-head');
const containerTabContent = document.querySelector('.device-tab-content-box');
const tabContents = document.querySelectorAll('.device-tab-content');
const tabHeads = document.querySelectorAll('.device-tab-head');

containerTabHead.addEventListener('click', e => {
  const tabHead = e.target.closest('.device-tab-head');

  // if not clicked on tab head, return
  if (!tabHead) return;

  // remove active from all tab heads and contents
  tabHeads.forEach(tabHead => tabHead.classList.remove('active'));
  tabContents.forEach(tabContent => tabContent.classList.remove('active'));

  // add active to clicked tab head and content
  containerTabContent
    .querySelector(`.tab-${tabHead.dataset.type}`)
    .classList.add('active');
  tabHead.classList.add('active');
});

///////////////////////// SLIDER (About) ///////////////////////////

const slideContainer = document.querySelector(
  '.section-about .slide-container'
);
const slides = document.querySelectorAll('.section-about .slide');
const btnLeft = document.querySelector('.section-about .btn-slide-left');
const btnRight = document.querySelector('.section-about .btn-slide-right');

const totalSlides = slides.length - 1;
let currentSlide = 0;

// Formula: (i - currentSlide) * 100
const slide = currentSlide =>
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`)
  );

const slideRigth = function () {
  if (currentSlide === totalSlides) currentSlide = 0;
  else currentSlide++;
  slide(currentSlide);
};

const slideLeft = () => {
  if (currentSlide === 0) currentSlide = totalSlides;
  else currentSlide--;
  slide(currentSlide);
};

// Event handling
btnRight.addEventListener('click', slideRigth);
btnLeft.addEventListener('click', slideLeft);

// Auto slide
let pause = false;
const autoSlide = sec =>
  setInterval(() => {
    pause || slideRigth();
  }, sec * 1000);

// pause auto slider on hover
slideContainer.addEventListener('mouseover', () => {
  pause = true;
});

// resume auto slider on hover out
slideContainer.addEventListener('mouseout', () => {
  pause = false;
});

const init = () => {
  slide(currentSlide);
  autoSlide(5);
};

init();
