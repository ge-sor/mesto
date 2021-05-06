export default class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
  }
  getUserInfo() {
    this._user = {};
    this._user.name = this._name;
    this._user.about = this._about;
    return this._user
  }
  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
