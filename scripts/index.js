let openButton = document.querySelector('.button__edit-info');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.button__popup_close');
let saveButton = document.querySelector('.button__save');
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



function saveProfile() {
  let newProfileTitle = document.querySelector('.input__name');
  let newProfileSubtitle = document.querySelector('.input__caption');

  profileTitle.textContent = newProfileTitle.value;

  profileSubtitle.textContent = newProfileSubtitle.value;

  newProfileTitle.value = '';
  newProfileSubtitle.value = '';

}

saveButton.addEventListener('click',saveProfile)
saveButton.addEventListener('click', togglePopup)


