import '../pages/index.css'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import { buttonOpenPopupEdit, buttonOpenPopupAdd, buttonOpenPopupAvatar, formAddElement, formEditElement, formEditInputName, formEditInputJob, popupImage, popupTitle, elements, elementCount, config} from '../utils/constants.js';

//-------------Создание экземпляров классов-----------------

const FormEditValidator = new FormValidator(config, '.popup__form_edit');
const FormAddValidator = new FormValidator(config, '.popup__form_add');
const FormAvatarValidator = new FormValidator(config, '.popup__form_avatar');

// Попап с картинкой
const popupShowCardImage = new PopupWithImage('.popup_type_image');
popupShowCardImage.setEventListeners();

let userData

fetch('https://nomoreparties.co/v1/cohort-26/users/me', {
  headers: {
    authorization: 'd11963a5-3631-4d4e-b873-aed64d959e3c',
    'Content-Type': 'application/json'
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    //console.log(result);
    userData = result;
    //console.log(userData)
  })
   .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })



// Создание карточки вынесено в отдельную функцию
function createCard(item) { //(item)
  const card = new Card(
    {
      data: item,
      ownerId: userData._id, // мой id
      /*handleLikeCardSubmit: (cardInstance) => handleLikeCardSubmit(cardInstance),*/
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

// Отображение картинок по дефолту
const cardsList = new Section ({
  //data: initialCards, // конструктор создается раньше, чем приходят данные. Поэтому ассинхронно приходящие данные передаем напрямую в метод initialCards(см ниже)
  renderer: (currentItem) => {
    const defoltCard = createCard(currentItem);
    cardsList.addItem(defoltCard);  //вместо elements.append(defoltCard);
  }
},
elements //'.elements'
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

function openPopupAdd() {
  popupWithAddForm.openPopup()
  FormAddValidator.hideInputError(formAddElement);
  FormAddValidator.setSubmitButtonInactiveState(formAddElement);
}

//function openAvatar() {}

// ------------------------Вызов методов экземпляров----------------------

FormEditValidator.enableValidation();
FormAddValidator.enableValidation();
FormAvatarValidator.enableValidation();

//cardsList.initialCards();

//popupWithEditForm.setEventListeners();
//popupWithAddForm.setEventListeners();

buttonOpenPopupEdit.addEventListener('click', () => openPopupEdit());
//buttonOpenPopupAdd.addEventListener('click', () => popupWithAddForm.openPopup());
buttonOpenPopupAdd.addEventListener('click', () => openPopupAdd());
//buttonOpenPopupAvatar.addEventListener('click', () => popupWithAvatarForm.openPopup())

//------------------------------9 sprint----------------------------------

/*fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards ', {
  headers: {
    authorization: 'd11963a5-3631-4d4e-b873-aed64d959e3c'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });*/

  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/cards',
    headers: {
      authorization: 'd11963a5-3631-4d4e-b873-aed64d959e3c',
      'Content-Type': 'application/json'
    }
  });

  api.getInitialCards()
  .then(cardsArray => {
    cardsList.initialCards(cardsArray);
    //console.log(cardsArray);
  }
  )
  /*.then(cardsArray => {
    cardsArray.forEach(item => {
      elementCount.textContent =  item.likes.length;
    })
  })*/
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// Попап добавления карточек на страницу
const popupWithAddForm = new PopupWithForm({
  handleFormSubmit: ({ card_name, card_image_link }) => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards', {
      method: 'POST',
      body: JSON.stringify({
        name: card_name,
        link: card_image_link
      }),
      headers: {
        authorization: 'd11963a5-3631-4d4e-b873-aed64d959e3c',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(card => {
      //console.log(card)
      const cardAdd = createCard({ name: card.name, link: card.link });
      cardsList.addItem(cardAdd);  //elements.prepend(cardAdd);

      popupWithAddForm.closePopup();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }
},
  config.popupAddSelector, //'.popup_type_add-card',
  config.formSelector,   //'.popup__form_add',
  config.inputSelector // '.popup__input',
);
popupWithAddForm.setEventListeners();



// Данные профиля на странице
const profileInfo = new UserInfo({userNameSelector: '.profile-info__name', userJobselector: '.profile-info__activity'});
//console.log(profileInfo)

// Попап редактирования профиля
const popupWithEditForm = new PopupWithForm(
  {
    handleFormSubmit: ({name, job}) => {
      fetch('https://mesto.nomoreparties.co/v1/cohort-26/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'd11963a5-3631-4d4e-b873-aed64d959e3c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(dataProfile => {
      //console.log(dataProfile)
      profileInfo.setUserInfo(dataProfile);
      popupWithEditForm.closePopup();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    }
  },
  config.popupEditSelector,//'.popup_type_edit',
  config.formSelector,//'.popup__form_edit',
  config.inputSelector//'.popup__input',
)
popupWithEditForm.setEventListeners();

// Замена аватара
const popupWithAvatarForm = new PopupWithForm({
  handleFormSubmit: ({ avatar_link }) => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-26/users/me/avatar', {
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

buttonOpenPopupAvatar.addEventListener('click', () => popupWithAvatarForm.openPopup());
popupWithAvatarForm.setEventListeners();


//const popupWithSubmitDelite = new PopupWithSubmit(config.popupDeliteSelector);
const popupWithSubmitDelite = new PopupWithSubmit('.popup_type_confirm');
popupWithSubmitDelite.setEventListeners();

function deliteCard(card) {
  popupWithSubmitDelite.setFormSubmit(() => {
    //api.deliteCard(card.cardId)
    fetch('https://mesto.nomoreparties.co/v1/cohortId/cards/1afc6de1c6708c99f74c26a1', {
      method: 'DELETE',
      headers: {
        authorization: 'd11963a5-3631-4d4e-b873-aed64d959e3c',
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (res.ok) {
        //console.log(res);
        return res.json();

      }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
      .then(() => {
        //console.log(card);
        //card.cardDelite();
        popupWithSubmitDelite.closePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  popupWithSubmitDelite.openPopup();
}


//Ставим/удаляем лайки

/*function handleLikeCardSubmit(card) {
  //api.changeLikeCard(card.cardId, card.isLiked())
  fetch
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(`$(err)`);
    })
  };*/

//buttonOpenPopupDelite.addEventListener('click', () => popupWithSubmitDelite.openPopup());

// Замена аватара 2
/*const popupWithAvatarForm = new PopupWithForm({
  handleFormSubmit: ({ avatar_link }) => {

      const imageAvatar = document.querySelector('.profile__avatar');
      imageAvatar.setAttribute("src", { avatar_link });
      //profileInfo.setAttributeUserInfo(dataProfile);

    }
  },
  config.popupAvatarSelector,
  config.formSelector,
  config.inputSelector
)
buttonOpenPopupAvatar.addEventListener('click', () => popupWithAvatarForm.openPopup());
popupWithAvatarForm.handleFormSubmit();*/


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
