// Make a button enabled
let enableButton = (target) => {
  document.querySelector(target).prop('disabled', false);
};

// Make a button disabled
let disableButton = (target) => {
  document.querySelector(target).prop('disabled', true);
};

// Destroy element
let destroyElement = (element) => {
  document.querySelector(element).outerHTML = '';
};

function isElementInViewport(el) {
  //special bonus for those using jQuery
  if (typeof jQuery === 'function' && el instanceof jQuery) {
    el = el[0];
  }

  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) /*or $(window).height() */ &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}

// @TODO: Dummy functions to be replaced with actual ones
// when the Pimcore API is available
let requestLogin = () => {
  window.location.href = '/admin';
};

let requestLogout = () => {
  window.location.href = '/';
};

let addGame = (data) => {
  console.table(data);
};
