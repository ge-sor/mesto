
import {cardTemplate, openPicPopup, closeCardButton, fullscreenImage, fullscreenText, popupElement} from './constants.js';
export class Card {
    constructor(data, cardSelector) {
      this._title = data.name;
      this._image = data.link;
      this._cardSelector = cardSelector;
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
  
    cardImage.addEventListener('click', this._handleOpenPopup);
    this._element.querySelector('.card__like-btn').addEventListener('click', this._likeCard);
    this._element.querySelector('.card__delete-btn').addEventListener('click', this._deleteCard);
  
    return this._element;
  }
  
  //переключение класса кнопки лайк
   _likeCard(evt) {
      evt.target.classList.toggle('card__like-btn_active');}
  
  //удаление карточки
   _deleteCard(evt) {
      evt.target.closest('.card').remove();}
  
  //попап карточки
    _handleOpenPopup() {
      fullscreenImage.src = this._image;
      fullscreenImage.alt = this._title;
      fullscreenText.textContent = this._title;
      openPicPopup.classList.add('popup_opened')
      document.addEventListener('keydown', this._handleClosePopup)
      this._element.addEventListener('click', this._handleClosePopup)
    }
    _handleClosePopup(evt) {
        if (evt.key === 'Escape' || evt.target === evt.currentTarget || evt.target === closeCardButton) {
      openPicPopup.classList.remove('popup_opened')
    }
    }
    _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleOpenPopup()
    });
/*   //закрытие попапа карточки по щелчку на крестик
    closeCardButton.addEventListener('click', () => {
      this._handleClosePopup()
    });
     */
  }
  }
  