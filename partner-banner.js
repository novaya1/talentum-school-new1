(() => {
  const storageKey = 'talentum-partner-banner-hidden';
  try {
    if (sessionStorage.getItem(storageKey) === 'yes') return;
  } catch (_) {}

  const banner = document.createElement('aside');
  banner.className = 'partner-banner';
  banner.setAttribute('aria-label', 'Партнёрская программа');
  banner.innerHTML = `<button class="partner-banner-hide" type="button" aria-label="Скрыть баннер партнёрской программы">×</button>
    <button class="partner-banner-open" type="button" aria-haspopup="dialog" aria-controls="partner-dialog">
      <span>Партнёрам</span><strong>1 000 ₽</strong><span>в месяц за ученика</span>
    </button>`;
  const dialog = document.createElement('dialog');
  dialog.id = 'partner-dialog';
  dialog.className = 'partner-dialog';
  dialog.setAttribute('aria-labelledby', 'partner-title');
  dialog.innerHTML = `<button class="partner-dialog-close" type="button" aria-label="Закрыть условия партнёрской программы">×</button>
    <div class="eyebrow">TalentUm School World</div>
    <h2 id="partner-title">Дополнительный доход для родителей и педагогов</h2>
    <p class="partner-offer">1 000 ₽ в месяц за каждого ученика</p>
    <p>Присоединяйтесь к официальной партнёрской программе нашей онлайн-школы. Рекомендуйте дополнительное образование для школьников и получайте бонус.</p>
    <ul class="partner-terms">
      <li><strong>Честные условия.</strong> Платим 1 000 ₽ каждый месяц, пока приведённый вами ученик занимается в нашей школе.</li>
      <li><strong>Лёгкий старт.</strong> Предоставляем готовые тексты, картинки и персональную ссылку.</li>
      <li><strong>Выгода для родителей.</strong> По вашей ссылке — скидка 1 000 ₽ на первый месяц обучения.</li>
      <li><strong>Официально.</strong> Программу ведёт ИП. Выплаты — раз в месяц.</li>
    </ul>
    <p><strong>Хотите стать партнёром? Напишите нам — расскажем подробности и поможем начать.</strong></p>
    <a class="btn" href="https://t.me/Samirkin06" target="_blank" rel="noopener noreferrer">Стать партнёром — написать в Telegram ↗</a>`;
  const hero = document.querySelector('.hero-premium');
  if (hero) {
    banner.hidden = true;
    const observer = new IntersectionObserver(entries => {
      banner.hidden = entries[0].isIntersecting;
    }, {rootMargin: '-88px 0px 0px 0px'});
    observer.observe(hero);
  }
  document.body.append(banner, dialog);
  const open = banner.querySelector('.partner-banner-open');
  open.addEventListener('click', () => dialog.showModal());
  dialog.querySelector('.partner-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => open.focus({preventScroll: true}));
  banner.querySelector('.partner-banner-hide').addEventListener('click', () => {
    try { sessionStorage.setItem(storageKey, 'yes'); } catch (_) {}
    banner.remove();
    dialog.remove();
  });
})();
