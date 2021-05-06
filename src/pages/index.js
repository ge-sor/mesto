import "./index.css";
import {
  editButton,
  newPostButton,
  profilePopupSelector,
  newPostPopupSelector,
  cardPopupSelector,
  confirmPopupSelector,
  avatarPopupSelector,
  formProfile,
  cardContainer,
  formNewPost,
  profilePic,
  profileName,
  profileCaption,
  profileNameInput,
  profileCaptionInput,
  cardNameInput,
  cardLinkInput,
  profileAvatarInput,
  profileAvatar,
  formAvatar,
  selectors,
} from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithSubmit from "../scripts/components/PopupWithSubmit.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

const cards = {
  url: "https://mesto.nomoreparties.co/v1/cohort-23/cards",
  headers: {
    authorization: "28646914-f7f6-4f3a-9670-3cfb13a383dd",
    "Content-Type": "application/json",
  },
};

const user = {
  url: "https://mesto.nomoreparties.co/v1/cohort-23/users/me",
  headers: {
    authorization: "28646914-f7f6-4f3a-9670-3cfb13a383dd",
    "Content-Type": "application/json",
  },
};

const avatar = {
  url: "https://mesto.nomoreparties.co/v1/cohort-23/users/me/avatar",
  headers: {
    authorization: "28646914-f7f6-4f3a-9670-3cfb13a383dd",
    "Content-Type": "application/json",
  },
};

const cardPopup = new PopupWithImage(cardPopupSelector);

const cardsApi = new Api(cards);
const userApi = new Api(user);
const avatarApi = new Api(avatar);

const validationEditProfile = new FormValidator(selectors, formProfile);
const validationNewPlace = new FormValidator(selectors, formNewPost);
const validationAvatar = new FormValidator(selectors, formAvatar);

const defaultUser = new UserInfo(
  profileName.textContent,
  profileCaption.textContent
);

function renderLoading(popupSelector, isLoading) {
  if (isLoading) {
    document.querySelector(popupSelector).querySelector('.popup__save-btn').textContent = 'Сохранение...';
  }
  else {
    document.querySelector(popupSelector).querySelector('.popup__save-btn').textContent = 'Сохранить';
  }
}

//создание карточки
function createCard(item, userId) {
  return new Card(
    {
      data: { item, currentUserId: userId },
      handleCardClick: () => {
        //что должно произойти при клике на картинку
        cardPopup.openImage(item.name, item.link);
      },
      handleLikeClick: () => {
        //что должно произойти при клике на лайк

        //если лайков нет, добавляем
        if (item.likes.length === 0) {
          cardsApi.likeCard(item._id)
          .then((data) => renderCards(data))
          .catch((err) => { console.log(err)});
        }

        item.likes.forEach((like) => {
          //если мой лайк есть, то удаляем
          if (like._id.includes(userId)) {
            cardsApi.deleteLikeCard(item._id)
            .then((data) => renderCards(data))
            .catch((err) => { console.log(err)});
          } else {
            //если моего лайка нет то добавляем
            cardsApi.likeCard(item._id)
            .then((data) => renderCards(data))
            .catch((err) => { console.log(err)});
          }
        });
      },

      handleDeleteIconClick: () => {
        //подтверждение удаления карточки
        const submitPopup = new PopupWithSubmit(confirmPopupSelector, {
          handleFormSubmit: () => {
            cardsApi
              .deleteCard(item._id)
              .then(submitPopup.close())
              .then((data) => renderCards(data))
              .catch((err) => { console.log(err)});
          },
        });

        submitPopup.setEventListeners();
        submitPopup.open();
      },
    },
    ".template-card"
  );
}

//добавляем в DOM карточки с сервера
function renderCards() {
  Promise.all([cardsApi.getInfo(), userApi.getInfo()])
    .then((allData) => {
      const [initialCards, user] = allData;
      const userId = user._id;
      const cardList = new Section(
        {
          data: initialCards,
          renderer: (item) => {
            const card = createCard(item, userId);
            const cardElement = card.generateCard();
            cardList.addItemToEnd(cardElement);
          },
        },
        cardContainer
      );
      cardList.renderItems();
    })
    .catch((err) => { console.log(err)});
}
renderCards();

//функция вставляет в разметку данные профиля с сервера
function getUserInfo() {
  userApi.getInfo()
  .then((user) => {
    profilePic.src = user.avatar;
    profileName.textContent = user.name;
    profileCaption.textContent = user.about;
  })
  .catch((err) => { console.log(err)});
}
getUserInfo();

//функция изменения данных профиля
const profilePopup = new PopupWithForm(profilePopupSelector, {
  handleFormSubmit: () => {
    renderLoading(profilePopupSelector, true);
    userApi.updateUserInfo({
        name: profileNameInput.value,
        about: profileCaptionInput.value,
      })
      .then((data) => getUserInfo(data))
      .catch((err) => { console.log(err)})
      .finally(() => {
        renderLoading(profilePopupSelector, false)
      })
  },
});

//попап изменения аватарки
const avatarPopup = new PopupWithForm(avatarPopupSelector, {
  handleFormSubmit: () => {
    renderLoading(avatarPopupSelector, true);
    avatarApi.updateAvatar({
        avatar: profileAvatarInput.value,
      })
      .then((data) => getUserInfo(data))
      .catch((err) => { console.log(err)})
      .finally(() => {
        renderLoading(avatarPopupSelector, false)
      })
  },
});
profileAvatar.addEventListener("click", () => {
  avatarPopup.open();
  validationAvatar.resetValidation();
});

//функция добавления новой карточки
const newPostPopup = new PopupWithForm(newPostPopupSelector, {
  handleFormSubmit: () => {
    renderLoading(newPostPopupSelector, true);
    cardsApi.newCard({
        name: cardNameInput.value,
        link: cardLinkInput.value,
      })
      .then((data) => renderCards(data))
      .catch((err) => { console.log(err)})
      .finally(() => {
        renderLoading(newPostPopupSelector, false)
      })
  },
});

//открытие формы изменения профиля
editButton.addEventListener("click", () => {
  profilePopup.open();
  const userData = defaultUser.getUserInfo();
  profileNameInput.value = userData.name;
  profileCaptionInput.value = userData.about;
  validationEditProfile.resetValidation();
});

//открытие формы добавления новой карточки
newPostButton.addEventListener("click", () => {
  newPostPopup.open();
  validationNewPlace.resetValidation();
});

//включения валидации в попапах
validationEditProfile.enableValidation();
validationNewPlace.enableValidation();
validationAvatar.enableValidation();

//вызов слушателей в попапах
profilePopup.setEventListeners();
cardPopup.setEventListeners();
newPostPopup.setEventListeners();
avatarPopup.setEventListeners();
