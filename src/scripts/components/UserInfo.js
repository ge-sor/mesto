export default class UserInfo {
  constructor(name, about, avatar) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }
  getUserInfo() {
    this._user = {};
    this._user.name = this._name.textContent;
    this._user.about = this._about.textContent;
    this._user.avatar = this._avatar.src;
    return this._user
  }
  setUserInfo(name, about, avatar) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }
}
