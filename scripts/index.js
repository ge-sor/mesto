
import {profileTitle, profileSubtitle, newProfileTitle,  newProfileSubtitle,
  editButton, newPostButton, profilePopup, cardPopup, formProfile,
  closeProfileButton, closeNewPostButton, closeCardButton, openPicPopup, cardContainer,
  cardNameInput,
  cardPicInput, formNewPost, selectors, initialCards
} from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';


const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template-card');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardContainer)

cardList.renderItems();

const newPopup = new Popup(profilePopup)


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

//сохранение изменений данных профиля и закрытие попапа профиля
function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = newProfileTitle.value;
  profileSubtitle.textContent = newProfileSubtitle.value;
  newPopup.close();
}




//сохранение профиля и закрытие попапа
formProfile.addEventListener('submit', handleProfileSubmit);





//создание новой карточки с помощью попапа
function handleCardSubmit (evt) {
  evt.preventDefault();
  const newPostSaveButton = formNewPost.querySelector('.popup__save-btn_type_place-save');
  const cardInputs = {
    link: cardPicInput.value,
    name: cardNameInput.value,
  }

  // Добавляем в DOM
  cardContainer.prepend(createCard(cardInputs, '.template-card'));
  closePopup(cardPopup);
  formNewPost.reset();
  validationNewPlace.disableSubmitButton(newPostSaveButton);
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
  newPopup.open();
  validationEditProfile.resetValidation();
});

//открытие формы создания карточки
newPostButton.addEventListener('click', function() {
  formNewPost.reset();
  openPopup(cardPopup);
  validationNewPlace.resetValidation();
});

