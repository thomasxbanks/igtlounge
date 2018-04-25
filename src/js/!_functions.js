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
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) /*or $(window).height() */ &&
    rect.right <=
      (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}

const dirty = (event) => {
  event.currentTarget.setAttribute('data-state', 'not-pristine');
};

const validate = (event) => {
  var thisInput = event.currentTarget;
  var thisInputContainer = thisInput.parentElement;
  var valid = thisInput.checkValidity();
  if (valid) {
    thisInputContainer.querySelector('.input-validation-message').style.display = `none`;
  } else {
    thisInputContainer.querySelector('.input-validation-message').style.display = `block`;
  }
};

// @TODO: Dummy functions to be replaced with actual ones
// when the Pimcore API is available
let requestLogin = () => {
  alert('You must be logged in to access this area of the site.');
};

let login = () => {
  window.location.href = '/admin';
};

let requestLogout = () => {
  window.location.href = '/';
};

let addGame = (data) => {
  console.table(data);
};

let addUser = (data) => {
  console.table(data);
};

let duplicateRow = (el) => {
  var thisRow = el.parentElement.querySelector('.input-joined_row');
  el.insertAdjacentHTML('beforebegin', thisRow.outerHTML);
};

let editUser = (uid) => {
  window.location.href = `/admin/users/edit-user?user=${uid}`;
};

let deleteUser = (uid) => {
  if (confirm('Are you sure you want to delete this user?')) {
    console.log(`User ${uid} has been deleted`);
    document.querySelector(`[title="${uid}"]`).parentElement.outerHTML = ``;
  }
};
