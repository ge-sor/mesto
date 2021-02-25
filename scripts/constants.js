const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const newProfileTitle = document.querySelector('.form__input_type_name');
const newProfileSubtitle = document.querySelector('.form__input_type_caption');
const editButton = document.querySelector('.profile__edit-btn');
const newPostButton = document.querySelector(".profile__post-btn");
const profilePopup = document.querySelector('.popup_type_edit-profile');
const cardPopup = document.querySelector('.popup_type_new-post');
const formProfile = document.querySelector('.form_type_profile');
const closeProfileButton = document.querySelector('.popup__close-btn_profile');
const closeNewPostButton = document.querySelector(".popup__close-btn_new-card");
const cardContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector(".template-card").content;
const openPicPopup = document.querySelector('.popup_type_fullscreen-pic');
const closeCardButton = document.querySelector('.popup__close-btn_fullscreen-pic');
const cardNameInput = document.querySelector(".form__input_type_place-name");
const cardPicInput = document.querySelector(".form__input_type_pic");
const formNewPost = document.querySelector(".form_type_new-post");
const fullscreenImage = document.querySelector('.popup__image-fullscreen');
const fullscreenText = document.querySelector('.popup__text-fullscreen');
const popupElement = document.querySelector('.popup');

export {profileTitle, profileSubtitle, newProfileTitle,  newProfileSubtitle, 
    editButton, newPostButton, profilePopup, cardPopup, formProfile,
    closeProfileButton, closeNewPostButton, cardContainer,
    cardTemplate, openPicPopup, closeCardButton, cardNameInput,
    cardPicInput, formNewPost, fullscreenImage, fullscreenText, popupElement
}