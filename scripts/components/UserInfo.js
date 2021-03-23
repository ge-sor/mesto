export default class UserInfo {
  constructor(name, caption) {
    this._name = document.querySelector(name);
    this._caption = document.querySelector(caption);
  }
  getUserInfo() {
    document.querySelector('.form__input_type_name').value = this._name.textContent;
    document.querySelector('.form__input_type_caption').value = this._caption.textContent;
  }
  setUserInfo() {
    this._name.textContent = document.querySelector('.form__input_type_name').value;
    this._caption.textContent = document.querySelector('.form__input_type_caption').value;
  }
}
