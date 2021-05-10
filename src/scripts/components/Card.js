export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
    cardSelector
  ) {
    this._item = data.item;
    this._title = data.item.name;
    this._cardOwner = data.item.owner._id;
    this._userId = data.currentUserId;
    this._image = data.item.link;
    this._likes = data.item.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  updateCardLikes(data, hasLike) {
    this._element.querySelector(
      ".card__likes"
    ).textContent = data.likes.length;

      if (hasLike) {
        this._element
          .querySelector(".card__like-btn")
          .classList.remove("card__like-btn_active");
      }
      else {
        this._element
          .querySelector(".card__like-btn")
          .classList.add("card__like-btn_active");
      }

  }

  deleteCard(evt) {
    evt.target.closest('.card').remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._image;
    cardImage.alt = this._title;
    this._element.querySelector(".card__text").textContent = this._title;
    this._element.querySelector(
      ".card__likes"
    ).textContent = this._likes.length;
    if (this._cardOwner === this._userId) {
      this._element
        .querySelector(".card__delete-btn")
        .classList.add("card__delete-btn_visible");
    }

    this._likes.forEach((item) => {
      if (item._id.includes(this._userId)) {
        this._element
          .querySelector(".card__like-btn")
          .classList.add("card__like-btn_active");
      }
    });

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-btn")
      .addEventListener("click", this._handleLikeClick);
    this._element
      .querySelector(".card__delete-btn")
      .addEventListener("click", this._handleDeleteIconClick);
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleCardClick);
  }
}
