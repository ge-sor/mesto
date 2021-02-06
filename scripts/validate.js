// Функция, которая показывает ошибку
const showInputError = (formElement, inputElement, errorMessage, classes) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classes.inputErrorClass);
  errorElement.textContent = errorMessage;

};

// Функция, которая скрывает ошибку
const hideInputError = (formElement, inputElement, classes) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classes.inputErrorClass);
  errorElement.textContent = '';
};

/* Функция checkInputValidity принимает два параметра:
formElement — html-элемент формы, в которой находится проверяемое поле ввода.
Он нужен для поиска элемента ошибки в форме.
inputElement — проверяемое поле ввода. */
const checkInputValidity = (formElement, inputElement, classes) => {
  if (!inputElement.validity.valid) {
    // showInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, classes);
  } else {
    // hideInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, classes);
  }
};


// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
  return !inputElement.validity.valid;
})
}



// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, classes) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
  buttonElement.classList.add(classes.inactiveButtonClass);
  buttonElement.disabled = true;
} else {
  // иначе сделай кнопку активной
  buttonElement.classList.remove(classes.inactiveButtonClass);
  buttonElement.disabled = false;
}
}

const setEventListeners = (formElement, classes) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(classes.submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, classes);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, classes);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, classes)
    });
  });
};

const enableValidation = (classes) => {

  const formList = Array.from(document.querySelectorAll(classes.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(classes.formSetSelector));

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, classes);
    });
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  formSetSelector: '.form__set'
});
