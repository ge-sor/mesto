let openButton = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-btn');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let newProfileTitle = document.querySelector('.form__input_type_name');
let newProfileSubtitle = document.querySelector('.form__input_type_caption');


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

const cardTemplate = document.querySelector(".template__card").content;
const cards = document.querySelector(".cards");
const newPostButton = document.querySelector(".profile__post-btn");
const cardNameInput = document.querySelector(".form__input_type_place-name");
const cardPicInput = document.querySelector(".form__input_type_pic");
const newPostSubmit = document.querySelector(".popup_type_place-save");
const closeNewPostButton = document.querySelector(".popup__close_new-card");

const popupCard = document.querySelector(".popup_type_new-post");

const openCardPopup = () => {
  popupCard.classList.add('popup_opened')
};

newPostButton.addEventListener('click', openCardPopup);

const closeCardPopup = () => {
  popupCard.classList.remove('popup_opened')
};

closeNewPostButton.addEventListener('click', closeCardPopup)

popupCard.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closeCardPopup()
  }
});


function render() {
  initialCards.forEach(renderItem);
};

function renderItem(text) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__text').innerText = text;
  cards.appendChild(card);
};

function handleSubmit(evt) {
  renderItem(cardNameInput.value);
};

newPostSubmit.addEventListener('click', handleSubmit);

render();
