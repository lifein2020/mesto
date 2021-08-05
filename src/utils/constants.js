export { buttonOpenPopupEdit, buttonOpenPopupAdd, buttonOpenPopupAvatar, formEditInputName, formEditInputJob, popupImage, popupTitle, elements, config }

//-------------Объявление переменных-----------------

// Для попапов
const buttonOpenPopupEdit = document.querySelector('.profile-info__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonOpenPopupAvatar = document.querySelector('.profile__overlay');


const formEditElement = document.querySelector('.popup__form_edit'); /*либо не document, а popupElement - если попапов несколько https://learn.javascript.ru/form-elements*/
const formEditInputName = formEditElement.querySelector('.popup__input_user_name');
const formEditInputJob = formEditElement.querySelector('.popup__input_user_job');

// Для попапа c картинкой
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title-image');

// Для template(шаблона карточки). Куда добавлять созданные карточки.
const elements = document.querySelector('.elements');

// Для создания экземпляров классов
const config = {
  popupEditSelector: '.popup_type_edit',
  popupAddSelector: '.popup_type_add-card',
  popupAvatarSelector: '.popup_type_avatar',
  popupDeliteSelector: '.popup_type_confirm',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  activeButtonClass: 'popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClassUnvisible: 'popup__error',
  errorClass: 'popup__error_visible',
  //mismatchErrorMessage: 'Введите адрес сайта.' // для кастомного текста ошибок
};

