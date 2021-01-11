let openButton = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-btn');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


let togglePopup = () => {
  popup.classList.toggle('popup_opened')
}

openButton.addEventListener('click', togglePopup)

closeButton.addEventListener('click', togglePopup)

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup()
  }

})

togglePopup.addEventListener('click', function () {
  let newProfileTitle = document.querySelector('.form__input_name');
  let newProfileSubtitle = document.querySelector('.form__input_caption');

  newProfileTitle.value = profileTitle;
  newProfileSubTitle.value = profileSubtitle;

});

// Находим форму в DOM
let formElement = querySelector('.form');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let newProfileTitle = document.querySelector('.form__input_name');
    let newProfileSubtitle = document.querySelector('.form__input_caption');

    // Получите значение полей из свойства value
    newProfileTitle.value = profileTitle;
    newProfileSubTitle.value = profileSubtitle;


    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = newProfileTitle.value;
    profileSubtitle.textContent = newProfileSubtitle.value;
}

handleFormSubmit();
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

