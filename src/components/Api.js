export default class Api {
  constructor ({ baseUrl, headers }) {//токен, контент тайп,
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getAboutUserInfo() {
    return fetch(this.baseUrl + 'users/me', {
      headers: this.headers
    }).then(this._getResponse);
  }

  //получение всех карточек
  getInitialCards() {
    return fetch(this.baseUrl + 'cards', { // либо `${this.baseUrl}cards` и в результате конкатенации получается https://mesto.nomoreparties.co/v1/cohort-26/cards
      headers: this.headers
    }).then(this._getResponse);
  }
// Создаём массив с промисами
  //const promises = [firstPromise, secondPromise]

// Передаём массив с промисами методу Promise.all

  /*Promise.all(promises)
  .then((results) => {
    console.log(results); // ["Первый промис", "Второй промис"]
  });*/

  // Добавление карточек
  postAddCard({ card_name, card_image_link }) {
    return fetch(`${this.baseUrl}cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: card_name,
        link: card_image_link
      }),
      headers: this.headers
    }).then(this._getResponse);
  }

  // Редактирование профиля
  patchAboutUserInfo({name, job}) {
    return fetch(this.baseUrl + 'users/me', { //`${this.baseUrl}users/me`
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: job
      }),
      headers: this.headers
    })
    .then(this._getResponse);
  }

  // Смена аватара
  patchAvatarUser({ avatar_link }) {
    return fetch(this.baseUrl + 'users/me/avatar', { //`${this.baseUrl}users/me/avatar`
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar_link
      }),
      headers: this.headers
    })
    .then(this._getResponse);
  }

  // Удаление карточки
  deliteCard(id) {
    return fetch(`${this.baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._getResponse);
  }

  // Поставить лайк
  putLikeCard(id) {
    return fetch(`${this.baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(this._getResponse);
  }

  // Удалить лайк
  deliteLikeCard(id) {
    return fetch(`${this.baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._getResponse);
  }

  toggleLikeCard(id, like) {
    return fetch(`${this.baseUrl}cards/likes/${id}`, {
      method: like ? 'DELITE' : 'PUT', //если карточка уже лайкнута(черный лайк), то удалить лайк, иначе поставить
      headers: this.headers
    })
    .then(this._getResponse);
  }

}

/*class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
}*/


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
    this._method = method;
    this._name = name;
    this._link = link;
    return fetch(`${this.baseUrl}cards`, {
      method: this._method,
      body: JSON.stringify({
        name: this._name,
        link: this._link
      }),
      headers: this.headers},
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  */
