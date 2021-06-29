import {popupShowImage, buttonClosePopupImage, popupImage, popupTitle} from './index.js';
export default


class Card {
  constructor(data, cardSelector) {
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

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._handleLikeCardSubmit();
    });

    this._elementTrash.addEventListener('click', () => {
      this._handleDeliteCard();
    });

    this._newElementImage.addEventListener('click', () => {
      this._handleShowPopupImageSubmit();
    });

    buttonClosePopupImage.addEventListener('click', () => {
      this._closePopup(popupShowImage)
    });

    popupShowImage.addEventListener('click', () => {
      this._closePopupOverlay()
    });
  }

  _handleLikeCardSubmit() {
    this._elementLike.classList.toggle('element__like_active');
  }

  _handleDeliteCard() {
    this._elementTrash.closest('.element').remove();
  }

  _handleShowPopupImageSubmit(evt) {
    popupImage.src = this._newElementImage.getAttribute('src');
    popupImage.alt = this._newElementImage.getAttribute('alt');
    popupTitle.textContent = this._newElementTitle.textContent;
    this._openPopup(popupShowImage);
  }


  _openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._keyHandlerPopup);
  }

  _closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._keyHandlerPopup);
  }

  _closePopupOverlay() {
    if (popupShowImage.classList.contains('popup')) {
      this._closePopup(popupShowImage);
    };
  }

  _keyHandlerPopup(event) {
    const key = event.key;
    if(key === 'Escape') {
      this._popupOpened = document.querySelector('.popup_is-opened');
      this._closePopup(this._popupOpened);
      }
    }
}
