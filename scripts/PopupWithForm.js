import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._popupForm = this._popup.querySelector('.form')
  }

  _getInputValues() {
      // создаём пустой объект
      this._formValues = {};

      // добавляем в этот объект значения всех полей
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });

      // возвращаем объект значений
      return this._formValues;
    }

  setEventListeners() {
    this._popup.addEventListener('submit', () => {
      this._getValues();
      this.close();
    });
  }

  _getValues() {
    this._handleFormSubmit(this._getInputValues());
    this._popupForm.reset();
    super.close();
  }

  close() {
    this._popup.removeEventListener('submit', () => {
    this._getValues();
  });
  super.close();
}
}
