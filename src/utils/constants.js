export { buttonOpenPopupEdit, buttonOpenPopupAdd, formAddElement, formEditElement, formEditInputName, formEditInputJob, popupImage, popupTitle, elements, config, initialCards }

//-------------Объявление переменных-----------------

// Для попапов
const buttonOpenPopupEdit = document.querySelector('.profile-info__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');

const formAddElement = document.querySelector('.popup__form_add');
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
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  activeButtonClass: 'popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClassUnvisible: 'popup__error',
  errorClass: 'popup__error_visible',
  //mismatchErrorMessage: 'Введите адрес сайта.'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*Обычно экспорты по умолчанию используются для экспортов так называемых HoistableDeclaration, ClassDeclaration или AssignmentExpression.
Чаще всего для переменных делают именованный импорт. По логике default это тоже декларация как и const. Они конечно отличаются, но являются декларацией. Экспорт рекомендуется делать после объявления.*/

//export default initialCard
