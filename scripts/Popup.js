
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
      this.close(popupActive)
    }
  }
  setEventListeners() {
    this._popup
    .querySelector('.popup__close-btn')
    .addEventListener('click', this.close())

    document.addEventListener('keydown', this._handleEscClose)
  }
}
