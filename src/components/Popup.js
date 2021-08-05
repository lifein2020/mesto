//Класс отвечает за открытие и закрытие попапа
export default class Popup {

  constructor (popupSelector) {
    this._popupElement = document.querySelector(`${popupSelector}`); //поиск элемента по селектору
    this._handleEscClose = this._handleEscClose.bind(this); //чтобы класс был виден внутри функции, иначе создаст свой контекст
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

}
