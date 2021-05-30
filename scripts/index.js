const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add-card');
const popupShowImage = document.querySelector('.popup_type_image');

const ButtonOpenPopupEdit = document.querySelector('.profile-info__edit-button');
const ButtonClosePopupEdit = document.querySelector('.popup__close_edit');
const ButtonClosePopupImage = document.querySelector('.popup__close_image');


// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); /*либо не document, а popupElement - если попапов несколько https://learn.javascript.ru/form-elements*/
// Находим поля формы в DOM
let formInputName = document.querySelector('.popup__input_user_name');
let formInputJob = document.querySelector('.popup__input_user_job');
//Находим элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile-info__name');
let profileJob = document.querySelector('.profile-info__activity');

//Для +
const ButtonOpenPopupAdd = document.querySelector('.profile__add-button');
const ButtonClosePopupAdd = document.querySelector('.popup__close_add-card');
const formAddElement = document.querySelector('.popup__form_add');
let formAddInputName = document.querySelector('.popup__input_card_name'); // formAddInputName
let formAddInputLink = document.querySelector('.popup__input_card_image-link'); //formAddInputLink


//Для template
const elementTemplate = document.querySelector('#element-template');
const elements = document.querySelector('.elements');

//Для 3 попапа
let popupImageSrc = document.querySelector('.element__image').src;
  let popupImageAlt = document.querySelector('.element__image').alt;
  let popupText = document.querySelector('.popup__title-image');


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

const cardItemName = formAddInputName.value; //cardItemName = formAddInputName
const cardItemLink = formAddInputLink.value; //cardItemLink = formAddInputLink
// здесь создаешь объект, который будешь передавать в createCard. Он содержит два свойства: name и link. Их ты заполняешь значениями из переменных, которые определила выше.
const itemData = {
  name: cardItemName,
  link: cardItemLink,
}

function createCard(itemData) {
  //создать карточку
  const newElement = elementTemplate.content.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__image').src = itemData.link;
  newElement.querySelector('.element__image').alt = itemData.name;
  newElement.querySelector('.element__title').textContent = itemData.name;
  //ставить, снимать лайк
  const elementLike = newElement.querySelector('.element__like');
  elementLike.addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like_active');
  });

  return newElement;
}


//динамически добавить карточки на страницу
initialCards.forEach(function(currentItem) {
  const newCard = createCard(currentItem);
  elements.append(newCard);

  let newCardImage = newCard.querySelector('.element__image');
  /*const newCardTitle = newCard.querySelector('.element__title');
  popupShowImage.querySelector('.popup__image').src = newCardImage;
  popupShowImage.querySelector('.popup__image').alt = newCardImage;
  popupShowImage.querySelector('.popup__title-image').textcontent = newCardTitle;*/

    let newCardTitle = newCard.querySelector('.element__title');

    popupImageSrc = newCardImage.src;
    popupImageAlt = newCardImage.alt;
    popupText =  newCardTitle.textcontent;
  newCardImage.addEventListener('click', () => togglePopup(popupShowImage));
});


/*const card = createCard(itemData);
const image = card.querySelector('.element__image');
image.addEventListener('click', () => togglePopup(popupImage));*/


function togglePopup(popup) {
  formInputName.value = profileName.textContent;
  formInputJob.value = profileJob.textContent;
  popup.classList.toggle('popup_is-opened');
}


  /*function togglePopup(item) {
    popups.forEach(function(item){
    nameInput.value = profileName.textContent; //значения полей формы берутся из тегов <h1>
    jobInput.value = profileJob.textContent;   // из <p>
      console.log(item)
    item.classList.toggle('popup_is-opened');
    }
    )}*/


/*function togglePopup() {
  nameInput.value = profileName.textContent; //значения полей формы берутся из тегов <h1>
  jobInput.value = profileJob.textContent;   // из <p>

  popup.classList.toggle('popup_is-opened');
}*/

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

                                                // Получите значение полей jobInput и nameInput из свойства value
                                                // Выберите элементы, куда должны быть вставлены значения полей
    profileName.textContent = formInputName.value; // Вставьте новые значения с помощью textContent
    profileJob.textContent = formInputJob.value;

    togglePopup(popupEdit);
}

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  // 1-й способ:
  itemData.name = formAddInputName.value;
  itemData.link = formAddInputLink.value;
  elements.prepend(createCard(itemData));

  // 2-й способ:
  /*const card = createCard(itemData);
  card.querySelector('.element__image').src = formAddInputLink.value;
  card.querySelector('.element__image').alt = formAddInputName.value;
  card.querySelector('.element__title').textContent = formAddInputName.value;
  elements.prepend(card);*/

  togglePopup(popupAdd);
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
//Мы должны вешать обработчик сабмита на тег формы. Повесила на <button type="submit" class="popup__save">

formAddElement.addEventListener('submit', formAddSubmitHandler);

ButtonOpenPopupEdit.addEventListener('click', () => togglePopup(popupEdit));
ButtonClosePopupEdit.addEventListener('click', () => togglePopup(popupEdit));

ButtonOpenPopupAdd.addEventListener('click', () => togglePopup(popupAdd));
ButtonClosePopupAdd.addEventListener('click', () => togglePopup(popupAdd));

//OpenPopupImage.addEventListener('click', () => togglePopup(popupImage));
ButtonClosePopupImage.addEventListener('click', () => togglePopup(popupShowImage));


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



