import { closePopupButton } from './constants.js'

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.add('popup_opened');
  }
  close() {
    this._popup.classList.remove('popup_opened');
  }
  _handleEscClose = (evt) => {
    const popupActive = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
      close(popupActive)
    }
  }
  setEventListeners() {
    this._popup
    .querySelector(closePopupButton)
    .addEventListener('click', close())

    document.addEventListener('keydown', this._handleEscClose)
  }
}
