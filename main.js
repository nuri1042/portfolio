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
  const link = event.target.dataset.link;
  if (!link) {
    return;
  }
  scrollIntoView(link);
});

// Handle click on 'contact me' button on Home
const $homeContact = document.querySelector('.home__contact');
$homeContact.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Make Home slowly fade to transparent as the window scrolls down
const $home = document.querySelector('.home__container');
const homeHeight = $home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  $home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show 'Arrow up' button when window scrolling down
const $arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    $arrowUp.classList.add('visible');
  } else {
    $arrowUp.classList.remove('visible');
  }
});
// Handle click on the "arrow up" button
$arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Project filtering
const $workCategory = document.querySelector('.work__categories');
const $workProjects = document.querySelector('.work__projects');
const $projects = document.querySelectorAll('.project');

$workCategory.addEventListener('click', (event) => {
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (!filter) {
    return;
  }

  // remove selection from previous and select the new one
  const $active = document.querySelector('.category__btn.selected');
  $active.classList.remove('selected');
  const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  target.classList.add('selected');

  $workProjects.classList.add('anim-out');
  setTimeout(() => {
    $projects.forEach((project) => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    $workProjects.classList.remove('anim-out');
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
