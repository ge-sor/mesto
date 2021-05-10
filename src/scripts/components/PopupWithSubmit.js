import Popup from '../components/Popup.js';

export default class PopupWithSubmit extends Popup {


  confirmAction(action) {
    this._handleSubmitCallback = action;
  }

setEventListeners() {
  this._popup.querySelector('.form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
    super.setEventListeners();
  }

}
