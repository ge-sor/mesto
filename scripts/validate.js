
// Функция, которая показывает ошибку
const showInputError = (formElement, inputElement, errorMessage, selectors) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.add('form__input_type_error');
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  //errorElement.classList.add('form__input-error_active');
  errorElement.classList.add(selectors.errorClass);
};

// Функция, которая скрывает ошибку
const hideInputError = (formElement, inputElement, selectors) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.remove('form__input_type_error');
  inputElement.classList.remove(selectors.inputErrorClass);
  //errorElement.classList.remove('form__input-error_active');
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
};

/* Функция checkInputValidity принимает два параметра:
formElement — html-элемент формы, в которой находится проверяемое поле ввода.
Он нужен для поиска элемента ошибки в форме.
inputElement — проверяемое поле ввода. */
const checkInputValidity = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    // showInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    // hideInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, selectors);
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
const toggleButtonState = (inputList, buttonElement, selectors) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList, selectors)) {
    // сделай кнопку неактивной
  //buttonElement.classList.add('button_inactive');
  buttonElement.classList.add(selectors.inactiveButtonClass);
  buttonElement.disabled = true;
} else {
  // иначе сделай кнопку активной
  //buttonElement.classList.remove('button_inactive');
  buttonElement.classList.remove(selectors.inactiveButtonClass);
  buttonElement.disabled = false;
}
}

const setEventListeners = (formElement, selectors) => {
  // Найдём все поля формы и сделаем из них массив
  //const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  // Найдём в текущей форме кнопку отправки
  //const buttonElement = formElement.querySelector('.form__submit');
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement)
    });
  });
};

const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement, selectors) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(selectors.fieldsetSelector));

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, selectors);
    });
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  fieldsetSelector: '.form__set',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error'
});

console.log(enableValidation())