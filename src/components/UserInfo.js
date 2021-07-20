//Класс отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor ({userNameSelector, userJobselector}) {
    this._userNameElement = document.querySelector(`${userNameSelector}`);
    this._userActivityElement = document.querySelector(`${userJobselector}`);
  }

  // Возвращает объект с данными пользователя. Пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {userName: this._userNameElement.textContent, userActivity: this._userActivityElement.textContent};
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(inputValues) {
    this._userNameElement.textContent = inputValues.name;
    this._userActivityElement.textContent = inputValues.job;
}

}
