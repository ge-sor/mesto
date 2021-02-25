import {profileTitle, profileSubtitle, newProfileTitle,  newProfileSubtitle,
  editButton, newPostButton, profilePopup, cardPopup, formProfile,
  closeProfileButton, closeNewPostButton, cardContainer,
  cardTemplate, openPicPopup, closeCardButton, cardNameInput,
  cardPicInput, formNewPost, fullscreenImage, fullscreenText, popupElement
} from './constants.js';
import {initialCards} from './initial-сards.js';



//функция открытия попапов
function openPopup(popupElement) {
  document.addEventListener('keydown', handleClosePopup)
  popupElement.addEventListener('click', handleClosePopup)
  popupElement.classList.add('popup_opened');
}

//функция закрытия попапов
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopup)
  popupElement.removeEventListener('click', handleClosePopup)
}

//закрытие любого попапа кликом на оверлей
const handleClosePopup = (evt) => {
  const popupActive = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' || evt.target === evt.currentTarget) {
    closePopup(popupActive)
  }
}

//сохранение изменений данных профиля и закрытие попапа профиля
function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = newProfileTitle.value;
  profileSubtitle.textContent = newProfileSubtitle.value;
  closePopup(profilePopup)
}

//открытие формы изменения профиля, подстановка значений в инпуты
editButton.addEventListener('click', function() {
  openPopup(profilePopup);
  newProfileTitle.value = profileTitle.textContent;
  newProfileSubtitle.value = profileSubtitle.textContent;
  const profileSaveButton = formProfile.querySelector('.popup__save-btn_type_profile-save')
  profileSaveButton.classList.remove('button_inactive');
  profileSaveButton.disabled = false;
});


//сохранение профиля и закрытие попапа
formProfile.addEventListener('submit', handleProfileSubmit);


//закрытие попапа профиля по щелчку на крестик
closeProfileButton.addEventListener('click', function() {
  closePopup(profilePopup)
});

//закрытие попапа создания карточки по щелчку на крестик
closeNewPostButton.addEventListener('click', function() {
  closePopup(cardPopup)
});

//открытие формы создания карточки
newPostButton.addEventListener('click', function() {
  openPopup(cardPopup)
});

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





//создание новой карточки с помощью попапа
function handleCardSubmit (evt) {
  evt.preventDefault();
  const newPostSaveButton = formNewPost.querySelector('.popup__save-btn_type_place-save');
  const cardInputs = {
    link: cardPicInput.value,
    name: cardNameInput.value,
  }

  const card = new Card(cardInputs, '.template-card');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardContainer.prepend(cardElement);
  closePopup(cardPopup);
  formNewPost.reset();
  newPostSaveButton.classList.add('button_inactive');
  newPostSaveButton.disabled = true;
}

//сохранение новой карточки и закрытие попапа
formNewPost.addEventListener('submit', handleCardSubmit)


class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
  this._element = this._getTemplate();
  this._setEventListeners();

  const cardImage = this._element.querySelector('.card__image')
  cardImage.src = this._image;
  cardImage.alt = this._title;
  this._element.querySelector('.card__text').textContent = this._title;

  cardImage.addEventListener('click', handleCardPopup);
  this._element.querySelector('.card__like-btn').addEventListener('click', likeCard);
  this._element.querySelector('.card__delete-btn').addEventListener('click', deleteCard);

  return this._element;
}


  _handleOpenPopup() {
    popupImage.src = this._image;
    popupElement.classList.add('popup_opened')
  }
  _handleClosePopup() {
    popupImage.src = '';
    popupElement.classList.remove('popup_opened')
  }
  _setEventListeners() {
  this._element.addEventListener('click', () => {
    this._handleOpenPopup()
  });
//закрытие попапа карточки по щелчку на крестик
  closeCardButton.addEventListener('click', () => {
    this._handleClosePopup()
  });
}
}
//рендер карточек из массива
initialCards.forEach((item) => {
  const card = new Card(item, '.template-card');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardContainer.append(cardElement);
});






