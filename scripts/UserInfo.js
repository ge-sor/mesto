export default class UserInfo {
  constructor(data) {
    this._username = data.username;
    this._caption = data.caption;
  }
  getUserInfo() {
    newProfileTitle.value = profileTitle.textContent;
    newProfileSubtitle.value = profileSubtitle.textContent;
  }
  setUserInfo() {
    profileTitle.textContent = newProfileTitle.value;
    profileSubtitle.textContent = newProfileSubtitle.value;
  }
}
