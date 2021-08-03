import Popup from './Popup.js'
export default class PopupWithSubmit extends Popup {

  setFormSubmit(handler) {
    this._handleSubmitCallback = handler;
  }

  // Вешаем на форму абстрактный обработчик
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => { // добавляем слушателя прямо на попап, форму искать не надо, чтобы на ей добавить, т.к. работает всплытие.
      evt.preventDefault();
      this._handleSubmitCallback();
    })
  }

}


/*export default class PopupWithSubmit extends Popup{
  constructor(popupSelector, popupFormSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(`${popupFormSelector}`);
  }

  // Метод, который динамически позволяет менять функцию, которая вызывается при нажатии на кнопку сабмита. Логика работы обработчика отправки формы (handler) описывается во внешней функции deliteCard() и попадает в обработчик при клике на корзину
  setFormSubmit(handler) {
    this._handleSubmitCallback = handler;
  }

  // Вешаем на форму абстрактный обработчик
  setEventListeners()/*(popupSelector, popupFormSelector)*{
    super.setEventListeners();
    //this._popupForm = this._popupElement.querySelector('.popup__form_confirm'); //this._popupElement из Popup
    //this._popupForm = this._popupElement.querySelector(`${popupFormSelector}`);
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      setFormSubmit();
    })
  }

}


















/*export default class PopupWithSubmit extends Popup{
  constructor({ handleSubmitDelite }, popupSelector, popupFormSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(`${popupFormSelector}`);
    this.handleSubmitDelite = handleSubmitDelite;
  }

  openPopup(deleteCandidate) {
    super.openPopup();
    this._deleteCandidate = deleteCandidate;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleSubmitDelite();
    })
  }

}*/
