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
};

let CurrentScroll = 0;
window.addEventListener(
  'scroll',
  throttle(() => {
    const scrollTop = window.scrollY;

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

    let volatilityMeters = document.querySelectorAll('.volatility-meter_container');
    volatilityMeters.forEach((volatilityMeter) => {
      let dot = volatilityMeter.querySelector('.dot');
      if (isElementInViewport(volatilityMeter)) {
        dot.classList.remove('is-start');
      } else {
        dot.classList.add('is-start');
      }
    });
  })
);
