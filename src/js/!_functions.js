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

function scrollTo(element, to, duration) {
  var start = element.scrollTop,
    change = to - start,
    increment = 20;

  var animateScroll = function(elapsedTime) {
    elapsedTime += increment;
    var position = easeInOut(elapsedTime, start, change, duration);
    element.scrollTop = position;
    if (elapsedTime < duration) {
      setTimeout(function() {
        animateScroll(elapsedTime);
      }, increment);
    }
  };
  animateScroll(0);
}

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

let requestLogin = () => {
  alert('You must be logged in');
};
