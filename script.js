const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Close menu when a link is clicked (optional, improves UX)
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

// Optional: close menu if clicking outside (improves UX)
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('open')) {
    nav.classList.remove('open');
  }
});