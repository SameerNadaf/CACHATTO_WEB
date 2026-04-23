import { $, $$ } from './utils.js';

export function initTestimonials() {
  const track = $('#testiTrack');
  const prevBtn = $('#testiPrev');
  const nextBtn = $('#testiNext');
  const dotsWrap = $('#testiDots');

  if (track && prevBtn && nextBtn && dotsWrap) {
    const cards = $$('.testi-card', track);
    const dots = $$('.testi-dot', dotsWrap);
    const total = cards.length;

    let current = 0;
    let autoTimer = null;
    let perView = getPerView();

    function getPerView() {
      if (window.innerWidth <= 768)  return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getCardWidth() {
      if (!cards[0]) return 0;
      const gap = 24; // matches --s3
      return cards[0].offsetWidth + gap;
    }

    function clamp(val) {
      const max = Math.max(0, total - perView);
      return Math.max(0, Math.min(val, max));
    }

    function goTo(index) {
      current = clamp(index);
      track.style.transform = `translateX(-${current * getCardWidth()}px)`;

      // Active card highlight
      cards.forEach((c, i) => c.classList.toggle('is-active', i === current));

      // Dots
      const maxDot = Math.max(0, total - perView);
      dots.forEach((d, i) => {
        const active = i === Math.min(current, maxDot);
        d.classList.toggle('active', active);
        d.setAttribute('aria-current', active ? 'true' : 'false');
      });

      // Button states
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current >= total - perView;
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
    nextBtn.addEventListener('click', () => { next(); resetAuto(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    });

    // Auto-advance
    function startAuto() {
      autoTimer = setInterval(() => {
        if (current >= total - perView) goTo(0);
        else next();
      }, 5000);
    }
    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    // Touch / swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 40) {
        delta > 0 ? next() : prev();
        resetAuto();
      }
    }, { passive: true });

    // Keyboard accessibility
    [prevBtn, nextBtn].forEach(btn => {
      btn.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { prev(); resetAuto(); }
        if (e.key === 'ArrowRight') { next(); resetAuto(); }
      });
    });

    // Resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        perView = getPerView();
        goTo(clamp(current));
      }, 200);
    });

    // Init
    goTo(0);
    startAuto();

    // Pause on hover/focus
    const section = track.closest('section');
    if (section) {
      section.addEventListener('mouseenter', () => clearInterval(autoTimer));
      section.addEventListener('mouseleave', startAuto);
      section.addEventListener('focusin',   () => clearInterval(autoTimer));
      section.addEventListener('focusout',  startAuto);
    }
  }
}
