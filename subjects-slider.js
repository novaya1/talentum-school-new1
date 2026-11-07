const subjectCarousel = document.querySelector('[data-subject-carousel]');
if (subjectCarousel) {
  const track = subjectCarousel.querySelector('.subject-slides');
  const slides = [...track.querySelectorAll('.subject-slide')];
  const stack = subjectCarousel.querySelector('.subject-carousel');
  const status = subjectCarousel.querySelector('[data-subject-status]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;

  function update(index) {
    current = index;
    status.textContent = `${index + 1} / ${slides.length}`;
    stack.style.setProperty('--stack-next', `url("${slides[(index + 1) % slides.length].querySelector('img').getAttribute('src')}")`);
    stack.style.setProperty('--stack-back', `url("${slides[(index + 2) % slides.length].querySelector('img').getAttribute('src')}")`);
  }

  function select(index) {
    const target = (index + slides.length) % slides.length;
    update(target);
    track.scrollTo({left: target * track.clientWidth, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  }

  update(0);
  subjectCarousel.querySelector('[data-subject-prev]').addEventListener('click', () => select(current - 1));
  subjectCarousel.querySelector('[data-subject-next]').addEventListener('click', () => select(current + 1));
  track.addEventListener('scroll', () => {
    const index = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
    if (index !== current) update(index);
  }, {passive: true});
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      select(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  new ResizeObserver(() => {
    track.scrollTo({left: current * track.clientWidth, behavior: 'instant'});
  }).observe(track);
}
