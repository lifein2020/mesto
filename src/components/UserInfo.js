//Класс отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor ({userNameSelector, userJobSelector, userAvatarSelector}) {
    this._userNameElement = document.querySelector(`${userNameSelector}`);
    this._userActivityElement = document.querySelector(`${userJobSelector}`);
    this._userAvatarElement = document.querySelector(`${userAvatarSelector}`);
  }

  // Возвращает объект с данными пользователя. Пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {userName: this._userNameElement.textContent, userActivity: this._userActivityElement.textContent};
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userActivityElement.textContent = data.about; //было inputValues.job;
}

  setUserAvatar(data) {
    this._userAvatarElement.setAttribute("src", data.avatar);
  }

}
