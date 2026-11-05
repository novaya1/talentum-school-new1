const heroVideo = document.querySelector('.hero-school-video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileScreen = window.matchMedia('(max-width: 767px)');

function applyVideoPreference() {
  heroVideo.muted = true;
  heroVideo.autoplay = !reducedMotion.matches;
  if (reducedMotion.matches) {
    heroVideo.pause();
  } else {
    heroVideo.play().catch(() => {});
  }
}

function selectHeroVideo() {
  const src = mobileScreen.matches
    ? heroVideo.dataset.mobileSrc
    : heroVideo.dataset.desktopSrc;
  heroVideo.poster = mobileScreen.matches
    ? 'hero-background-mobile.jpg'
    : 'hero-background.jpg';
  if (heroVideo.getAttribute('src') !== src) {
    heroVideo.src = src;
    heroVideo.load();
  }
  applyVideoPreference();
}

selectHeroVideo();
mobileScreen.addEventListener('change', selectHeroVideo);
reducedMotion.addEventListener('change', applyVideoPreference);
