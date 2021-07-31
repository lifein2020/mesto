export default class Api {
  constructor ({ baseUrl, headers }) {//токен, контент тайп,
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  //получение всех карточек
  getInitialCards() {
    return fetch(this.baseUrl, {headers: this.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  /*getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
      headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }*/

  /*postAddCard(method, name, link) {
    this.method = method;
    this.name = name;
    this.link = link;
    return fetch(this.baseUrl, {headers: this.headers}, this.method, this.name, this.link)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }*/

  getUserInfo() {

  }

  getHandleLikeCardSubmit() {

  }

  getUserInfo() {
    return fetch(this.baseUrl, {headers: this.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

}

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
}
