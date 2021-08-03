// Попап с кнопкой подтверждения какого-либо действия

import Popup from './Popup.js'
export default class PopupWithSubmit extends Popup {

  // Метод, который динамически позволяет менять колбэк, который вызывается при нажатии на кнопку сабмита.
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
