'use strict';

window.onload = () => {
  document.documentElement.classList.remove('no-js'); // Tells us that JS isn't disabed in the browser.

  if (window.location.href.indexOf('local') <= 0) {
    // In case we forget to remove the .redline class prior to production,
    // this will remove it for us.
    // Presumes we're using a xxx.local or localhost:PORT syntax development URI
    // If we aren't, amend the string in the includes() function
    document.documentElement.classList.remove('redline');
  }
};
