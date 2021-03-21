import Popup from './Popup.js';

export default class PopupPopupWithImage extends Popup {
  
  open() {
    this._popup.querySelector('.popup__image-fullscreen').src = this._image;
    this._popup.querySelector('.popup__image-fullscreen').alt = this._title;
    this._popup.querySelector('.popup__text-fullscreen').textContent = this._title;
    super.open();
    super.setEventListeners();
  }
}
