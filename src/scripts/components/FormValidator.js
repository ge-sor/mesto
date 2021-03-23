export default class FormValidator {
  constructor (selectors, formObject) {
    this._formSelector = selectors.formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._formSetSelector = selectors.formSetSelector;
    this._formObject = formObject;
    this._inputList = Array.from(this._formObject.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formObject.querySelector(this._submitButtonSelector);
};


resetValidation() {
  this._inputList.forEach((item) => {
    this.hideInputError(this._formObject, item)
  });
  this._toggleButtonState;
};

disableSubmitButton (submitButton) {
  submitButton.classList.add(this._inactiveButtonClass);
  submitButton.disabled = true;
};

// Функция, которая скрывает ошибку
hideInputError (formElement, inputElement)  {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.textContent = '';
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
_toggleButtonState (inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (this._hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
  buttonElement.classList.add(this._inactiveButtonClass);
  buttonElement.disabled = true;
} else {
  // иначе сделай кнопку активной
  buttonElement.classList.remove(this._inactiveButtonClass);
  buttonElement.disabled = false;
}
}


// Функция, которая показывает ошибку
_showInputError (formElement, inputElement, errorMessage) {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;

};


/* Функция checkInputValidity принимает два параметра:
formElement — html-элемент формы, в которой находится проверяемое поле ввода.
Он нужен для поиска элемента ошибки в форме.
inputElement — проверяемое поле ввода. */
checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    // showInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    this._showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    this.hideInputError(formElement, inputElement);
  }
};


// Функция принимает массив полей
_hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
  return !inputElement.validity.valid;
})
}

_setEventListeners (formElement) {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(this._submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  this._toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this.checkInputValidity(formElement, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      this._toggleButtonState(inputList, buttonElement)
    });
  });
};

 enableValidation () {
  this._formObject.addEventListener('submit', function(evt) {
    evt.preventDefault();
  });

  const fieldsetList = Array.from(this._formObject.querySelectorAll(this._formSetSelector));

  fieldsetList.forEach((fieldset) => {
    this._setEventListeners(fieldset);
  });
  }


};


