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
  const target = event.target;
  const link = target.dataset.link;
  if (!link) {
    return;
  }
  $navbarMenu.classList.remove('open');
  scrollIntoView(link);
  selectNavItem(target);
});

// Navbar toggle btn for small screen
const $navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
$navbarToggleBtn.addEventListener('click', () => {
  $navbarMenu.classList.toggle('open');
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

// Activate navbar menu when scroll to section

// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 2. Intersection observer를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화한다.
const $sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
const sections = $sectionIds.map((id) => document.querySelector(id));
const navItems = $sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`));

// 새로운 옵저버를 만들어서 콜백과 옵션을 전달한 후 만들어진 옵저버를 통해 각 섹션들을 관찰
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

let selectedNavItem = navItems[0];
let selectedNavIndex = 0;

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      //entry 가 화면을 빠져나갈 때
      const index = $sectionIds.indexOf(`#${entry.target.id}`);
      //아래로 스크롤링되어 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else if (entry.boundingClientRect.y > 0) {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => {
  observer.observe(section);
});

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
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
  selectNavItem(navItems[$sectionIds.indexOf(selector)]);
}
