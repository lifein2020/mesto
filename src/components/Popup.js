//Класс отвечает за открытие и закрытие попапа
export default class Popup {

  constructor (popupSelector) {
    this._popupElement = document.querySelector(`${popupSelector}`); //поиск элемента по селектору
    this._handleEscClose = this._handleEscClose.bind(this); //чтобы класс был виден внутри функции, иначе создаст свой контекст
    //this._closePopupOverlay = this._closePopupOverlay.bind(this);
  }

  openPopup() {
    this._popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if(event.key === 'Escape') {
      this.closePopup();
      //console.log(this);
    }
  }

  // клик по кнопке или оверлею
  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        this.closePopup();
      }
    });
  }

  /* вместо

  _closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        this.closePopup();
      };
  }

  _getButtonClose() {
    const buttonClose = this._popupElement
    .querySelector('.popup__close');

    return buttonClose;
  }

  setEventListeners() {
    this._buttonClosePopup = this._getButtonClose();
    this._buttonClosePopup.addEventListener('click', () => this.closePopup());
    this._popupElement.addEventListener('mousedown', this._closePopupOverlay);
  }*/
}

