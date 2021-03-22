
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.querySelector('.popup__close-btn')
    .removeEventListener('click', () => this.close())
    document.removeEventListener('keydown', this._handleEscClose.bind(this))
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popup
    .querySelector('.popup__close-btn')
    .addEventListener('click', () => this.close())

    document.addEventListener('keydown', this._handleEscClose.bind(this))

  }
}
