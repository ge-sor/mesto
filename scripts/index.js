let openButton = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-btn');
let saveButton = document.querySelector('.popup__save-btn');
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


