export default class Api {
  constructor ({ baseUrl, headers }) {//токен
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl, {headers: this.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

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
