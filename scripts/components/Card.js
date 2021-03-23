export default class Card {
    constructor({data, handleCardClick}, cardSelector) {
      this._title = data.name;
      this._image = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

      return cardElement;
    }

    generateCard() {
    this._element = this._getTemplate();
     this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image')
    cardImage.src = this._image;
    cardImage.alt = this._title;
    this._element.querySelector('.card__text').textContent = this._title;

    return this._element;
  }

  //переключение класса кнопки лайк
   _likeCard(evt) {
      evt.target.classList.toggle('card__like-btn_active');}

  //удаление карточки
   _deleteCard(evt) {
      evt.target.closest('.card').remove();
    }

    _setEventListeners() {
      this._element.querySelector('.card__like-btn').addEventListener('click', this._likeCard);
      this._element.querySelector('.card__delete-btn').addEventListener('click', this._deleteCard);
      this._element.querySelector('.card__image').addEventListener('click', this._handleCardClick)
    };

  }

