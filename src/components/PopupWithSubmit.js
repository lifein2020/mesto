import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup{
  constructor(popupSelector, popupFormSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(`${popupFormSelector}`);
    //this._form = document.querySelector('.popup__form_confirm');
    this._handleSubmitCallback = null;

  }

  setFormSubmit(handler) {
    this._handleSubmitCallback = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    //вызывать функцию при сабмите
    //нет формы которую надо валидировать.
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    })
  }


}
