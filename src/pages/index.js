import '../pages/index.css'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import { buttonOpenPopupEdit, buttonOpenPopupAdd, buttonOpenPopupAvatar, formAddElement, formEditElement, formAvatarElement, formEditInputName, formEditInputJob, popupImage, popupTitle, elements, elementCount, config} from '../utils/constants.js';

//-------------Создание экземпляров классов-----------------

const FormEditValidator = new FormValidator(config, '.popup__form_edit');
const FormAddValidator = new FormValidator(config, '.popup__form_add');
const FormAvatarValidator = new FormValidator(config, '.popup__form_avatar');

// Попап с картинкой
const popupShowCardImage = new PopupWithImage('.popup_type_image');

// Попап с подтверждением на удаление карточки
//const popupWithSubmitDelite = new PopupWithSubmit(config.popupDeliteSelector); // почему не работает?
const popupWithSubmitDelite = new PopupWithSubmit('.popup_type_confirm');


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/',
  headers: {
    authorization: 'd11963a5-3631-4d4e-b873-aed64d959e3c',
    'Content-Type': 'application/json'
  }
});

let userData

api.getAboutUserInfo()
.then((result) => {
  //console.log(result);
  userData = result;
  //console.log(userData)
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
})

function deliteCard(card) {
  popupWithSubmitDelite.setFormSubmit(() => {
    api.deliteCard(card.cardId)
      .then(() => {
        console.log(card);
        card.cardDelite();
        popupWithSubmitDelite.closePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  popupWithSubmitDelite.openPopup();
}

// Ставим/удаляем лайки
// Сервер отвечает новой карточкой data, в которой массив данных уже обновлен setLike
function handleLikeCardSubmit(card) {
  api.toggleLikeCard(card.cardId, card.isLiked())
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log ("Ошибка установки лайка");//вместо(`$(err)`);
    })
  };


// Создание карточки вынесено в отдельную функцию
function createCard(item) {
  const card = new Card(
    {
      data: item,
      ownerId: userData._id, // мой id
      handleLikeCardSubmit: (cardInstance) => handleLikeCardSubmit(cardInstance),
      handleDeliteCard: (cardInstance) => {
        console.log(cardInstance);
        deliteCard(cardInstance)
      },
        /* либо popupWithSubmitDelite.openPopup();
        popupWithSubmitDelite.setFormSubmit(() => {}*/
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
    '#element-template',
    '.popup_is-opened',
  );
  return card.generateCard(item);
  }

// Отрисовка картинок по дефолту
const cardsList = new Section ({
  //data: initialCards, // конструктор создается раньше, чем приходят данные. Поэтому ассинхронно приходящие данные передаем напрямую в метод initialCards(см ниже)
  renderer: (currentItem) => {
    const defoltCard = createCard(currentItem);
    cardsList.addItem(defoltCard);
  }
},
elements
);

// Инициализируем карточки по дефолту после прихода данных с сервера
api.getInitialCards()
.then(cardsArray => {
  //console.log(cardsArray)
  cardsList.initialCards(cardsArray);
  //console.log(cardsArray);
}
)
.catch((err) => {
  console.log(err);
});

// Попап добавления карточек на страницу
const popupWithAddForm = new PopupWithForm({
  handleFormSubmit: ({ card_name, card_image_link }) => {
    api.postAddCard({ card_name, card_image_link })
    .then(card => {
      //console.log(card)
      const cardAdd = createCard({ name: card.name, link: card.link });
      cardsList.addItem(cardAdd);

      popupWithAddForm.closePopup();
      debugger
    })
    .catch((err) => {
      console.log("Ошибка при добавлении карточек на страницу");
    });
  }
},
  config.popupAddSelector,
  config.formSelector,
  config.inputSelector
);


// Данные профиля на странице
const profileInfo = new UserInfo({userNameSelector: '.profile-info__name', userJobselector: '.profile-info__activity'});
//console.log(profileInfo)

// Попап редактирования профиля
const popupWithEditForm = new PopupWithForm(
  {
    handleFormSubmit: ({name, job}) => {
      api.patchAboutUserInfo({name, job})
      .then(dataProfile => {
        //console.log(dataProfile)
        profileInfo.setUserInfo(dataProfile);
        console.log(dataProfile)
        popupWithEditForm.closePopup();
      })
      .catch((err) => {
        console.log("Ошибка при редактировании профиля"); // выведем ошибку в консоль
      })
    }
  },
  config.popupEditSelector,
  config.formSelector,
  config.inputSelector
)


// Смена аватара
const popupWithAvatarForm = new PopupWithForm({
  handleFormSubmit: ({ avatar_link }) => {
    api.patchAvatarUser({ avatar_link })
    .then(data => {
      //console.log(data)
      const imageAvatar = document.querySelector('.profile__avatar');
      imageAvatar.setAttribute("src", data.avatar);
      popupWithAvatarForm.closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
  }
},
  config.popupAvatarSelector,
  config.formSelector,
  config.inputSelector
)

// ------------------------ Функции, описывающие взаимодействие классов ----------------------

// Функция открытия попапа редактирования профиля
function openPopupEdit() {
  const userData = profileInfo.getUserInfo();
  formEditInputName.value = userData.userName;
  formEditInputJob.value = userData.userActivity;
  popupWithEditForm.openPopup();
  FormEditValidator.hideInputError(formEditElement);
  FormEditValidator.setSubmitButtonActiveState(formEditElement);
};

// Функция открытия попапа добавления карточки
function openPopupAdd() {
  popupWithAddForm.openPopup();
  FormAddValidator.hideInputError(formAddElement);
  FormAddValidator.setSubmitButtonInactiveState(formAddElement);
}

// Функция открытия попапа смены аватара
function openPopupAvatar() {
  popupWithAvatarForm.openPopup();
  FormAvatarValidator.hideInputError(formAvatarElement);
  FormAvatarValidator.setSubmitButtonActiveState(formAvatarElement);
}

// ------------------------Вызов методов экземпляров----------------------

FormEditValidator.enableValidation();
FormAddValidator.enableValidation();
FormAvatarValidator.enableValidation();

popupShowCardImage.setEventListeners();
popupWithSubmitDelite.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithAvatarForm.setEventListeners();

//buttonOpenPopupAdd.addEventListener('click', () => popupWithAddForm.openPopup());
buttonOpenPopupEdit.addEventListener('click', () => openPopupEdit());
buttonOpenPopupAdd.addEventListener('click', () => openPopupAdd())
buttonOpenPopupAvatar.addEventListener('click', () => openPopupAvatar());






//******************************************************************************/
/* Замена аватара
const popupWithAvatarForm = new PopupWithForm({
  handleFormSubmit: ({ avatar_link }) => {
    /*fetch('https://mesto.nomoreparties.co/v1/cohort-26/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'd11963a5-3631-4d4e-b873-aed64d959e3c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar_link
      })
    })
    .then(res => {
      if (res.ok) {
        //console.log(res);
        return res.json();

      }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    //api.patchAvatarUser({ avatar_link })
    .then(data => {
      //console.log(data)
      const imageAvatar = document.querySelector('.profile__avatar');
      imageAvatar.setAttribute("src", data.avatar);
      popupWithAvatarForm.closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
  }
},
  config.popupAvatarSelector,
  config.formSelector,
  config.inputSelector
)*/


//*****************  8sprint  ********************/

// Попап добавления карточек на страницу
/*const popupWithAddForm = new PopupWithForm({
  handleFormSubmit: ({ card_name, card_image_link }) => {
    const cardAdd = createCard({ name: card_name, link: card_image_link });
    cardsList.addItem(cardAdd);  //elements.prepend(cardAdd);
    popupWithAddForm.closePopup();
  }
},
  config.popupAddSelector, //'.popup_type_add-card',
  config.formSelector,   //'.popup__form_add',
  config.inputSelector // '.popup__input',
);*/

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

/*// Данные профиля на странице
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
);*/

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
