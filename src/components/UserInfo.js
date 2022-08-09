export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    };
  }

  setUserInfo(info) {
    this._userName.textContent = info.name;
    this._userAbout.textContent = info.about;
    this._userAvatar.src = info.avatar;
  }
}