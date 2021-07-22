import '../pages/index.css'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { buttonOpenPopupEdit, buttonOpenPopupAdd, formAddElement, formEditElement, formEditInputName, formEditInputJob, popupImage, popupTitle, elements, config, initialCards } from '../utils/constants.js';

//-------------Создание экземпляров классов-----------------

const FormEditValidator = new FormValidator(config, '.popup__form_edit');
const FormAddValidator = new FormValidator(config, '.popup__form_add');

// Попап с картинкой
const popupShowCardImage = new PopupWithImage('.popup_type_image');
popupShowCardImage.setEventListeners();

// Создание карточки вынесено в отдельную функцию
function createCard(item) {
  const card = new Card(
    {
      handleCardClick: (title, image) => {
        popupShowCardImage.openPopup({
          titleElement: title,
          linkElement: image
        },
          popupImage, //'.popup__image',
          popupTitle //'.popup__title-image'  Мы не должны хардкодить селекторы вручную.
        )
      }
    },
    item,
    '#element-template',
    '.popup_is-opened',
  );
  return card.generateCard(item);
  }

// Отображение картинок по дефолту
const cardsList = new Section ({
  data: initialCards,
  renderer: (currentItem) => {
    const defoltCard = createCard(currentItem);
    cardsList.addItem(defoltCard);  //вместо elements.append(defoltCard);
  }
},
elements //'.elements'
);

// Попап добавления карточек на страницу
const popupWithAddForm = new PopupWithForm({
  handleFormSubmit: ({ card_name, card_image_link }) => {
    const cardAdd = createCard({ name: card_name, link: card_image_link });
    cardsList.addItem(cardAdd);  //elements.prepend(cardAdd);
    popupWithAddForm.closePopup();
  }
},
  config.popupAddSelector, //'.popup_type_add-card',
  config.formSelector,   //'.popup__form_add',
  config.inputSelector // '.popup__input',
);

// Отображение картинок по дефолту
/*const cardsList = new Section ({
  data: initialCards,
  renderer: (currentItem) => {
    const card = new Card({
      /*handleCardClick: (name, link) => {
        //popupShowCardImage.openPopup({link, name}, '.popup__image',
        //'.popup__title-image');

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
elements //'.elements'
);*/

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
  config.popupEditSelector,//'.popup_type_edit',
  config.formSelector,//'.popup__form_edit',
  config.inputSelector//'.popup__input',
);

// Попап добавления карточек на страницу
/*const popupWithAddForm = new PopupWithForm({
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
);*/

// Функция открытия попапа редактирования профиля, описывающая взаимодействие классов
function openPopupEdit() {
  const userData = profileInfo.getUserInfo();
  formEditInputName.value = userData.userName;
  formEditInputJob.value = userData.userActivity;
  popupWithEditForm.openPopup();
  FormEditValidator.hideInputError(formEditElement);
  FormEditValidator.setSubmitButtonActiveState(formEditElement);
};

function openPopupAdd() {
  popupWithAddForm.openPopup()
  FormAddValidator.hideInputError(formAddElement);
  FormAddValidator.setSubmitButtonInactiveState(formAddElement);
}

// ------------------------Вызов методов экземпляров----------------------

FormEditValidator.enableValidation();
FormAddValidator.enableValidation();

cardsList.initialCards();

popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();

buttonOpenPopupEdit.addEventListener('click', () => openPopupEdit());
//buttonOpenPopupAdd.addEventListener('click', () => popupWithAddForm.openPopup());
buttonOpenPopupAdd.addEventListener('click', () => openPopupAdd());
