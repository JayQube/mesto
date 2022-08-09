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

  setUserAvatar(url) {
    this._userAvatar.src = url.avatar;
  }

  setUserInfo(text) {
    this._userName.textContent = text.name;
    this._userAbout.textContent = text.about;
  }
}