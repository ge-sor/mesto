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

const dataFromServer = {
  url: "https://mesto.nomoreparties.co/v1/cohort-23/",
  headers: {
    authorization: "28646914-f7f6-4f3a-9670-3cfb13a383dd",
    "Content-Type": "application/json",
  },
};

const cardPopup = new PopupWithImage(cardPopupSelector);
const submitPopup = new PopupWithSubmit(confirmPopupSelector);

const dataApi = new Api(dataFromServer);

const validationEditProfile = new FormValidator(selectors, formProfile);
const validationNewPlace = new FormValidator(selectors, formNewPost);
const validationAvatar = new FormValidator(selectors, formAvatar);

const defaultUser = new UserInfo(profileName, profileCaption, profilePic);

function renderLoading(popupSelector, isLoading) {
  if (isLoading) {
    document.querySelector(popupSelector)
    .querySelector('.popup__save-btn').textContent = 'Сохранение...';
  }
  else {
    document.querySelector(popupSelector)
    .querySelector('.popup__save-btn').textContent = 'Сохранить';
  }
}

//создание карточки
function createCard(item, userId) {
  const oneCard = new Card(
    {
      data: { item, currentUserId: userId },
      handleCardClick: () => {
        //что должно произойти при клике на картинку
        cardPopup.openImage(item.name, item.link);
      },

      handleLikeClick: (card) => {
        //что должно произойти при клике на лайк
        if (oneCard.isLiked())  {
        dataApi.deleteLikeCard(item._id)
            .then(data => oneCard.updateCardLikes(data, true))
            .catch((err) => { console.log(err)});
        }
          else {
            dataApi.likeCard(item._id)
            .then(data => oneCard.updateCardLikes(data))
            .catch((err) => { console.log(err)});
          }
      },

      handleDeleteIconClick: (card) => {
        //подтверждение удаления карточки
        submitPopup.open();
        submitPopup.confirmAction(() => {
          dataApi.deleteCard(item._id)
          .then(() => {
            oneCard.remove();
            submitPopup.close();
          })
          .catch((err) => { console.log(err)});
        })
      },
    },
    ".template-card"
  );
return oneCard;
}

//добавляем в DOM карточки и данные пользователя
function renderCards() {
  Promise.all([dataApi.getCardsInfo(), dataApi.getUserInfo()])
    .then((allData) => {
      const [initialCards, user] = allData;

      defaultUser.setUserInfo(user.name, user.about, user.avatar);

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

//функция добавления новой карточки
const newPostPopup = new PopupWithForm(newPostPopupSelector, {
  handleFormSubmit: () => {
    renderLoading(newPostPopupSelector, true);
    dataApi.newCard({
        name: cardNameInput.value,
        link: cardLinkInput.value,
      })
      .then((card) => {
        const newCardList = new Section(
          {
            data: card,
            renderer: (item) => {
              const card = createCard(item, item.owner._id);
              const cardElement = card.generateCard();
              newCardList.addItemToStart(cardElement);
            },
          },
          cardContainer
        );
        newCardList.renderItem();
    })
      .then(() => { newPostPopup.close() })
      .catch((err) => { console.log(err)})
      .finally(() => { renderLoading(newPostPopupSelector, false) })
  },
});

//функция изменения данных профиля
const profilePopup = new PopupWithForm(profilePopupSelector, {
  handleFormSubmit: () => {
    renderLoading(profilePopupSelector, true);
    dataApi.updateUserInfo({
        name: profileNameInput.value,
        about: profileCaptionInput.value,
      })
      .then((user) => defaultUser.setUserInfo(user.name, user.about, user.avatar))
      .then(() => { profilePopup.close() })
      .catch((err) => { console.log(err)})
      .finally(() => { renderLoading(profilePopupSelector, false) })
  },
});

//попап изменения аватарки
const avatarPopup = new PopupWithForm(avatarPopupSelector, {
  handleFormSubmit: () => {
    renderLoading(avatarPopupSelector, true);
    dataApi.updateAvatar({
        avatar: profileAvatarInput.value,
      })
      .then((user) => defaultUser.setUserInfo(user.name, user.about, user.avatar))
      .then(() => { avatarPopup.close() })
      .catch((err) => { console.log(err)})
      .finally(() => { renderLoading(avatarPopupSelector, false) })
  },
});
profileAvatar.addEventListener("click", () => {
  avatarPopup.open();
  validationAvatar.resetValidation();
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
submitPopup.setEventListeners();
