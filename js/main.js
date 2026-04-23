import { initNavigation } from './modules/navigation.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initFAQ } from './modules/faq.js';
import { initHeroSlider } from './modules/hero-slider.js';
import { initTestimonials } from './modules/testimonials.js';
import { initScrollSpy } from './modules/scroll-spy.js';
import { initCounterAnimation } from './modules/counter.js';
import { initFormValidation } from './modules/form-validation.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('[CACHATTO] Initializing Modular Architecture... Version 3.1');

  initNavigation();
  initSmoothScroll();
  initScrollAnimations();
  initFAQ();
  initHeroSlider();
  initTestimonials();
  initScrollSpy();
  initCounterAnimation();
  initFormValidation();
});
