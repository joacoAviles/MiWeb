const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    filters.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    cards.forEach((card) => {
      const visible = selected === 'all' || card.dataset.category === selected;
      card.style.display = visible ? 'flex' : 'none';
    });
  });
});

const year = document.getElementById('year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}
