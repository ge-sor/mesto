import './pages/index.css';
import {
  editButton,
  newPostButton,
  profilePopupSelector,
  newPostPopupSelector,
  cardPopupSelector,
  formProfile,
  cardContainer,
  formNewPost,
  selectors,
  initialCards
} from './scripts/utils/constants.js';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import Section from './scripts/components/Section.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import UserInfo from './scripts/components/UserInfo.js';

const cardPopup = new PopupWithImage(cardPopupSelector);
const user = new UserInfo('.profile__title', '.profile__subtitle');

//добавляем в DOM карточки из заготовленного маcсива initialCards
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        cardPopup.open(item.name, item.link);
      }
    }, '.template-card');
    const cardElement = card.generateCard();
    cardList.addItemToEnd(cardElement);
  }
}, cardContainer)
cardList.renderItems();
cardPopup.setEventListeners();

//функция изменения данных профиля
const profilePopup = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handleFormSubmit: () => {
    user.setUserInfo();
    validationEditProfile.enableValidation();
  }});

//функция добавления новой карточки
const newPostPopup = new PopupWithForm({
  popupSelector: newPostPopupSelector,
  handleFormSubmit: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        cardPopup.open(item.name, item.link);
      }
    }, '.template-card');
    const cardElement = card.generateCard();
    cardList.addItemToStart(cardElement);
  }
});

//открытие формы изменения профиля
editButton.addEventListener('click', () => {
  profilePopup.open();
  user.getUserInfo();
  validationEditProfile.enableValidation();
})

profilePopup.setEventListeners();

//открытие формы добавления новой карточки
newPostButton.addEventListener('click', () => {
  newPostPopup.open();
  validationNewPlace.enableValidation();
})

newPostPopup.setEventListeners();

//включение валидации форм профиля
const validationEditProfile = new FormValidator(selectors, formProfile);
validationEditProfile.enableValidation();

//включение валидации форм создания карточки
const validationNewPlace = new FormValidator(selectors, formNewPost);
validationNewPlace.enableValidation();


