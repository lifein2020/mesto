const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.edit-button');
const closePopupButton = document.querySelector('.popup__close');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); /*либо не document, а popupElement - если попапов несколько https://learn.javascript.ru/form-elements*/
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_user_name');
let jobInput = document.querySelector('.popup__input_user_job');
//Находим элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile-info__name');
let profileJob = document.querySelector('.profile-info__activity');

function togglePopup() {
  nameInput.value = profileName.textContent; //значения полей формы берутся из тегов <h1>
  jobInput.value = profileJob.textContent;   // из <p>
  popup.classList.toggle('popup_is-opened');
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

                                                // Получите значение полей jobInput и nameInput из свойства value
                                                // Выберите элементы, куда должны быть вставлены значения полей
    profileName.textContent = nameInput.value; // Вставьте новые значения с помощью textContent
    profileJob.textContent = jobInput.value;

    togglePopup(evt);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
//Мы должны вешать обработчик сабмита на тег формы. Повесила на <button type="submit" class="popup__save">


//ВАРИАНТ 2 вместо function togglePopup()

/*function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_is_opened');
}
function closePopup() {
  popup.classList.remove('popup_is_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(evt);
}
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
} */

