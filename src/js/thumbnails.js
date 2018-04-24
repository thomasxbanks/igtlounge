const viewGameDetails = (target) => {
  const thumbnails = document.querySelectorAll('.thumbnail');
  disableThumbnails(thumbnails);
  // closeTabbedSection();
  enableThumbnail(target);
  // openTabbedSection();
};

const disableThumbnails = (thumbnails) => {
  thumbnails.forEach((thumbnail) => {
    thumbnail.setAttribute('data-state', 'not-active');
  });
};

const enableThumbnail = (target) => {
  document.querySelectorAll(`[data-target="${target}"]`).forEach((target) => {
    target.setAttribute('data-state', 'is-active');
  });
};

const openTabbedSection = () => {
  tabbedSectionContainer.setAttribute('data-state', 'is-active');
};

const closeTabbedSection = () => {
  tabbedSectionContainer.setAttribute('data-state', 'not-active');
};
