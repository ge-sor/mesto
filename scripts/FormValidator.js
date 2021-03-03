
export class FormValidator {
  constructor (selectors, formObject) {
    this.formSelector = selectors.formSelector;
    this.inputSelector = selectors.inputSelector;
    this.submitButtonSelector = selectors.submitButtonSelector;
    this.inactiveButtonClass = selectors.inactiveButtonClass;
    this.inputErrorClass = selectors.inputErrorClass;
    this.formSetSelector = selectors.formSetSelector;
    this.formObject = formObject;
}


// Функция, которая показывает ошибку
_showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this.inputErrorClass);
  errorElement.textContent = errorMessage;

};

// Функция, которая скрывает ошибку
_hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this.inputErrorClass);
  errorElement.textContent = '';
};

/* Функция checkInputValidity принимает два параметра:
formElement — html-элемент формы, в которой находится проверяемое поле ввода.
Он нужен для поиска элемента ошибки в форме.
inputElement — проверяемое поле ввода. */
_checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    this._showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    this._hideInputError(formElement, inputElement);
  }
};


// Функция принимает массив полей
_hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
  return !inputElement.validity.valid;
})
}



// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
_toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (this._hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
  buttonElement.classList.add(this.inactiveButtonClass);
  buttonElement.disabled = true;
} else {
  // иначе сделай кнопку активной
  buttonElement.classList.remove(this.inactiveButtonClass);
  buttonElement.disabled = false;
}
}

_setEventListeners = (formElement) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(this.submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  this._toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(formElement, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      this._toggleButtonState(inputList, buttonElement)
    });
  });
};

 enableValidation = () => {

  const formList = Array.from(document.querySelectorAll(this.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(this.formSetSelector));

    fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset);
    });
  });
};

}
