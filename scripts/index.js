import Card from './Card.js';
export {popupShowImage, popupImage, popupTitle, openPopup};

const popupShowImage = document.querySelector('.popup_type_image');
const buttonClosePopupImage = popupShowImage.querySelector('.popup__close_image');
const popupImage = popupShowImage.querySelector('.popup__image');
 const popupTitle = popupShowImage.querySelector('.popup__title-image');

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


initialCards.forEach(function(currentItem) {
  const card = new Card(currentItem, '#element-template', '.popup_is-opened');
  const newCard = card.generateCard();

  document.querySelector('.elements').append(newCard);
});

// открытие любого попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandlerPopup)
}
//закрытие любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyHandlerPopup)
}

//функция открытия попапа редактирования профиля
/*function openPopupEdit() {
  formEditInputName.value = profileName.textContent;
  formEditInputJob.value = profileJob.textContent;
  openPopup(popupEdit);
};*/

//функция закрытия по клавише esc:
function keyHandlerPopup(event) {
  const key = event.key;
  if(key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
    }
  }
//закрытие попапа по клику по оверлею
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
      //togglePopup(evt.target);
      closePopup(evt.target);
    };
}

buttonClosePopupImage.addEventListener('click', () => closePopup(popupShowImage));
//popupEdit.addEventListener('click', closePopupOverlay);
//popupAdd.addEventListener('click', closePopupOverlay);
popupShowImage.addEventListener('click', closePopupOverlay);
