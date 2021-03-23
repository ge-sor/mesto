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
import UserInfo from './UserInfo.js';

const cardPopup = new PopupWithImage(cardPopupSelector);

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

const user = new UserInfo('.profile__title', '.profile__subtitle');

console.log(user.getUserInfo())

const profilePopup = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handleFormSubmit: () => {
    user.setUserInfo();
  }});

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


newPostButton.addEventListener('click', () => {
  newPostPopup.open();
  validationNewPlace.enableValidation();
})

newPostPopup.setEventListeners();


editButton.addEventListener('click', () => {
  
  profilePopup.open();
  user.getUserInfo();
  
  validationEditProfile.enableValidation();
})


profilePopup.setEventListeners();

//включаем валидацию форм профиля
const validationEditProfile = new FormValidator(selectors, formProfile);
validationEditProfile.enableValidation();

//включаем валидацию форм создания карточки
const validationNewPlace = new FormValidator(selectors, formNewPost);
validationNewPlace.enableValidation();


