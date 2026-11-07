const menuToggle = document.querySelector('.burger');
const menuState = document.querySelector('.mobile-toggle');
const navigation = document.querySelector('.nav');
function setMenu(open) {
 menuState.checked = open;
 menuToggle.setAttribute('aria-expanded', String(open));
 menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
}
menuToggle.addEventListener('click', () => setMenu(!menuState.checked));
navigation.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuState.checked) { setMenu(false); menuToggle.focus(); } });

// Close a previously opened mobile menu when returning to desktop layout.
window.matchMedia('(min-width: 1181px)').addEventListener('change', event => {
 if (event.matches) setMenu(false);
});
document.addEventListener('click', event => {
 if (menuState.checked && !navigation.contains(event.target) && !menuToggle.contains(event.target)) setMenu(false);
});
