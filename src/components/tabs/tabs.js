let tabsContainer = document.querySelector('.tabs-container');
let tabsNavItems = tabsContainer.querySelectorAll('.tabs_nav_item');
let tabsTabs = tabsContainer.querySelectorAll('.tab');

const makeNavsInactive = () => {
  tabsNavItems.forEach((navItem) => {
    navItem.setAttribute('data-state', 'not-active');
  });
};

const makeTabsInactive = () => {
  tabsTabs.forEach((tab) => {
    tab.setAttribute('data-state', 'not-active');
  });
};

const makeNavActive = (target) => {
  document.querySelector(`.tab_nav_item[data-target="${target}"]`).setAttribute('data-state', 'is-active');
};

const makeTabActive = (target) => {
  document.querySelector(`.tab[data-target="${target}"]`).setAttribute('data-state', 'is-active');
};

tabsNavItems.forEach((navItem) => {
  navItem.addEventListener('click', (e) => {
    var target = e.currentTarget.getAttribute('data-target');
    makeTabsInactive();
    makeNavsInactive();
    makeTabActive(target);
    makeNavActive(target);
  });
});
