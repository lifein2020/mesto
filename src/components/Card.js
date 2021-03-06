export default class Card {
  constructor({ data, ownerId, handleLikeCardSubmit, handleDeliteCard, handleCardClick}, cardSelector) { //handleCardClick новое название handleShowPopupImageSubmit
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length; // для устанавливки количества лайков
    this._likesArray = data.likes; // для проверки лайков массив лайков карточки
    this.cardId = data._id; // id удаляемой карточки, используется в index.js при отправке запроса
    this._dataOwnerId = data.owner._id; //id приходящий с сервера
    this._ownerId = ownerId; // id мой
    this._handleLikeCardSubmit =handleLikeCardSubmit;
    this._handleDeliteCard = handleDeliteCard;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  // получаем разметку карточки
  _getTemplate() {
    const newElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return newElement;
  }

  // подготовка карточки к рендерингу
  generateCard() {
    this._cardElement = this._getTemplate();

    this._newElementImage = this._cardElement.querySelector('.element__image');
    this._newElementTitle = this._cardElement.querySelector('.element__title');
    this._newElementImage.alt = this._name;
    this._newElementImage.src = this._link;
    this._newElementTitle.textContent = this._name;
    this._elementLike = this._cardElement.querySelector('.element__like');
    this._elementTrash = this._cardElement.querySelector('.element__trash');

    this.setLike({likes: this._likesArray}); //вызываем, чтобы лайки сохранялись после перезагрузки
    this._showCardTrash();
    this._setEventListeners();

    return this._cardElement;
  }

  // вешаем слушатели событий на элементы карточки
  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._handleLikeCardSubmit(this);
    });

    this._elementTrash.addEventListener('click', () => {
      this._handleDeliteCard(this);  // работает без передачи (this)
    });

    this._newElementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // метод показывает карзину только на созданных мною карточках
  _showCardTrash() {
    if (this._ownerId === this._dataOwnerId) {
      this._cardElement.querySelector('.element__trash').classList.add('element__trash_visible');
    }
  }

  // метод удаления элемента карточки
  deliteCardElement() {
    this._cardElement.remove();
  }

  //---------------------- 2 вариант установки лайков рабочий-------------------------------
  isLiked() {
    return this._isLiked;
  }
  //метод для добавления лайков//
  setLike(newdata) {
    this._isLiked = newdata.likes.filter((item) => {return item._id == this._ownerId;}).length > 0; //проверка по id на наличие моего лайка
    this._cardElement.querySelector('.element__count').textContent = newdata.likes.length;
    if (this._isLiked) {
      this._cardElement.querySelector('.element__like').classList.add('element__like_active');
    } else {
      this._cardElement.querySelector('.element__like').classList.remove('element__like_active');
    }
  }

}


//---------------------- 1 варианту становки лайков  рабочий-------------------------------

  // Проверяет есть ли в массиве лайков(this._likesArray) данной карточки элемент item, содержащий id === моему id(this._ownerId). По результатам проверки: если true, отправляется запрос на удаление лайка, если false - на добавление(см api.toggleLikeCard()). В ответе придет обновленный массив. Его длину и устанавливает на странице setLike() в счетчик лайков. См метод find в MDN.
  /*isLiked() {
    //console.log(this._likesArray);
    return Boolean(this._likesArray.find((item) => {return item._id === this._ownerId}));
  }

  // Устанавливает количество лайков = длине приходящего массива лайков и меняет состояние лайка. item - полученный объект/массив в результате запроса.
  _updateLike(item){
    //this.likes = this.isLiked()
    //console.log(this.likes)
    this._cardElement.querySelector('.element__count').textContent = item.likes.length;
    // здесь this.isLiked тот, который пришел в результате запроса
    if(this.isLiked()) {
      this._cardElement.querySelector('.element__like').classList.add('element__like_active');
    } else {
      this._cardElement.querySelector('.element__like').classList.remove('element__like_active');
    }
  }

  // Обновление массива с лайками(актуализирует информацию о лайках внутри карточки).
  setLike(item) {
    this._likesArray = item.likes; //первоначальный масив лайков data.likes (присвоен в конструкторе) обновляется массивом item, который пришел при ответе с сервера в результате клика на лайк
    this._updateLike(item);
  }
}*/

