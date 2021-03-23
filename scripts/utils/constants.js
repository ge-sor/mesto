export const selectors = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    formSetSelector: '.form__set'
  }
export const initialCards = [
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
  export const cardContainer = '.cards__list';
  export const profilePopupSelector = '.popup_type_edit-profile';
  export const newPostPopupSelector = '.popup_type_new-post';
  export const cardPopupSelector = '.popup_type_fullscreen-pic';

  export const editButton = document.querySelector('.profile__edit-btn');
  export const newPostButton = document.querySelector(".profile__post-btn");
  export const formProfile = document.querySelector('.form_type_profile');
  export const formNewPost = document.querySelector(".form_type_new-post");
  export const fullscreenImage = document.querySelector('.popup__image-fullscreen');
  export const fullscreenText = document.querySelector('.popup__text-fullscreen');
  export const popupElement = document.querySelector('.popup');
