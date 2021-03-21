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


//добавляем в DOM карточки из заготовленного маcсива initialCards
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        cardPopup.open();
      }
    }, '.template-card');
    const cardElement = card.generateCard();
    cardList.addItemToEnd(cardElement);
  }
}, cardContainer)
cardList.renderItems();


const profilePopup = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handleFormSubmit: () => {
    const user = new UserInfo('.form__input_type_name', '.form__input_type_caption');
    user.getUserInfo();
    user.setUserInfo();
  profilePopup.open();
  profilePopup.setEventListeners()
  }});
const newPostPopup = new PopupWithForm({
  popupSelector: newPostPopupSelector,
  handleFormSubmit: (formData) => {
    const card = new Card({
      data: formData,
      handleCardClick: () => {
        cardPopup.open();
      }
    }, '.template-card');
    const cardElement = card.generateCard();
    cardList.addItemToStart(cardElement);
    cardPopup.close();
  }
});
const cardPopup = new PopupWithImage(cardPopupSelector);

newPostButton.addEventListener('click', () => {newPostPopup.open()})
editButton.addEventListener('click', () => {profilePopup.open()})



//включаем валидацию форм профиля
const validationEditProfile = new FormValidator(selectors, formProfile);
validationEditProfile.enableValidation();

//включаем валидацию форм создания карточки
const validationNewPlace = new FormValidator(selectors, formNewPost);
validationNewPlace.enableValidation();


