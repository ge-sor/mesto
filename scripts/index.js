import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {profileTitle, profileSubtitle, newProfileTitle,  newProfileSubtitle,
  editButton, newPostButton, profilePopup, cardPopup, formProfile,
  closeProfileButton, closeNewPostButton, cardContainer,
  cardNameInput,
  cardPicInput, formNewPost, selectors
} from './constants.js';
import {initialCards} from './initial-сards.js';


  //рендер карточек из массива
  initialCards.forEach((item) => {
    const card = new Card(item, '.template-card');
    const cardElement = card.generateCard();

    // Добавляем в DOM
    cardContainer.append(cardElement);
  });


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



const validationEditProfile = new FormValidator(selectors, formProfile);
validationEditProfile.enableValidation();

const validationNewPlace = new FormValidator(selectors, formNewPost);
validationNewPlace.enableValidation();


//открытие формы изменения профиля, подстановка значений в инпуты
editButton.addEventListener('click', function() {
  newProfileTitle.value = profileTitle.textContent;
  newProfileSubtitle.value = profileSubtitle.textContent;
  openPopup(profilePopup);
  validationEditProfile.hideInputError(formProfile, newProfileTitle);
  validationEditProfile.hideInputError(formProfile, newProfileSubtitle);
});

//открытие формы создания карточки
newPostButton.addEventListener('click', function() {
  formNewPost.reset();
  openPopup(cardPopup)
  validationNewPlace.hideInputError(formNewPost, cardNameInput);
  validationNewPlace.hideInputError(formNewPost, cardPicInput);
});