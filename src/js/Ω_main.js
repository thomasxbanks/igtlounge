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

  setTimeout(() => {
    document.querySelectorAll('.dot').forEach((dot) => {
      dot.classList.remove('is-start');
    });
  }, 1000);

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
const throttle = (action, wait = 100) => {
  let time = Date.now();
  return function() {
    if (time + wait - Date.now() < 0) {
      action();
      time = Date.now();
    }
  };
};
let CurrentScroll = 0;

window.addEventListener(
  'scroll',
  throttle(() => {
    const scrollTop = window.scrollY;
    // log for debug
    console.log(scrollTop, mastheadHeight, heroHeight);
    if (scrollTop > numberizePixels(mastheadHeight)) {
      masthead.setAttribute('data-conditional', 'true');
    } else {
      masthead.setAttribute('data-conditional', 'false');
    }
    if (scrollTop > numberizePixels(heroHeight)) {
      if (scrollTop > CurrentScroll) {
        // Scroll down the page
        masthead.setAttribute('data-state', 'not-visible');
      } else {
        // Scroll up the page
        masthead.setAttribute('data-state', 'is-visible');
      }
    }

    CurrentScroll = scrollTop; // Updates current scroll position
  })
);
