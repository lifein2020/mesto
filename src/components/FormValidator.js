export default
class FormValidator {
  constructor(config, formObject) {
    //значения полей конструктор - переменные из конфига
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._activeButtonClass = config.activeButtonClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClassUnvisible = config.errorClassUnvisible;
    this._errorClass = config.errorClass;
    //this._mismatchErrorMessage = config.mismatchErrorMessage;
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
  enableValidation() {
    this._formElement = this._getForm();  //доступна везде внутри любого метода
    this._formElement.addEventListener('submit', this._handleFormSubmit);
    this._formElement.addEventListener('input', (event) => this._handleFormInput(event));
  }

  _handleFormSubmit = (event) => {
    event.preventDefault();

    this._form = event.currentTarget;
    this._isValid = this._form.checkValidity();
  }

  _handleFormInput = (event) => {
    this._input = event.target; //элемент который отправил это событие, инпут инициализирует событие и в таргет попадает именно он
    this._form = event.currentTarget; //то на что повесили событие

    // ЕСЛИ НАДО установить кастомные тексты ошибок:
    //Шаг 1. Найдем невалидные поля и установаим кастомные тексты ошибок (не по ТЗ)
    /*this._setCustomError(this._input);*/

    // Шаг 2. Показываем стандартные тексты ошибок, если поле не валидно
    this._checkInputValidity(this._input, this._form);

    //Шаг3. Активируем или деактивируем кнопку
    this._toggleSubmitButtonState(this._form);
  }

  //ошибки вводим, но не показываем пока(кастомные тексты ошибок)
/*_setCustomError(input) {
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
}*/

  //Показываем ошибку
_showError(input) {
  //получаем спан и присваиваем ему значение этой ошибки
  this._span = this._formElement.querySelector(`.${input.id}-error`); // находим сразу все спаны у всех инпутов через ${}
  this._span.textContent = input.validationMessage; // validationMessage - стандартные браузерные тексты ошибок. Это сообщение, которое установится в setCustomValidity. "Связываем JS-методы валидации с DOM"
  this._span.classList.add(this._errorClass);
  this._span.classList.remove(this._errorClassUnvisible);
  input.classList.add(this._inputErrorClass);
}

// спрятать ошибку
_hideError(input) {
  this._span = this._formElement.querySelector(`.${input.id}-error`);
  this._span.textContent = "";
  this._span.classList.remove(this._errorClass);
  this._span.classList.add(this._errorClassUnvisible);
  input.classList.remove(this._inputErrorClass);
}

// проверка валидности полей формы
_checkInputValidity(input) {
  this._validity = input.validity;
  input.setCustomValidity("");

  if (!this._validity.valid) {
    this._showError(input);
  }
  else {
    this._hideError(input);
  }
}

// спрятать ошибку во всех инпутах
hideInputError() {
  this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  this._inputList.forEach((inputElement) => {
    this._hideError(inputElement);
  });
}

// Переключение состояния кнопки в зависимости от валидности полей
_toggleSubmitButtonState() {
  this._button = this._formElement.querySelector(this._submitButtonSelector);
  this._isValid = this._formElement.checkValidity();

  if (this._isValid) {
    this.setSubmitButtonActiveState();
  } else {
    this.setSubmitButtonInactiveState();
  }
}

// активация кнопки submit
setSubmitButtonActiveState() {
  this._button = this._formElement.querySelector(this._submitButtonSelector);
  this._isValid = this._formElement.checkValidity();

  this._button.classList.add(this._activeButtonClass);
  this._button.classList.remove(this._inactiveButtonClass);
  this._button.removeAttribute('disabled');
}

// деактивация кнопки submit
setSubmitButtonInactiveState() {
  this._button = this._formElement.querySelector(this._submitButtonSelector);
  this._isValid = this._formElement.checkValidity();

  this._button.classList.remove(this._activeButtonClass);
  this._button.classList.add(this._inactiveButtonClass);
  this._button.setAttribute('disabled', 'disabled');
}

}
