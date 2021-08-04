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

// Данные профиля на странице
const profileInfo = new UserInfo({userNameSelector: '.profile-info__name', userJobSelector: '.profile-info__activity'});
//console.log(profileInfo)

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
  profileInfo.setUserInfo(result); //чтобы данные сохранялись после перезагрузки страницы
  profileInfo.setUserAvatar({ userAvatarSelector: '.profile__avatar' }, result);
})
.catch((err) => {
  console.log("Ошибка в получении данных пользователя"); // выведем ошибку в консоль
})

// Попап с подтверждением удаления карточки
const popupWithSubmitDelite = new PopupWithSubmit(config.popupDeliteSelector);
popupWithSubmitDelite.setEventListeners();

// Функция удаления карточки. Здесь мы открываем попап с подтверждением и задаём коллбэк handler в setFormSubmit, где ходим на сервер, локально удаляем карточку и потом закрываем попап.
function deliteCard(card) {
  console.log(card)
  popupWithSubmitDelite.setFormSubmit(() => {
    api.deliteCard(card._cardId) // см в консоли свойства объекта card
      .then(() => {
        card.deliteCardElement();
        popupWithSubmitDelite.closePopup();
      })
      .catch((err) => {
        console.log(err)//("Ошибка при удалении карточки");
      });
  });
  popupWithSubmitDelite.openPopup();
}


// Ставим/удаляем лайки:

//---------------------- 1 вариант рабочий-------------------------------
// Сервер отвечает новой карточкой data, в которой массив лайков уже обновлен
/*function handleLikeCardSubmit(card) {
  console.log(card)
  api.toggleLikeCard(card._cardId, card.isLiked())
    .then((data) => {
      card.setLike(data);
      //console.log(data)
    })
    .catch((err) => {
      console.log(err);//("Ошибка установки лайка");
    })
  };*/

//---------------------- 2 вариант рабочий-------------------------------
  function handleLikeCardSubmit(card, data) {
    const promise = card.isLiked() ? api.deliteLikeCard(data._id) : api.putLikeCard(data._id);
    promise
      .then((data) => {
        card.setLike(data);
      })
      .catch((err) => {
        console.log(err)//(`${err}`);
      });
  }

// Создание карточки вынесено в отдельную функцию
function createCard(item) {
  const card = new Card(
    {
      data: item,
      ownerId: userData._id, // мой id
      handleLikeCardSubmit: () => handleLikeCardSubmit(card, item), //(card) для 1 варианта
      handleDeliteCard: () => deliteCard(card),    //{ deliteCard(card); console.log(card)},
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

// Инициализируем карточки после прихода данных с сервера
api.getAboutCardsInfo()
.then(cardsArray => {
  //console.log(cardsArray);
  cardsList.initialCards(cardsArray);
}
)
.catch((err) => {
  console.log(err)//("Ошибка при получении карточек с сервера");
});

// Попап добавления карточек на страницу
const popupWithAddForm = new PopupWithForm({
  handleFormSubmit: ({ card_name, card_image_link }) => {
    popupWithAddForm.renderLoading(true);
    api.postAddCard({ card_name, card_image_link })
    .then(card => {
      const cardAdd = createCard(card);//({ name: card.name, link: card.link, likes: card.likes, cardId: card._id, ownerId: card.owner._id });
      cardsList.addItem(cardAdd);
    })
    .then(() => {
      popupWithAddForm.closePopup();
    })
    .catch((err) => {
      console.log(err);"Ошибка при добавлении карточек на страницу"
    })
    .finally(() => {
      popupWithAddForm.renderLoading(false);
    })
  }
},
  config.popupAddSelector,
  config.formSelector,
  config.inputSelector
);

// Попап редактирования профиля
const popupWithEditForm = new PopupWithForm(
  {
    handleFormSubmit: ({name, job}) => {
      popupWithEditForm.renderLoading(true);
      api.patchAboutUserInfo({name, job})
      .then(dataProfile => {
        //console.log(dataProfile)
        profileInfo.setUserInfo(dataProfile);
        //console.log(dataProfile)
        popupWithEditForm.closePopup();
      })
      .catch((err) => {
        console.log("Ошибка при редактировании профиля"); // выведем ошибку в консоль
      })
      .finally(() => {
        popupWithEditForm.renderLoading(false);
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
    popupWithAvatarForm.renderLoading(true);
    api.patchAvatarUser({ avatar_link })
    .then(dataProfile => {
      profileInfo.setUserAvatar({ userAvatarSelector: '.profile__avatar' }, dataProfile);
      popupWithAvatarForm.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithAvatarForm.renderLoading(false);
    })
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


//получение персональных данных с сервера и массива карточек

/*Promise.all([api.getAboutCardsInfo(), api.getAboutUserInfo()])
.then(([result, { userAvatarSelector: '.profile__avatar' }, cardsArray ]) => {
  profileInfo.setUserInfo(result);
  profileInfo.setUserAvatar({ userAvatarSelector: '.profile__avatar' }, result);
  userData = result;
  cardsList.initialCards(cardsArray);
})
.catch((err) => {
  console.log(err);//(`${err}`);
});*/
