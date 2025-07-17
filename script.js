const burger = document.getElementById('burger');
const nav = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});
