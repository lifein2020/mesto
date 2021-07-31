export default class Card {
  constructor({ data, ownerId, handleDeliteCard, handleCardClick}, cardSelector) { //handleCardClick новое название handleShowPopupImageSubmit
    this._ownerId = ownerId; // id мой
    this._dataOwnerId = data.owner._id; //id приходящий с сервера
    this._handleDeliteCard = handleDeliteCard;
    this._handleCardClick = handleCardClick;
    this._name = data.name;
    this._link = data.link;
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
    this._elementTrash = this._cardElement.querySelector('.element__trash');

    this._showCardTrash();
    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._handleLikeCardSubmit();
    });

    this._elementTrash.addEventListener('click', () => {
      this._handleDeliteCard(this);
    });

    this._newElementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeCardSubmit() {
    this._elementLike.classList.toggle('element__like_active');
  }

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
    this._cardElement.remove();
    this._cardElement = null;
  }

}

