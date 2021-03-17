const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const newProfileTitle = document.querySelector('.form__input_type_name');
const newProfileSubtitle = document.querySelector('.form__input_type_caption');
const editButton = document.querySelector('.profile__edit-btn');
const newPostButton = document.querySelector(".profile__post-btn");
const profilePopup = '.popup_type_edit-profile';
const cardPopup = document.querySelector('.popup_type_new-post');
const formProfile = document.querySelector('.form_type_profile');
const closeProfileButton = document.querySelector('.popup__close-btn_profile');
const closeNewPostButton = document.querySelector(".popup__close-btn_new-card");
const cardContainer = '.cards__list';
const openPicPopup = document.querySelector('.popup_type_fullscreen-pic');
const closeCardButton = document.querySelector('.popup__close-btn_fullscreen-pic');
const cardNameInput = document.querySelector(".form__input_type_place-name");
const cardPicInput = document.querySelector(".form__input_type_pic");
const formNewPost = document.querySelector(".form_type_new-post");
const fullscreenImage = document.querySelector('.popup__image-fullscreen');
const fullscreenText = document.querySelector('.popup__text-fullscreen');
const popupElement = document.querySelector('.popup');
const closePopupButton = '.popup__close-btn';
const selectors = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    formSetSelector: '.form__set'
  }
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


export {profileTitle, profileSubtitle, newProfileTitle,  newProfileSubtitle,
    editButton, newPostButton, profilePopup, cardPopup, formProfile,
    closeProfileButton, closeNewPostButton, cardContainer,
    openPicPopup, closeCardButton, cardNameInput,
    cardPicInput, formNewPost, fullscreenImage, fullscreenText, popupElement, selectors, initialCards,
    closePopupButton
}
