import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import {
  profileTitle,
  profileSubtitle,
  newProfileTitle,
  newProfileSubtitle,
  editButton,
  newPostButton,
  profilePopupSelector,
  newPostPopupSelector,
  cardPopupSelector,
  formProfile,
  closeProfileButton,
  closeNewPostButton,
  closeCardButton,
  cardContainer,
  cardNameInput,
  cardPicInput,
  formNewPost,
  selectors,
  initialCards
} from './constants.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';


//добавляем в DOM карточки из заготовленного маcсива initialCards
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template-card');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardContainer)
cardList.renderItems();



const profilePopup = new PopupWithForm(profilePopupSelector);
profilePopup.setEventListeners();
const newPostPopup = new PopupWithForm(newPostPopupSelector);
const cardPopup = new PopupWithImage(cardPopupSelector);

//открытие формы изменения профиля, подстановка значений в инпуты
editButton.addEventListener('click', function() {

  profilePopup.open();
  validationEditProfile.resetValidation();
});

//сохранение профиля и закрытие попапа
formProfile.addEventListener('submit', handleProfileSubmit);

//сохранение изменений данных профиля и закрытие попапа профиля
function handleProfileSubmit (evt) {
  evt.preventDefault();

  profilePopup.close();
}

//создание новой карточки с помощью попапа
function handleCardSubmit (evt) {
  evt.preventDefault();
  const newCard = new Card({
    data: item,

  })
  const cardInputs = {
    link: cardPicInput.value,
    name: cardNameInput.value,
  }

  // Добавляем в DOM
  cardContainer.prepend(createCard(cardInputs, '.template-card'));
  newPostPopup.close();
  formNewPost.reset();
  validationNewPlace.disableSubmitButton(newPostSaveButton);
}

//сохранение новой карточки и закрытие попапа
formNewPost.addEventListener('submit', handleCardSubmit)


//включаем валидацию форм профиля
const validationEditProfile = new FormValidator(selectors, formProfile);
validationEditProfile.enableValidation();

//включаем валидацию форм создания карточки
const validationNewPlace = new FormValidator(selectors, formNewPost);
validationNewPlace.enableValidation();



//открытие формы создания карточки
newPostButton.addEventListener('click', function() {
  formNewPost.reset();
  newPostPopup.open();
  validationNewPlace.resetValidation();
});


//функция открытия попапов
/*  function openPopup(popupElement) {
  document.addEventListener('keydown', handleClosePopup)
  popupElement.addEventListener('click', handleClosePopup)
  popupElement.addEventListener('click', handleClosePopupByOverlay)
  popupElement.classList.add('popup_opened');
}

//функция закрытия попапов
  function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopup)
  popupElement.removeEventListener('click', handleClosePopup)
  popupElement.removeEventListener('click', handleClosePopupByOverlay)
}

 //закрытие любого попапа кликом на оверлей
const handleClosePopup = (evt) => {
  const popupActive = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupActive)
  }
}

const handleClosePopupByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

//закрытие попапа профиля по щелчку на крестик
closeProfileButton.addEventListener('click', function() {
  closePopup(profilePopup)
});

//закрытие попапа создания карточки по щелчку на крестик
closeNewPostButton.addEventListener('click', function() {
  closePopup(cardPopup)
});

closeCardButton.addEventListener('click', function() {
  closePopup(openPicPopup)
});
 */

