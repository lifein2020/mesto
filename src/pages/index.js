import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../components/initial-cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//-------------Объявление переменных-----------------

// Для попапов
const buttonOpenPopupEdit = document.querySelector('.profile-info__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');

const formAddElement = document.querySelector('.popup__form_add');
const formEditElement = document.querySelector('.popup__form_edit'); /*либо не document, а popupElement - если попапов несколько https://learn.javascript.ru/form-elements*/

const formEditInputName = formEditElement.querySelector('.popup__input_user_name');
const formEditInputJob = formEditElement.querySelector('.popup__input_user_job');

// Для template(шаблона карточки). Куда добавлять созданные карточки.
const elements = document.querySelector('.elements');

// Для создания экземпляров классов
const config = {
  //formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  activeButtonClass: 'popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClassUnvisible: 'popup__error',
  errorClass: 'popup__error_visible',
  mismatchErrorMessage: 'Введите адрес сайта.'
};

//-------------Создание экземпляров классов-----------------

const FormEditValidator = new FormValidator(config, '.popup__form_edit');
const FormAddValidator = new FormValidator(config, '.popup__form_add');

// Попап с картинкой
const popupShowCardImage = new PopupWithImage('.popup_type_image');

// Отображение картинок по дефолту
const cardsList = new Section ({
  data: initialCards,
  renderer: (currentItem) => {
    const card = new Card({
      /*handleCardClick: (name, link) => {
        popupShowCardImage.openPopup({link, name}, '.popup__image',
        '.popup__title-image');*/

      handleCardClick: () => {
        popupShowCardImage.openPopup({
          linkElement: currentItem.link,
          titleElement: currentItem.name},
          '.popup__image',
          '.popup__title-image'
          );
      }
    },
    currentItem,
    '#element-template',
    '.popup_is-opened');
    const newCard = card.generateCard();
    elements.append(newCard);
  }

},
'.elements'
);

// Данные профиля на странице
const profileInfo = new UserInfo({userNameSelector: '.profile-info__name', userJobselector: '.profile-info__activity'});

// Попап редактирования профиля
const popupWithEditForm = new PopupWithForm(
  {
    handleFormSubmit: ({name, job}) => {
      profileInfo.setUserInfo({name, job});
      popupWithEditForm.closePopup();
    }
  },
  '.popup_type_edit',
  '.popup__form_edit',
  '.popup__input',
);

// Попап добавления карточек на страницу
const popupWithAddForm = new PopupWithForm({
    handleFormSubmit: ({ card_name, card_image_link }) => {
      const card = new Card(
        {
          handleCardClick: () => {
            popupShowCardImage.openPopup(
              {
                linkElement: card_image_link,
                titleElement: card_name,
              },
              '.popup__image',
              '.popup__title-image'
            );
          }
        },
        { name: card_name, link: card_image_link }, // это this._getInputValues()
        '#element-template',
        '.popup_is-opened'
      );
      const newCard = card.generateCard();
      elements.prepend(newCard);
      popupWithAddForm.closePopup();

      FormAddValidator.setSubmitButtonInactiveState(formAddElement);
    }
  },
  '.popup_type_add-card',
  '.popup__form_add',
  '.popup__input',
);

// Функция открытия попапа редактирования профиля, описывающая взаимодействие классов
function openPopupEdit() {
  const userData = profileInfo.getUserInfo();
  formEditInputName.value = userData.userName;
  formEditInputJob.value = userData.userActivity;
  popupWithEditForm.openPopup();
  FormEditValidator.hideInputError(formEditElement);
  FormEditValidator.setSubmitButtonActiveState(formEditElement);
};


// ------------------------Вызов методов экземпляров----------------------

FormEditValidator.enableValidation();
FormAddValidator.enableValidation();

cardsList.initialCards();

popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();

buttonOpenPopupEdit.addEventListener('click', () => openPopupEdit());
buttonOpenPopupAdd.addEventListener('click', () => popupWithAddForm.openPopup());
