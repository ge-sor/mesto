import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }
  _getInputValues() {

  }
  setEventListeners() {
    super.setEventListeners();
    super._popup
    .querySelector('.form__submit')
    .addEventListener('submit', this._submitForm())
  }
  close() {
    this._submitForm.reset;
    super.close();
  }
}
