'use strict';

// Make navbar transparent when it is on the top
const $navbar = document.querySelector('#navbar');
const navbarHeight = $navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    $navbar.classList.add('navbar--dark');
  } else {
    $navbar.classList.remove('navbar--dark');
  }
});

//Handle Scrolling when tapping on the navbar menu
const $navbarMenu = document.querySelector('.navbar__menu');
$navbarMenu.addEventListener('click', (event) => {
  scrollIntoView(event);
});

// Handle click on 'contact me' button on Home
const $homeContact = document.querySelector('.home__contact');
$homeContact.addEventListener('click', (event) => {
  scrollIntoView(event);
});

// Make Home slowly fade to transparent as the window scrolls down
const $home = document.querySelector('.home__container');
const homeHeight = $home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  $home.style.opacity = 1 - window.scrollY / homeHeight;
});

function scrollIntoView(event) {
  const link = event.target.dataset.link;
  if (!link) {
    return;
  }
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
