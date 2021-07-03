import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initial-cards.js';
//import initialCards from './initial-cards.js'; //при export default initialCards
export {popupShowImage, popupImage, popupTitle, openPopup};

//-------------Объявление переменных-----------------

//Для попапов с формами
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add-card');

const buttonOpenPopupEdit = document.querySelector('.profile-info__edit-button');
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close_edit');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close_add-card');

// Для формы редактирования профиля
// находим саму форму в DOM
const formEditElement = popupEdit.querySelector('.popup__form_edit'); /*либо не document, а popupElement - если попапов несколько https://learn.javascript.ru/form-elements*/
// находим поля формы в DOM
const formEditInputName = formEditElement.querySelector('.popup__input_user_name');
const formEditInputJob = formEditElement.querySelector('.popup__input_user_job');
//находим элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__activity');

// Для "+" (формы добавления карточки)
const formAddElement = popupAdd.querySelector('.popup__form_add');
const formAddInputName = formAddElement.querySelector('.popup__input_card_name');
const formAddInputLink = formAddElement.querySelector('.popup__input_card_image-link');

// Для попапа c картинкой
const popupShowImage = document.querySelector('.popup_type_image');
const buttonClosePopupImage = popupShowImage.querySelector('.popup__close_image');
const popupImage = popupShowImage.querySelector('.popup__image');
const popupTitle = popupShowImage.querySelector('.popup__title-image');

//Для template
const elements = document.querySelector('.elements');

// Для создания экземпляров классов
const config = {
  //formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  activeButtonClass: 'popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  mismatchErrorMessage: 'Введите адрес сайта.'
};

// Для вызова валидации форм
const FormEditValidator = new FormValidator(config, '.popup__form_edit');
const FormAddValidator = new FormValidator(config, '.popup__form_add');

//-------------Объявление функций-----------------

// открытие любого попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandlerPopup);
}

// открытие попапа редактирования профиля
function openPopupEdit() {
  formEditInputName.value = profileName.textContent;
  formEditInputJob.value = profileJob.textContent;
  openPopup(popupEdit);
};

//закрытие любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyHandlerPopup);
}

//закрытие любого попапа по клавише esc:
function keyHandlerPopup(event) {
  const key = event.key;
  if(key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
    }
}

//закрытие любого попапа по клику по оверлею
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
      //togglePopup(evt.target);
      closePopup(evt.target);
    };
}

// Обработчики «отправки» формы, хотя пока она никуда отправляться не будет
function handleEditFormSubmit (evt) {
  evt.preventDefault();                         // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.

                                                // Получите значение полей jobInput и nameInput из свойства value
                                                // Выберите элементы, куда должны быть вставлены значения полей
  profileName.textContent = formEditInputName.value; // Вставьте новые значения с помощью textContent
  profileJob.textContent = formEditInputJob.value;

  //togglePopup(popupEdit);
  closePopup(popupEdit);
}

function handleAddFormSubmit (evt) {
evt.preventDefault();
const card = new Card({name: formAddInputName.value, link: formAddInputLink.value,}, '#element-template', '.popup_is-opened');
const newCard = card.generateCard();
elements.prepend(newCard);
closePopup(popupAdd);
formAddElement.reset(); //сброс значений инпутов
//const form = evt.currentTarget; т.к. уже есть в FormValidator.js
const FormAddValidators = new FormValidator(config, formAddElement);
FormAddValidators.setSubmitButtonInactiveState(formAddElement); //чтобы после введения валидных данных форма заново открывалась с неактивной кнопкой
}

//-------------Добавление обработчиков-----------------

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
// Мы должны вешать обработчик сабмита на тег формы. Повесила на <button type="submit" class="popup__save">
formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);

buttonOpenPopupEdit.addEventListener('click', openPopupEdit);
//buttonClosePopupEdit.addEventListener('click', () => togglePopup(popupEdit));
buttonClosePopupEdit.addEventListener('click', () => closePopup(popupEdit));

//buttonOpenPopupAdd.addEventListener('click', () => togglePopup(popupAdd));
buttonOpenPopupAdd.addEventListener('click', () => openPopup(popupAdd));
//buttonClosePopupAdd.addEventListener('click', () => togglePopup(popupAdd));
buttonClosePopupAdd.addEventListener('click', () => closePopup(popupAdd));

buttonClosePopupImage.addEventListener('click', () => closePopup(popupShowImage));

popupEdit.addEventListener('mousedown', closePopupOverlay);
popupAdd.addEventListener('mousedown', closePopupOverlay);
popupShowImage.addEventListener('mousedown', closePopupOverlay);

//---------------Вызов функций---------------

// Использование классов

FormEditValidator.enableValidation(config);
FormAddValidator.enableValidation(config);

initialCards.forEach(function(currentItem) {
  const card = new Card(currentItem, '#element-template', '.popup_is-opened');
  const newCard = card.generateCard();
  elements.append(newCard);
});
