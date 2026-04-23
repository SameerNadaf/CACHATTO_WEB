import { $, $$ } from './utils.js';

export function initFAQ() {
  const faqItems = $$('.faq-item');

  faqItems.forEach(item => {
    const btn = $('.faq-q', item);
    const answer = $('.faq-a', item);
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const ob = $('.faq-q', other);
          if (ob) ob.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle this one
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Keyboard: Enter / Space handled by button natively
    // Additional: Escape key closes
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.blur();
      }
    });
  });
}
