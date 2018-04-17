const viewGameDetails = (target) => {
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumbnail) => {
    thumbnail.setAttribute('data-state', 'not-active');
  });
  document.querySelector(`[data-target="${target}"]`).setAttribute('data-state', 'is-active');
};
