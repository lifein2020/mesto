import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    //this._popupForm = document.querySelector(`${popupFormSelector}`);
    //this._popupDelite = document.querySelector('.popup_type_confirm');
    this._popupFormDelite = document.querySelector('.popup__form_confirm');
    //this._popupFormDelite = this._popupElement.querySelector(`${popupFormSelector}`);

    this._handleSubmitCallback = null;

  }

  // Логика работы обработчика отправки формы (handler) описывается во внешней функции deliteCard() и попадает в обработчик при клике на корзину
  setFormSubmit(handler) {
    this._handleSubmitCallback = handler;
  }

  // Вешаем на форму неопределенный обработчик
  setEventListeners() {
    super.setEventListeners();
    this._popupFormDelite.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    })
  }


}
