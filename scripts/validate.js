const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    activeButtonClass: 'popup__save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    mismatchErrorMessage: 'Введите адрес сайта.'
};

function enableValidation(config) {
  //находим все формы и записываем их в массив
  const formList = Array.from(document.querySelectorAll('.popup__form')); //config.formSelector
  //на каждый элемент массива вешаем слушателей
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', handleFormSubmit);
    formElement.addEventListener('input', (event) => handleFormInput(event, config));
  })
}

/*function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', preventDefaultFormSubmit);
    setFormListeners(formElement, config);
  }
  )}

function preventDefaultFormSubmit(event) {
  event.preventDefault();
}

function setFormListeners(form, config) {
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', (event) => handleFormInput(event, config));
}*/


function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const isValid = form.checkValidity();

  /*if (isValid) {
    alert('Форма валидна');
    //form.reset(); //для добавления карточки
  } else {
    alert('Форма невалидна');
  }*/
}

function handleFormInput(event, config) {
  const input = event.target; //элемент который отправил это событие, инпут инициализирует событие и в таргет попадает именно он
  const form = event.currentTarget; //то на что повесили событие

  //Шаг 1. Найдем невалидные поля и установаим тексты ошибок
  setCustomError(input, config);
  // Шаг 2. Показываем тексты ошибок
  showError(input);
  //Шаг3. Активируем или деактивируем кнопку
  toggleSubmitButtonState(form, config);
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
function showError(input) {
  //получаем спан и присваиваем ему значение этой ошибки
  const span = document.querySelector(`.${input.id}-error`); // находим сразу все спаны у всех инпутов через ${}
  span.textContent = input.validationMessage; // это сообщение, которое установится в setCustomValidity
  span.classList.add(config.errorClass);
  span.classList.remove(config.inputErrorClass);
}

function toggleSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();

  if (isValid) {
    setSubmitButtonActiveState(form, config);
  } else {
    setSubmitButtonInactiveState(form, config);
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

