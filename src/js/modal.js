const openModal = () => {
  document.querySelector('.modal__container').setAttribute('data-state', 'is-active');
  document.documentElement.style.overflow = `hidden`;
};

const closeModal = () => {
  document.querySelector('.modal__container').setAttribute('data-state', 'not-active');
  document.documentElement.style.overflow = ``;
};
