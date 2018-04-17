// What are the browser dimensions?
let browser = {
  width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
};

const masthead = document.querySelector('#masthead');
const hero = document.querySelector('.hero_wrapper');
const mastheadHeight = window.getComputedStyle(masthead, null).getPropertyValue('height');
const heroHeight = window.getComputedStyle(hero, null).getPropertyValue('height');
