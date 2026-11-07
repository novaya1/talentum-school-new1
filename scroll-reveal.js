(() => {
  const page = document.querySelector('.home-page');
  if (!page || !('IntersectionObserver' in window)) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches) return;

  const elements = [...page.querySelectorAll(
    '.bonus-card, .feature, .about > div, .about > img, ' +
    '.section > .wrap > .eyebrow, .section > .wrap > h2, ' +
    '.cards > .card, .school-details .info, .footer > .wrap'
  )];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.06, rootMargin: '0px 0px -20px 0px'});

  elements.forEach(element => {
    // Keep content already on screen visible, including restored scroll positions.
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) return;
    if (element.matches('.feature, .card, .info')) {
      const siblings = [...element.parentElement.children];
      const interval = element.matches('.feature') ? 100 : 60;
      element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 3) * interval}ms`);
    }
    element.classList.add('scroll-reveal');
    observer.observe(element);
  });

  page.addEventListener('focusin', event => {
    const element = event.target.closest('.scroll-reveal');
    if (element) {
      element.classList.add('is-revealed');
      observer.unobserve(element);
    }
  });
  motion.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      elements.forEach(element => element.classList.add('is-revealed'));
    }
  });
})();
