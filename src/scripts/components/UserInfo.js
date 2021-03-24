export default class UserInfo {
  constructor(name, caption) {
    this._name = name;
    this._caption = caption;
  }
  getUserInfo() {
    this._user = {};
    this._user.name = this._name.textContent;
    this._user.caption = this._caption.textContent;
    return this._user
  }
  setUserInfo({name, caption}) {
    this._name.textContent = name;
    this._caption.textContent = caption;
  }
}
