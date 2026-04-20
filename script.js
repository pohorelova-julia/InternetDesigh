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

// 2. Завантаження книг з data.json
const booksGrid = document.getElementById('books-grid');
const loader = document.getElementById('loader');

function renderCards(books) {
  if (!booksGrid) return;

  booksGrid.innerHTML = '';

  books.forEach(book => {
    const cardHTML = `
      <article class="card" data-category="${book.category}">
        <div class="card-header">
          <h3>${book.title}</h3>
          <button class="favorite-btn" aria-label="Додати в улюблене">❤</button>
        </div>
        <img src="${book.image}" alt="Обкладинка книги ${book.title}">
        <p>${book.description}</p>
        <button class="button" ${!book.inStock ? 'disabled' : ''}>
          ${book.inStock ? 'Читати' : 'Немає в наявності'}
        </button>
      </article>
    `;
    booksGrid.insertAdjacentHTML('beforeend', cardHTML);
  });

  initFavoriteButtons();
  applyCurrentFilter();
}

function initFavoriteButtons() {
  const favBtns = document.querySelectorAll('.favorite-btn');
  favBtns.forEach(btn => {
    btn.removeEventListener('click', handleFavoriteClick);
    btn.addEventListener('click', handleFavoriteClick);
  });
}

function handleFavoriteClick(e) {
  e.stopPropagation();
  this.classList.toggle('active');
}

function applyCurrentFilter() {
  const activeFilterBtn = document.querySelector('.filter-btn.active');
  if (activeFilterBtn) {
    const filterValue = activeFilterBtn.getAttribute('data-filter');
    filterCards(filterValue);
  }
}

function filterCards(filterValue) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const category = card.getAttribute('data-category');
    if (filterValue === 'all' || filterValue === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filterValue = btn.getAttribute('data-filter');
    filterCards(filterValue);
  });
});

async function loadBooks() {
  try {
    if (loader) loader.style.display = 'block';

    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`Помилка завантаження: ${response.status}`);
    }
    const books = await response.json();
    renderCards(books);
  } catch (error) {
    console.error('Помилка:', error);
    if (booksGrid) {
      booksGrid.innerHTML = `<div class="error-message">Вибачте, дані тимчасово недоступні. Спробуйте оновити сторінку.</div>`;
    }
  } finally {
    if (loader) loader.style.display = 'none';
  }
}

// 3. Анімована кнопка зі станом завантаження 
const registerForm = document.getElementById('register-form');
const submitBtn = document.getElementById('submit-btn');

if (registerForm && submitBtn) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

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

document.addEventListener('DOMContentLoaded', loadBooks);
