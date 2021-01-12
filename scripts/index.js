let openButton = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-btn');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let newProfileTitle = document.querySelector('.form__input_name');
let newProfileSubtitle = document.querySelector('.form__input_caption');


let openPopup = () => {
  popup.classList.add('popup_opened')
  newProfileTitle.value = profileTitle.textContent;
  newProfileSubtitle.value = profileSubtitle.textContent;
}

let closePopup = () => {
  popup.classList.remove('popup_opened')
}

openButton.addEventListener('click', openPopup)

closeButton.addEventListener('click', closePopup)

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup()
  }

})

let formElement = document.querySelector('.form');

function handleFormSubmit (evt) {
    evt.preventDefault();
     
    profileTitle.textContent = newProfileTitle.value;
    profileSubtitle.textContent = newProfileSubtitle.value;
    closePopup()
}

formElement.addEventListener('submit', handleFormSubmit);

