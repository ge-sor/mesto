export default class UserInfo {
  constructor(name, caption) {
    this._name = document.querySelector(name);
    this._caption = document.querySelector(caption);
  }
  getUserInfo() {
    this._name.value = this._name.textContent;
    this._caption.value = this._caption.textContent;
    return this._user;
  }
  setUserInfo() {
    this._name.textContent = name;
    this._caption.textContent = caption;
  }
}
