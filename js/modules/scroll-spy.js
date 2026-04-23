import { $$ } from './utils.js';

export function initScrollSpy() {
  const sections = $$('section[id], div[id]');
  const navLinks = $$('.nav__links a');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              const match = link.getAttribute('href') === `#${id}`;
              link.style.color = match ? 'var(--c-blue)' : '';
              link.style.fontWeight = match ? '600' : '';
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => spy.observe(s));
  }
}
