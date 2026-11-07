/* Lightweight, one-time scroll reveals for the homepage only. */
(() => {
  if (!document.body.classList.contains('home-page')) return;
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selectors = [
    '.school-bonus .eyebrow', '.school-bonus h2', '.school-bonus p',
    '.school-bonus .bonus-art', '.school-bonus .btn',
    '.features .feature', '.about .eyebrow', '.about h2',
    '.about p', '.about .btn', '.about > img',
    '.section:not(.school-bonus) .cards .card',
    '.school-details .eyebrow', '.school-details h2',
    '.school-details .info', '.footer .wrap > *'
  ];
  // Include headings and introductions in other homepage sections.
  document.querySelectorAll('body.home-page > .section').forEach(section => {
    if (section.classList.contains('school-bonus') ||
        section.classList.contains('school-details')) return;
    selectors.push(); // Other sections are handled below without modifying markup.
  });
  const targets = new Set(document.querySelectorAll(selectors.join(',')));
  document.querySelectorAll('body.home-page > .section:not(.school-bonus):not(.school-details) > .wrap').forEach(wrap => {
    wrap.querySelectorAll(':scope > .eyebrow, :scope > h2').forEach(el => targets.add(el));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });

  targets.forEach(el => {
    // Avoid hiding anything already visible at initial load, especially the hero.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;
    const parent = el.parentElement;
    if (el.matches('.feature, .card, .info')) {
      const siblings = Array.from(parent.children).filter(node => node.matches('.feature, .card, .info'));
      el.style.setProperty('--reveal-delay', Math.min(siblings.indexOf(el), 4) * 100 + 'ms');
    }
    if (el.matches('img')) el.dataset.revealKind = 'image';
    el.classList.add('scroll-reveal-ready');
    observer.observe(el);
  });
})();
