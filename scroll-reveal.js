(() => {
  const page = document.querySelector('.home-page');
  if (!page || !('IntersectionObserver' in window)) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches) return;

  const elements = [...page.querySelectorAll(
    '.bonus-card, .about > div, .about > img, ' +
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
    if (element.matches('.card, .info')) {
      const siblings = [...element.parentElement.children];
      const interval = 60;
      element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 3) * interval}ms`);
    }
    element.classList.add('scroll-reveal');
    observer.observe(element);
  });

  // Replay the benefit sequence whenever the whole group re-enters the screen.
  const features = page.querySelector('.features');
  let featureAnimations = [];
  const featureObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || motion.matches) return;
    featureAnimations.forEach(animation => animation.cancel());
    featureAnimations = [...features.children].map((feature, index) => feature.animate([
      {opacity: 0, transform: 'translateY(44px) scale(.96)'},
      {opacity: 1, transform: 'translateY(0) scale(1)'}
    ], {duration: 520, delay: index * 140, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards'}));
  }, {threshold: 0.18});
  if (features) featureObserver.observe(features);

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
      featureObserver.disconnect();
      featureAnimations.forEach(animation => animation.cancel());
      elements.forEach(element => element.classList.add('is-revealed'));
    }
  });
})();
