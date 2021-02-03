// Функция, которая показывает ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

// Функция, которая скрывает ошибку
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

/* Функция checkInputValidity принимает два параметра:
formElement — html-элемент формы, в которой находится проверяемое поле ввода.
Он нужен для поиска элемента ошибки в форме.
inputElement — проверяемое поле ввода. */
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
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
hasInvalidInput()
}



// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
  buttonElement.classList.add('button_inactive');
  buttonElement.setAttribute("disabled", "disabled");
} else {
  // иначе сделай кнопку активной
  buttonElement.classList.remove('button_inactive');
  buttonElement.removeAttribute("disabled", "disabled");
}
}

const setEventListeners = (formElement) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.form__submit');
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

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

enableValidation();
