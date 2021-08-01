export default class Card {
  constructor({ data, ownerId, handleLikeCardSubmit, handleDeliteCard, handleCardClick}, cardSelector) { //handleCardClick новое название handleShowPopupImageSubmit
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._likesArray = data.likes;
    //this._likesArray = data.likes.length;
    this._dataOwnerId = data.owner._id; //id приходящий с сервера
    this._ownerId = ownerId; // id мой
    this._handleLikeCardSubmit =handleLikeCardSubmit;
    this._handleDeliteCard = handleDeliteCard;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const newElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return newElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._newElementImage = this._cardElement.querySelector('.element__image');
    this._newElementTitle = this._cardElement.querySelector('.element__title');
    this._newElementImage.alt = this._name;
    this._newElementImage.src = this._link;
    this._newElementTitle.textContent = this._name;
    this._elementLike = this._cardElement.querySelector('.element__like');
    this._elementLikeCount = this._cardElement.querySelector('.element__count');
    this._elementLikeCount.textContent = this._likes; // Устанавливаем количество лайков в карточку
    this._elementTrash = this._cardElement.querySelector('.element__trash');

    this._showCardTrash();
    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._handleLikeCardSubmit(this);//this._handleLikeCardSubmit();
    });

    this._elementTrash.addEventListener('click', () => {
      this._handleDeliteCard(this);
    });

    this._newElementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  /*_handleLikeCardSubmit() {
    this._elementLike.classList.toggle('element__like_active');
  }*/

  /*_handleDeliteCard() {
    this._elementTrash.closest('.element').remove();
  }*/

  _showCardTrash() {
    if (this._ownerId === this._dataOwnerId) {
      /*this._trush = this._cardElement.getElementsByClassName('element__trash');
      this._trush.className.remove('element__trash');*/

      this._cardElement.querySelector('.element__trash').classList.add('element__trash_visible');
    }
  }

  cardDelite() {
    /*this._card = generateCard();
    this._card.remove();
    this._card = null;*/
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Проверяет есть ли в массиве лайков(this._likesArray) данной карточки мой id(this._ownerId). По результатам проверки отправляется запрос либо на удаление лайка, либо на добавление(см api.toggleLikeCard()). В ответе придет обновленный массив. Его длину и устанавливает на странице setLike().
  isLiked() {
    console.log(this._likesArray);
    return Boolean(this._likesArray.find((data) => {return data._id === this._ownerId}));
  }

  // Устанавливает количество лайков = длине приходящего массива лайков и меняет состояние лайка
  _updateLike(item){
    this._element.querySelector(".element__count").textcontent = item.likes.length;
    // здесь this.isLiked тот, который пришел в результате запроса
    if(this.isLiked()) {
      this._element.querySelector('.element__like').classList.add('.element__like_active');
    } else {
      this._element.querySelector('.element__like').classList.remove('.element__like_active');
    }
  }

  // Обновление массива с лайками(актуализирует информацию о лайках внутри карточки)
  setLike(item) {
    this._likesArray = item.likes; //первоначальный масив лайков data.likes (присвоен в конструкторе) обновляем массивом,который пришел в результате клика на лайк
    this._updateLike();
  }

}

