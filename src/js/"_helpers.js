let urlContains = (needle) => {
  let haystack = window.location.href;
  return haystack.includes(needle) ? true : false;
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

const numberizePixels = (value) => {
  return ~~value.substr(0, value.length - 2);
};

let log = (value) => {
  console.log(value);
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
