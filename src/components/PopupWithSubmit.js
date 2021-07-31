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

  setFormSubmit(handler) {
    this._handleSubmitCallback = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormDelite.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    })
  }


}
