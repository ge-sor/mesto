const openButton = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup_type_edit-profile');
const closeButton = document.querySelector('.popup__close-btn');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const newProfileTitle = document.querySelector('.form__input_type_name');
const newProfileSubtitle = document.querySelector('.form__input_type_caption');
const formElement = document.querySelector('.form');
const newPostButton = document.querySelector('.profile__post-btn')
const popupNewPost = document.querySelector('.popup_type_edit-profile')

//функция открытия попапа редактирования профиля и подстановка имени с профессией в инпуты
const openPopup = () => {
  popup.classList.add('popup_opened')
  newProfileTitle.value = profileTitle.textContent;
  newProfileSubtitle.value = profileSubtitle.textContent;
}

//функция закрытия попапа редактирования профиля по нажатию на крестик
const closePopup = () => {
  popup.classList.remove('popup_opened')
}

//обработчик события открытия попапа профиля
openButton.addEventListener('click', openPopup)

//обработчик события открытия попапа профиля
closeButton.addEventListener('click', closePopup)

//функция закрытия попапа профиля по клику на внешнюю область
popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup()
  }
})

//функция замены данных профиля данными из инпутов
function handleFormSubmit (evt) {
    evt.preventDefault();

    profileTitle.textContent = newProfileTitle.value;
    profileSubtitle.textContent = newProfileSubtitle.value;
    closePopup()
}

//обработчик события кнопки 'сохранить данные профиля'
formElement.addEventListener('submit', handleFormSubmit);

/*
const newPost = () => {
  popupNewPost.classList.add('popup_opened')
}

//функция закрытия попапа добавления нового поста
const closeNewPost = () => {
  popupNewPost.classList.remove('popup_opened')
}

//функция закрытия попапа профиля по клику на внешнюю область
popupNewPost.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closeNewPost()
  }
})

//функция создания нового поста
function newPostSubmit (evt) {
    evt.preventDefault();

    profileTitle.textContent = newProfileTitle.value;
    profileSubtitle.textContent = newProfileSubtitle.value;
    closeNewPost()
}

//обработчик события кнопки 'сохранить новый пост'
formElement.addEventListener('submit', newPostSubmit);


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
