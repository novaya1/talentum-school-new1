const subjectCarousel = document.querySelector('[data-subject-carousel]');
if (subjectCarousel) {
  const track = subjectCarousel.querySelector('.subject-slides');
  const buttons = [...subjectCarousel.querySelectorAll('[data-subject]')];
  const status = subjectCarousel.querySelector('[data-subject-status]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;

  function update(index) {
    current = index;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    status.textContent = `${index + 1} / ${buttons.length}`;
  }

  function select(index) {
    const target = (index + buttons.length) % buttons.length;
    update(target);
    track.scrollTo({left: target * track.clientWidth, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  }

  buttons.forEach((button, i) => button.addEventListener('click', () => select(i)));
  subjectCarousel.querySelector('[data-subject-prev]').addEventListener('click', () => select(current - 1));
  subjectCarousel.querySelector('[data-subject-next]').addEventListener('click', () => select(current + 1));
  track.addEventListener('scroll', () => {
    const index = Math.max(0, Math.min(buttons.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
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
