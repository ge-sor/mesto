const openButton = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup_type_edit-profile');
const closeButton = document.querySelector('.popup__close-btn');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const newProfileTitle = document.querySelector('.form__input_type_name');
const newProfileSubtitle = document.querySelector('.form__input_type_caption');
const newPostButton = document.querySelector('.profile__post-btn')
const popupNewPost = document.querySelector('.popup_type_edit-profile')


const openPopup = () => {
  popup.classList.add('popup_opened')
  newProfileTitle.value = profileTitle.textContent;
  newProfileSubtitle.value = profileSubtitle.textContent;
}

const closePopup = () => {
  popup.classList.remove('popup_opened')
}

openButton.addEventListener('click', openPopup)

closeButton.addEventListener('click', closePopup)

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup()
  }

})

const formElement = document.querySelector('.form');

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileTitle.textContent = newProfileTitle.value;
    profileSubtitle.textContent = newProfileSubtitle.value;
    closePopup()
}

formElement.addEventListener('submit', handleFormSubmit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
