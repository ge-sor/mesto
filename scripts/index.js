let openButton = document.querySelector('.button__edit-info');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.button__popup_close');


openButton.addEventListener('click', () => {
  popup.classList.add('popup_opened')
})

closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened')
})

popup.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.classList.remove('popup_opened')
  }

})
