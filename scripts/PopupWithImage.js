import Popup from './Popup.js';

export default class PopupPopupWithImage extends Popup {

  open(image, title) {
    this._popup.querySelector('.popup__image-fullscreen').src = image;
    this._popup.querySelector('.popup__image-fullscreen').alt = title;
    this._popup.querySelector('.popup__text-fullscreen').textContent = title;
    super.open();
    super.setEventListeners();
  }
}
