import Popup from '../components/Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submit = this._popup.querySelector('.form__submit')
  }
  setEventListeners() {
    this._submit.addEventListener('click', this._handleFormSubmit)
    super.setEventListeners();
  }
  open() {
    super.open();
  }

  close() {
    this._submit.removeEventListener('click', this._handleFormSubmit)
    super.close();
}
}

