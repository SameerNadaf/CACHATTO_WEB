import { $, $$ } from './utils.js';

export function initNavigation() {
  /* ── 1. STICKY NAV ────────────────────────────────────────── */
  const nav = $('#mainNav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 2. MOBILE HAMBURGER ──────────────────────────────────── */
  const hamburger = $('#hamburger');
  const mobileNav = $('#mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on any link click (except the dropdown toggle itself)
    $$('a', mobileNav).forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Mobile dropdown toggle
    const mNavToggle = $('.nav__mobile-toggle');
    const mNavMenu = $('.nav__mobile-menu');
    if (mNavToggle && mNavMenu) {
      mNavToggle.addEventListener('click', () => {
        mNavMenu.classList.toggle('open');
        const icon = $('.material-symbols-outlined', mNavToggle);
        if (icon) {
          icon.style.transform = mNavMenu.classList.contains('open') ? 'rotate(180deg)' : '';
        }
      });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}
