export default
class FormValidator {
  constructor(config, formObject) {
    //переменные из конфига
    //this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._activeButtonClass = config.activeButtonClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._mismatchErrorMessage = config.mismatchErrorMessage;
    //DOM-объект формы
    this._formObject = formObject;
  }

  //Находим DOM-объект формы
  _getForm() {
    const specificForm = document
    .querySelector(this._formObject);

    return specificForm;
  }

  // Валидация форм
  enableValidation(config) {
    this._formElement = this._getForm();
    this._formElement.addEventListener('submit', this._handleFormSubmit);
    this._formElement.addEventListener('input', (event) => this._handleFormInput(event, config));

    //this._setSubmitButtonInactiveState(this._formElement); /*нерабочая альтернатива FormAddValidators.setSubmitButtonInactiveState(formAddElement); в index.js */
  }

  _handleFormSubmit = (event) => {
    event.preventDefault();

    this._form = event.currentTarget;
    this._isValid = this._form.checkValidity();
  }

  _handleFormInput = (event, config) => {
    this._input = event.target; //элемент который отправил это событие, инпут инициализирует событие и в таргет попадает именно он
    this._form = event.currentTarget; //то на что повесили событие

    //Шаг 1. Найдем невалидные поля и установаим тексты ошибок
    this._setCustomError(this._input, config);
    // Шаг 2. Показываем тексты ошибок
    this._showError(this._input);
    //Шаг3. Активируем или деактивируем кнопку
    this._toggleSubmitButtonState(this._form);
  }

  //ошибки вводим, но не показываем пока
_setCustomError(input) {
  this._validity = input.validity; // validity - встроенный объект в JS, содержит флаги на валидацию

//обнулим ошибку на каждом шаге перед проверками, вдруг пользователь ввел правильно
  input.setCustomValidity("");
  //для инпута type="text"
  if (this._validity.tooShort || this._validity.tooLong) {
    this._currentLength = input.value.length; // находим длину введенной строки
    this._min = input.getAttribute('minlength');
    this._max = input.getAttribute('maxlength');

    //setCustomValidity - встроенный метод js, который задает сообщение об ошибке для поля
    input.setCustomValidity(
      `Минимальное колчество символов ${this._min}. Длина текста сейчас: ${this._currentLength} символ.`
      );
  }
  //для инпута type="url"
  //если не совпадает с шаблоном
  if (this._validity.typeMismatch) {
    input.setCustomValidity (this._mismatchErrorMessage);
  }
}
  //Показываем ошибку
_showError(input) {
  //получаем спан и присваиваем ему значение этой ошибки
  this._span = document.querySelector(`.${input.id}-error`); // находим сразу все спаны у всех инпутов через ${}
  this._span.textContent = input.validationMessage; // это сообщение, которое установится в setCustomValidity
  this._span.classList.add(this._errorClass);
  this._span.classList.remove(this._inputErrorClass);
}

// Переключение состояния кнопки в зависимости от валидности полей
_toggleSubmitButtonState(form) {
  this._button = form.querySelector(this._submitButtonSelector);
  this._isValid = form.checkValidity();

  if (this._isValid) {
    this._setSubmitButtonActiveState(form);
  } else {
    this.setSubmitButtonInactiveState(form);
  }
}

//активация кнопки submit
_setSubmitButtonActiveState(form) {
  this._button = form.querySelector(this._submitButtonSelector);
  this._isValid = form.checkValidity();

  this._button.classList.add(this._activeButtonClass);
  this._button.classList.remove(this._inactiveButtonClass);
  this._button.removeAttribute('disabled');
}

//деактивация кнопки submit
setSubmitButtonInactiveState(form) {
  this._button = form.querySelector(this._submitButtonSelector);
  this._isValid = form.checkValidity();

  this._button.classList.remove(this._activeButtonClass);
  this._button.classList.add(this._inactiveButtonClass);
  this._button.setAttribute('disabled', 'disabled');
}

}
