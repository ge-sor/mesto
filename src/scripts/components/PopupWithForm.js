import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
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
    this._popupForm.addEventListener('submit', this._submitForm.bind(this))
    super.setEventListeners();
  }

  _submitForm () {
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  open() {
    this._popupForm.reset();
    super.open();
  }

  close() {
    this._popupForm.removeEventListener('submit', this._submitForm.bind(this))
    super.close();
    this._popupForm.reset();
}
}
