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
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

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


