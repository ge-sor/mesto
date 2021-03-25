import './index.css';
import {
  editButton,
  newPostButton,
  profilePopupSelector,
  newPostPopupSelector,
  cardPopupSelector,
  formProfile,
  cardContainer,
  formNewPost,
  profileName,
  profileCaption,
  profileNameInput,
  profileCaptionInput,
  selectors,
  initialCards
} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';

const cardPopup = new PopupWithImage(cardPopupSelector);
const defaultUser = new UserInfo(profileName, profileCaption);

const validationEditProfile = new FormValidator(selectors, formProfile);
const validationNewPlace = new FormValidator(selectors, formNewPost);

const createCard = function(item) {
  return new Card({
    data: item,
    handleCardClick: () => {
      cardPopup.openImage(item.name, item.link);
    }
  }, '.template-card');
};

//добавляем в DOM карточки из заготовленного маcсива initialCards
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardList.addItemToEnd(cardElement);
  }
}, cardContainer)
cardList.renderItems();

//функция изменения данных профиля
const profilePopup = new PopupWithForm(
  profilePopupSelector, {
    handleFormSubmit: (data) => {
      defaultUser.setUserInfo(data)
  }
});

//функция добавления новой карточки
const newPostPopup = new PopupWithForm(
  newPostPopupSelector, {
    handleFormSubmit: (item) => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardList.addItemToStart(cardElement);
  }
});

//открытие формы изменения профиля
editButton.addEventListener('click', () => {
  profilePopup.open();
  const userData = defaultUser.getUserInfo();
  profileNameInput.value = userData.name;
  profileCaptionInput.value = userData.caption;
  validationEditProfile.resetValidation();
})

//открытие формы добавления новой карточки
newPostButton.addEventListener('click', () => {
  newPostPopup.open();
  validationNewPlace.resetValidation();
})

validationEditProfile.enableValidation();
validationNewPlace.enableValidation();

cardPopup.setEventListeners();
newPostPopup.setEventListeners();
profilePopup.setEventListeners();


