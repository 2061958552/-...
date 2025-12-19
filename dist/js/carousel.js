// Lightweight carousel module supporting multiple carousels on a page
// Features: prev/next, dots, keyboard nav, autoplay (per-carousel), pause on hover/focus, touch swipe

(function () {
  if (typeof window === 'undefined') return;

  const initCarousel = (carousel) => {
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prev = carousel.querySelector('.carousel-button.prev');
    const next = carousel.querySelector('.carousel-button.next');
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    let index = 0;

    const update = (i) => {
      index = ((i % slides.length) + slides.length) % slides.length;
      track.style.transform = `translateX(${ -index * 100 }%)`;
      dots.forEach((d, idx) => d.setAttribute('aria-selected', String(idx === index)));
    };

    // Autoplay
    let autoplayInterval = null;
    const startAutoplay = () => {
      if (autoplayInterval) return;
      autoplayInterval = setInterval(() => update(index + 1), 4500);
    };
    const stopAutoplay = () => {
      if (!autoplayInterval) return;
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    };

    if (slides.length > 1) startAutoplay();

    // pause on hover/focus
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    // Touch swipe support
    let startX = 0;
    let isSwiping = false;
    carousel.addEventListener('touchstart', (e) => {
      stopAutoplay();
      startX = e.touches[0].clientX;
      isSwiping = true;
    }, { passive: true });
    carousel.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      const dx = e.touches[0].clientX - startX;
      track.style.transform = `translateX(${ -index * 100 + (dx / carousel.clientWidth) * 100 }%)`;
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      const dx = (e.changedTouches[0].clientX - startX);
      isSwiping = false;
      if (Math.abs(dx) > 40) {
        if (dx < 0) update(index + 1); else update(index - 1);
      } else {
        update(index);
      }
      startAutoplay();
    });

    if (prev) prev.addEventListener('click', () => update(index - 1));
    if (next) next.addEventListener('click', () => update(index + 1));
    dots.forEach((d) => d.addEventListener('click', (e) => {
      const idx = Number(d.getAttribute('data-index'));
      update(idx);
    }));

    // keyboard
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') update(index - 1);
      if (e.key === 'ArrowRight') update(index + 1);
    });

    // ensure focusable
    if (!carousel.hasAttribute('tabindex')) carousel.setAttribute('tabindex', '0');

    // init
    update(0);
  };

  document.querySelectorAll('.carousel').forEach(initCarousel);
})();
