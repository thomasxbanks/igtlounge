'use strict';

window.onload = () => {
  document.documentElement.classList.replace('no-js', 'is-js'); // Tells us that JS isn't disabled in the browser.

  if (window.location.href.indexOf('local') <= 0) {
    // In case we forget to remove the .redline class prior to production,
    // this will remove it for us.
    // Presumes we're using a xxx.local or localhost:PORT syntax development URI
    // If we aren't, amend the string in the includes() function
    document.documentElement.classList.remove('redline');
    document.getElementById('devCss').outerHTML = '';
  }

  let tabLinks = document.querySelectorAll('.tabbed-section__nav a');
  let tabs = document.querySelectorAll('.tabbed-section__tab');
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
};
