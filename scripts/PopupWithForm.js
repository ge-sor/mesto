import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, ) {
    super(popupSelector);

  }
  _getInputValues() {

  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener()
  }
}
