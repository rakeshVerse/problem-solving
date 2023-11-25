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

///////////////////////// SLIDER (About us) ///////////////////////////

const aboutUsSlider = () => {
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
};
aboutUsSlider();

////////////////// HORIZONTAL SCROLL (Popular section) ////////////////////
const horizontalScroll = () => {
  const scrollContainer = document.querySelector('.scroll-container');
  const scrollLeftBtn = document.querySelector('.btn-scroll-left');
  const scrollRightBtn = document.querySelector('.btn-scroll-right');

  const init = () => {
    // Initially set scroll to 0
    scrollContainer.scrollLeft = 0;

    // Hide left btn
    scrollLeftBtn.classList.add('hide');
  };

  init();

  const scroll = (element, direction, speed, step, scrollLimit) => {
    let scrolled = 0;

    const scrollTimer = setInterval(() => {
      // if direction is right add step to scrollLeft to move forward
      // else substract step from scrollLeft to move backwards
      if (direction === 'right') element.scrollLeft += step;
      else element.scrollLeft -= step;

      // on each scroll update scrolled
      scrolled += step;

      // if limit is reached, stop interval
      if (scrolled >= scrollLimit) {
        clearInterval(scrollTimer);
      }
    }, speed);
  };

  const showHideBtnRight = () => {
    // if scrollWidth - scrollLeft - clientWidth < 1500, hide right button
    if (
      scrollContainer.scrollWidth -
        scrollContainer.scrollLeft -
        scrollContainer.clientWidth <
      1500
    )
      scrollRightBtn.classList.add('hide');
    else scrollRightBtn.classList.remove('hide');
  };

  const showHideBtnLeft = () => {
    if (scrollContainer.scrollLeft < 2000) scrollLeftBtn.classList.add('hide');
    else scrollLeftBtn.classList.remove('hide');
  };

  // Scroll config
  const scrollCnf = {
    element: scrollContainer,
    speed: 100,
    step: 500,
    scrollLimit: 2500,
  };

  // Event handling
  scrollRightBtn.addEventListener('click', function () {
    // Scroll forward
    scroll(
      scrollCnf.element,
      'right',
      scrollCnf.speed,
      scrollCnf.step,
      scrollCnf.scrollLimit
    );

    // Show left btn
    scrollLeftBtn.classList.remove('hide');

    // Show hide right btn
    showHideBtnRight(this);
  });

  scrollLeftBtn.addEventListener('click', function () {
    // Scroll backwards
    scroll(
      scrollCnf.element,
      'left',
      scrollCnf.speed,
      scrollCnf.step,
      scrollCnf.scrollLimit
    );

    // Show right btn
    scrollRightBtn.classList.remove('hide');

    // Show hide left btn
    showHideBtnLeft(this);
  });
};
horizontalScroll();

///////////////////////// SCROLL TO TOP ///////////////////////////
document.querySelector('.scroll-top').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('body').scrollIntoView({
    behavior: 'smooth',
  });
});

///////////////////////// INTERSECTION OBSERVER API ///////////////////////////

// STICKY NAV
const sectionHero = document.querySelector('.section-hero');
const header = document.querySelector('.header');

// Observer API

// 1. options
const heroSecObserverOps = {
  threshold: 0, // 0%
};

// 2. callback
const heroSecObserverCB = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // hide sticky nav
      header.classList.remove('sticky-nav');
    } else {
      // show sticky nav
      header.classList.add('sticky-nav');
    }
  });
};

// 3. create observer and observe hero section
const heroSecObserver = new IntersectionObserver(
  heroSecObserverCB,
  heroSecObserverOps
);
heroSecObserver.observe(sectionHero);

////////////////////////
