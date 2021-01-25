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

//переключение класса для всех попапов
function togglePopup(popupElement) {
    popupElement.classList.toggle('popup_opened')
  }

//открытие формы изменения профиля, подстановка значений в инпуты
  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  const newProfileTitle = document.querySelector('.form__input_type_name');
  const newProfileSubtitle = document.querySelector('.form__input_type_caption');
  const editButton = document.querySelector('.profile__edit-btn');
editButton.addEventListener('click', function() {
  togglePopup(profilePopup);
  newProfileTitle.value = profileTitle.textContent;
  newProfileSubtitle.value = profileSubtitle.textContent;
});

//открытие формы создания карточки
const newPostButton = document.querySelector(".profile__post-btn");
newPostButton.addEventListener('click', function() {
  togglePopup(cardPopup)
});


//закрытие попапа профиля по щелчку на задний фон
const profilePopup = document.querySelector('.popup_type_edit-profile');
profilePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup(profilePopup)
  }
})

//закрытие попапа создания карточки по щелчку на задний фон
const cardPopup = document.querySelector('.popup_type_new-post');
cardPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup(cardPopup)
  }
})

//сохранение изменений данных профиля и закрытие попапа профиля
const formProfile = document.querySelector('.form_type_profile');
function handleProfileSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = newProfileTitle.value;
    profileSubtitle.textContent = newProfileSubtitle.value;
    togglePopup(profilePopup)
}
formProfile.addEventListener('submit', handleProfileSubmit);

//закрытие попапа профиля по щелчку на крестик
const closeButton = document.querySelector('.popup__close-btn');
closeButton.addEventListener('click', function() {
  togglePopup(profilePopup)
});

//закрытие попапа пкарточки по щелчку на крестик
const closeNewPostButton = document.querySelector(".popup__close_new-card");
closeNewPostButton.addEventListener('click', function() {
  togglePopup(cardPopup)
});

//рендер карточек из массива
function render() {
  initialCards.forEach(renderItem);
};

//создание карточек из массива с помощью template
const cards = document.querySelector(".cards__list");
const cardTemplate = document.querySelector(".template__card").content;
const openPicPopup = document.querySelector('.popup_type_fullscreen-pic');
function renderItem(initialCards) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__text').textContent = initialCards.name;
  card.querySelector('.card__image').src = initialCards.link;
  card.querySelector('.card__like-btn').addEventListener('click', likeCard);
  card.querySelector('.card__image').addEventListener('click', openPicButton);
  card.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
  cards.append(card)
};

//переключение класса кнопки лайк
function likeCard(evt) {
	evt.target.classList.toggle('card__like-btn_active');}

//удаление карточки
function deleteCard(evt) {
	evt.target.closest('.card').remove();}

//попап карточки
function openPicButton(evt) {
  closestImage = evt.target.closest('.card__image');
  togglePopup(openPicPopup);
  document.querySelector('.card__image_full').src = closestImage.src;
  document.querySelector('.card__text_full').textContent = closestImage.nextElementSibling.textContent;
}

//закрытие попапа карточки по щелчку на задний фон
openPicPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup(openPicPopup)
  }
})

//закрытие попапа карточки по щелчку на крестик
const closeCard = document.querySelector('.popup__close_fullscreen-pic');
closeCard.addEventListener('click', function() {
  togglePopup(openPicPopup)
});

//создание новой карточки с помощью попапа
  const cardNameInput = document.querySelector(".form__input_type_place-name");
  const cardPicInput = document.querySelector(".form__input_type_pic");
  const newPostSubmit = document.querySelector(".popup_type_place-save");
  const formNewPost = document.querySelector(".form_type_new-post");
function handleCardSubmit (evt) {
  evt.preventDefault();
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__text').textContent = cardNameInput.value;
  card.querySelector('.card__image').src = cardPicInput.value;
  card.querySelector('.card__like-btn').addEventListener('click', likeCard);
  card.querySelector('.card__delete-btn').addEventListener('click', deleteCard)
  cards.prepend(card);
  togglePopup(cardPopup);
  formNewPost.reset();
}
formNewPost.addEventListener('submit', handleCardSubmit)

render();






