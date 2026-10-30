const heroVideo = document.querySelector('.hero-school-video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function applyVideoPreference() {
  heroVideo.muted = true;
  heroVideo.autoplay = !reducedMotion.matches;
  if (reducedMotion.matches) {
    heroVideo.pause();
    heroVideo.load();
  } else {
    heroVideo.play().catch(() => {});
  }
}
applyVideoPreference();
reducedMotion.addEventListener('change', applyVideoPreference);
