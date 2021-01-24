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

const editButton = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-btn');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const newProfileTitle = document.querySelector('.form__input_type_name');
const newProfileSubtitle = document.querySelector('.form__input_type_caption');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const cardPopup = document.querySelector('.popup_type_new-post');
const newPostButton = document.querySelector(".profile__post-btn");
const cardTemplate = document.querySelector(".template__card").content;
const cards = document.querySelector(".cards__list");
const cardNameInput = document.querySelector(".form__input_type_place-name");
const cardPicInput = document.querySelector(".form__input_type_pic");
const newPostSubmit = document.querySelector(".popup_type_place-save");
const closeNewPostButton = document.querySelector(".popup__close_new-card");
const formNewPost = document.querySelector(".form_type_new-post");
const popupCard = document.querySelector(".popup_type_new-post");


function togglePopup(popupElement) {
    popupElement.classList.toggle('popup_opened')
  }

editButton.addEventListener('click', function() {
  togglePopup(profilePopup);
  newProfileTitle.value = profileTitle.textContent;
  newProfileSubtitle.value = profileSubtitle.textContent;
});

newPostButton.addEventListener('click', function() {
  togglePopup(cardPopup)
});

profilePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup(profilePopup)
  }
})

cardPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup(cardPopup)
  }
})

const formProfile = document.querySelector('.form_type_profile');

function handleProfileSubmit (evt) {
    evt.preventDefault();

    profileTitle.textContent = newProfileTitle.value;
    profileSubtitle.textContent = newProfileSubtitle.value;
    togglePopup(profilePopup)
}

formProfile.addEventListener('submit', handleProfileSubmit);


function render() {
  initialCards.forEach(renderItem);
};

function renderItem(initialCards) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__text').textContent = initialCards.name;
  card.querySelector('.card__image').src = initialCards.link;
  card.querySelector('.card__like-btn').addEventListener('click', likeCard);
  card.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
  cards.append(card)
};

function likeCard(evt) {
	evt.target.classList.toggle('card__like-btn_active');}

function deleteCard(evt) {
	evt.target.closest('.card').remove();}

function handleCardSubmit (evt) {
  evt.preventDefault();
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__text').textContent = cardNameInput.value;
  card.querySelector('.card__image').src = cardPicInput.value;
  card.querySelector('.card__delete-btn').addEventListener('click', deleteCard)
  cards.prepend(card);
  togglePopup(cardPopup);
  formNewPost.reset();
}

formNewPost.addEventListener('submit', handleCardSubmit)


render();






