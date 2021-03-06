import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {

  openImage(name, link) {
    this._popup.querySelector('.popup__image-fullscreen').src = link;
    this._popup.querySelector('.popup__image-fullscreen').alt = name;
    this._popup.querySelector('.popup__text-fullscreen').textContent = name;
    super.open();
  }
}
