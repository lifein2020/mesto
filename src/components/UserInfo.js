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
  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userActivityElement.textContent = data.about; //было inputValues.job;
}

}

/*export default class UserInfo {
  constructor ({userNameSelector, userJobselector}) {
    this._userNameElement = document.querySelector(`${userNameSelector}`);
    this._userActivityElement = document.querySelector(`${userJobselector}`);
    this.name = '';
    this.activity = '';
  }

  // Возвращает объект с данными пользователя. Пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this.name,
      job: this.activity
    }

  }

  // Принимает новые данные пользователя
  setUserInfo({name, job}) {
    this.name = name;
    this.activity = job;
}

// Отображает данные пользователя на странице
  updateUserInfo() {
    this._userNameElement.textContent = this.name;
    this._userActivityElement.textContent = this.activity;
  }

}*/
