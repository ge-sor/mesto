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
    this._popup
    .querySelector('.form__submit')
    .addEventListener('submit', console.log('hi'))
  }
  close() {
    //this._submitForm.reset;
    super.close();
  }
}
