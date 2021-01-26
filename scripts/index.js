const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const newProfileTitle = document.querySelector('.form__input_type_name');
const newProfileSubtitle = document.querySelector('.form__input_type_caption');
const editButton = document.querySelector('.profile__edit-btn');
const newPostButton = document.querySelector(".profile__post-btn");
const profilePopup = document.querySelector('.popup_type_edit-profile');
const cardPopup = document.querySelector('.popup_type_new-post');
const formProfile = document.querySelector('.form_type_profile');
const closeProfileButton = document.querySelector('.popup__close-btn_profile');
const closeNewPostButton = document.querySelector(".popup__close-btn_new-card");
const cardContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector(".template__card").content;
const openPicPopup = document.querySelector('.popup_type_fullscreen-pic');
const closeCard = document.querySelector('.popup__close-btn_fullscreen-pic');
const cardNameInput = document.querySelector(".form__input_type_place-name");
const cardPicInput = document.querySelector(".form__input_type_pic");
const formNewPost = document.querySelector(".form_type_new-post");
const fullscreenImage = document.querySelector('.popup__image-fullscreen');
const fullscreenText = document.querySelector('.popup__text-fullscreen')


//функция открытия попапа
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened')
  }

//функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened')
}

//сохранение изменений данных профиля и закрытие попапа профиля
function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = newProfileTitle.value;
  profileSubtitle.textContent = newProfileSubtitle.value;
  closePopup(profilePopup)
}


//переключение класса кнопки лайк
function likeCard(evt) {
	evt.target.classList.toggle('card__like-btn_active');}

//удаление карточки
function deleteCard(evt) {
	evt.target.closest('.card').remove();}

//попап карточки
function handleCardPopup(evt) {
  closestImage = evt.target.closest('.card__image');
  closestCard = evt.target.closest('.card');
  openPopup(openPicPopup);
  fullscreenImage.src = closestImage.src;
  fullscreenImage.alt = closestCard.querySelector('.card__text').textContent;
  fullscreenText.textContent = closestCard.querySelector('.card__text').textContent;
}

//создание карточек из массива с помощью template
function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image')
  card.querySelector('.card__text').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  card.querySelector('.card__like-btn').addEventListener('click', likeCard);
  cardImage.addEventListener('click', handleCardPopup);
  card.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
  return card;
};

//рендер карточек из массива
function render() {
  initialCards.forEach((item) => {
    cardContainer.append(createCard(item))
  });
};
render();

//создание новой карточки с помощью попапа
function handleCardSubmit (evt) {
  evt.preventDefault();
  const cardInputs = {
    link: cardPicInput.value,
    name: cardNameInput.value,
  }
  cardContainer.prepend(createCard(cardInputs));
  closePopup(cardPopup);
  formNewPost.reset();
}

//сохранение новой карточки и закрытие попапа
formNewPost.addEventListener('submit', handleCardSubmit)

//открытие формы изменения профиля, подстановка значений в инпуты
editButton.addEventListener('click', function() {
  openPopup(profilePopup);
  newProfileTitle.value = profileTitle.textContent;
  newProfileSubtitle.value = profileSubtitle.textContent;
});

//открытие формы создания карточки
newPostButton.addEventListener('click', function() {
  openPopup(cardPopup)
});


//закрытие попапа профиля по щелчку на задний фон
profilePopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(profilePopup)
  }
})

//сохранение профиля и закрытие попапа
formProfile.addEventListener('submit', handleProfileSubmit);

//закрытие попапа создания карточки по щелчку на задний фон
cardPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(cardPopup)
  }
})

//закрытие попапа профиля по щелчку на крестик
closeProfileButton.addEventListener('click', function() {
  closePopup(profilePopup)
});

//закрытие попапа карточки по щелчку на крестик
closeNewPostButton.addEventListener('click', function() {
  closePopup(cardPopup)
});

//закрытие попапа карточки по щелчку на задний фон
openPicPopup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(openPicPopup)
  }
})

//закрытие попапа карточки по щелчку на крестик
closeCard.addEventListener('click', function() {
  closePopup(openPicPopup)
});








