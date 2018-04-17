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

// Get the value of the given parameter
let getURLParameter = (sParam) => {
  let sPageURL = window.location.search.substring(1);
  let sURLVariables = sPageURL.split('&');
  sURLVariables.forEach((object, index) => {
    var sParameterName = sURLVariables[index].split('=');
    if (sParameterName[0] == sParam) {
      // Log for debug
      console.log('URL parameter:', sParameterName[1]);
      return sParameterName[1];
    }
  });
};

let urlContains = (needle) => {
  let haystack = window.location.href;
  return haystack.includes(needle) ? true : false;
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

function easeInOut(currentTime, start, change, duration) {
  currentTime /= duration / 2;
  if (currentTime < 1) {
    return change / 2 * currentTime * currentTime + start;
  }
  currentTime -= 1;
  return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}

let log = (value) => {
  console.log(value);
};

let requestLogin = () => {
  alert('You must be logged in');
};

const openModal = () => {
  document.querySelector('.modal__container').setAttribute('data-state', 'is-active');
  document.documentElement.style.overflow = `hidden`;
};

const closeModal = () => {
  document.querySelector('.modal__container').setAttribute('data-state', 'not-active');
  document.documentElement.style.overflow = ``;
};

const viewGameDetails = (target) => {
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumbnail) => {
    thumbnail.setAttribute('data-state', 'not-active');
  });
  document.querySelector(`[data-target="${target}"]`).setAttribute('data-state', 'is-active');
};

const openSidebar = () => {
  document.querySelector('.sidebar').setAttribute('data-state', 'is-active');
  document.documentElement.style.overflow = `hidden`;
};

const closeSidebar = () => {
  document.querySelector('.sidebar').setAttribute('data-state', 'not-active');
  document.documentElement.style.overflow = ``;
};
