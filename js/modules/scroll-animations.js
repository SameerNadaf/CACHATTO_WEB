import { $$ } from './utils.js';

export function initScrollAnimations() {
  const fadeEls = $$('.fade-up');

  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(el => observer.observe(el));
  } else if (fadeEls.length) {
    // Fallback: show immediately if IntersectionObserver is not supported
    fadeEls.forEach(el => el.classList.add('visible'));
  }
}
