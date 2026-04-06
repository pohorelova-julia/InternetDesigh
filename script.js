// 1. Fullscreen Burger Menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const closeMenuBtn = document.querySelector('.close-menu');
const navLinks = document.querySelectorAll('.nav a');

function openMenu() {
  nav.classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeMenu() {
  nav.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

burger.addEventListener('click', openMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// 2. Улюблені
const favoriteBtns = document.querySelectorAll('.favorite-btn');

favoriteBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('active');
  });
});

// 3. Динамічна фільтрація
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || filterValue === category) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// 4. Анімована кнопка зі станом завантаження
const registerForm = document.getElementById('register-form');
const submitBtn = document.getElementById('submit-btn');

if (registerForm && submitBtn) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); //9

    if (!registerForm.checkValidity()) {
      registerForm.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Обробка...';

    setTimeout(() => {
      alert('Реєстрація успішна! (демонстрація)');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      registerForm.reset();
    }, 1500);
  });
}