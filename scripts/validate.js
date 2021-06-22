const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    activeButtonClass: 'popup__save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error', // вместо redUnderline: 'popup__input_red',
    errorClassUnvisible: 'popup__error',
    errorClass: 'popup__error_visible',
    mismatchErrorMessage: 'Введите адрес сайта.',
};

function enableValidation(config) {
  //находим все формы и записываем их в массив
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  //на каждый элемент массива вешаем слушателей
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', handleFormSubmit);
    formElement.addEventListener('input', (event) => handleFormInput(event, config));
  })
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const isValid = form.checkValidity();
}

function handleFormInput(event, config) {
  const input = event.target; //элемент который отправил это событие, инпут инициализирует событие и в таргет попадает именно он
  const form = event.currentTarget; //то на что повесили событие

  //Шаг 1. Найдем невалидные поля и установаим тексты ошибок
  setCustomError(input, config);
  // Шаг 2. Показываем тексты ошибок
  //showError(input, config, form);
  //setEventListeners(form, config);
  checkInputValidity(input, config, form)
  //Шаг3. Активируем или деактивируем кнопку
  toggleSubmitButtonState(form, config);
  //hideError(input, config, form);
}

//ошибки вводим, но не показываем пока
function setCustomError(input, config) {
  const validity = input.validity; // validity - встроенный объект в JS, содержит флаги на валидацию

//обнулим ошибку на каждом шаге перед проверками, вдруг пользователь ввел правильно
  input.setCustomValidity("");
  //для инпута type="text"
  if (validity.tooShort || validity.tooLong) {
    const currentLength = input.value.length; // находим длину введенной строки
    const min = input.getAttribute('minlength');
    const max = input.getAttribute('maxlength');

    //setCustomValidity - встроенный метод js, который задает сообщение об ошибке для поля
    input.setCustomValidity(
      `Минимальное колчество символов ${min}. Длина текста сейчас: ${currentLength} символ.`
      );
  }

  //для инпута type="url"
  //если не совпадает с шаблоном
  if (validity.typeMismatch) {
    input.setCustomValidity (config.mismatchErrorMessage);
  }
}

//показываем ошибку
function showError(input, config, form) {
  //получаем спан и присваиваем ему значение этой ошибки
  const span = form.querySelector(`.${input.id}-error`); // находим сразу все спаны у всех инпутов через ${}
  span.textContent = input.validationMessage; // это сообщение, которое установится в setCustomValidity
  span.classList.add(config.errorClass);
  span.classList.remove(config.errorClassUnvisible);//span.classList.remove(config.inputErrorClass);
  input.classList.add(config.inputErrorClass);//input.classList.add(config.redUnderline);
}

//спрятать ошибку
function hideError(input, config, form) {
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = "";
  span.classList.remove(config.errorClass);
  span.classList.add(config.errorClassUnvisible);
  input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(input, config, form) {
  const validity = input.validity;

  if (!validity.valid) {
    showError(input, config, form)
  }
  else {
    hideError(input, config, form)
  }
}

/*function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(inputElement, config, form);
  });
});
}*/

//спрятать ошибку во всех инпутах
function hideInputError(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    hideError(inputElement, config, form);
  });
}

function toggleSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();

  if (isValid) {
    setSubmitButtonActiveState(form, config)
  } else {
    setSubmitButtonInactiveState(form, config)
  }
}

//активация кнопки submit
function setSubmitButtonActiveState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();

  button.classList.add(config.activeButtonClass);
  button.classList.remove(config.inactiveButtonClass);
  button.removeAttribute('disabled');
}

//деактивация кнопки submit
function setSubmitButtonInactiveState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();

  button.classList.remove(config.activeButtonClass);
  button.classList.add(config.inactiveButtonClass);
  button.setAttribute('disabled', 'disabled');
}

enableValidation(config);

