function enableValidation() {
  const formEdit = document.querySelector('.popup__form[name="formEdit"]');

  formEdit.addEventListener('submit', handleFormSubmit);
  formEdit.addEventListener('input', handleFormInput);

  const formAdd = document.querySelector('.popup__form[name="formAdd"]');

  formAdd.addEventListener('submit', handleFormSubmit);
  formAdd.addEventListener('input', handleFormInput);

  //setSubmitButtonState(formEdit);
}

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

function handleFormInput(event) {
  const input = event.target; //элемент который отправил это событие, инпут инициализирует событие и в таргет попадает именно он
  const form = event.currentTarget; //то на что повесили событие

  //Шаг 1. Найдем невалидные поля и установаим тексты ошибок
  setCustomError(input);
  // Шаг 2. Показываем тексты ошибок
  showError(input);
  //Шаг3. Активируем или деактивируем кнопку
  setSubmitButtonState(form); //toggleButtonState

}

//ошибки вводим, но не показываем пока
function setCustomError(input) {
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
    input.setCustomValidity ('Введите адрес сайта');
  }
}

//показываем ошибку
function showError(input) {
  //получаем спан и присваиваем ему значение этой ошибки
  const span = document.querySelector(`.${input.id}-error`); // находим сразу все спаны у всех инпутов через ${}
  span.textContent = input.validationMessage; // это сообщение, которое установится в setCustomValidity
  //span.classList.add("popup__input_type_error");
}

function setSubmitButtonState(form) {
  const button = form.querySelector('.popup__button');
  const isValid = form.checkValidity();

  if (isValid) {
    setSubmitButtonActiveState(form);
  } else {
    setSubmitButtonInactiveState(form);
  }
}

//активация кнопки submit
function setSubmitButtonActiveState(form) {
  const button = form.querySelector('.popup__button');
  const isValid = form.checkValidity();

  button.classList.add('popup__save');
  button.classList.remove('popup__button_disabled');
  button.removeAttribute('disabled');
}

//деактивация кнопки submit
function setSubmitButtonInactiveState(form) {
  const button = form.querySelector('.popup__button');
  const isValid = form.checkValidity();

  button.classList.remove('popup__save');
  button.classList.add('popup__button_disabled');
  button.setAttribute('disabled', 'disabled');
}

enableValidation();
