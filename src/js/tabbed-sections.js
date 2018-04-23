const tabbedSectionContainer = document.querySelector('.tabbed-section_container');
const tabs = document.querySelectorAll('.tabbed-section_tab');
const tabLinks = document.querySelectorAll('.tabbed-section_nav a');

if (tabLinks.length > 0 && tabs.length > 0) {
  tabLinks.forEach((tabLink) => {
    tabLink.addEventListener('click', (e) => {
      e.preventDefault();
      var target = e.currentTarget.getAttribute('href').split('#')[1];
      tabLinks.forEach((tabLink) => {
        tabLink.setAttribute('data-state', 'not-active');
      });
      tabs.forEach((tab) => {
        tab.setAttribute('data-state', 'not-active');
      });
      document.querySelector(`a[href="#${target}"]`).setAttribute('data-state', 'is-active');
      document.querySelector(`[id="${target}"]`).setAttribute('data-state', 'is-active');
    });
  });
}
