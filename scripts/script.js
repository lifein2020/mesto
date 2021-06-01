const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add-card');
const popupShowImage = document.querySelector('.popup_type_image'); // Найти в DOM попап с картинкой

const buttonOpenPopupEdit = document.querySelector('.profile-info__edit-button');
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close_edit');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close_add-card');
const buttonClosePopupImage = popupShowImage.querySelector('.popup__close_image');

// Для профиля
// Находим форму в DOM
const formEditElement = popupEdit.querySelector('.popup__form_edit'); /*либо не document, а popupElement - если попапов несколько https://learn.javascript.ru/form-elements*/
// Находим поля формы в DOM
let formEditInputName = formEditElement.querySelector('.popup__input_user_name');
let formEditInputJob = formEditElement.querySelector('.popup__input_user_job');
//Находим элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile-info__name');
let profileJob = document.querySelector('.profile-info__activity');

//Для +
const formAddElement = popupAdd.querySelector('.popup__form_add');
let formAddInputName = formAddElement.querySelector('.popup__input_card_name');
let formAddInputLink = formAddElement.querySelector('.popup__input_card_image-link');

//Для попапа с картинкой
const popupImage = popupShowImage.querySelector('.popup__image'); // Найти в попапе класс для картинки img
const popupTitle = popupShowImage.querySelector('.popup__title-image'); // Найти в попапе класс для картинки подпись к картинке

//Для template
const elementTemplate = document.querySelector('#element-template');
const elements = document.querySelector('.elements');

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

const cardItemName = formAddInputName.value;
const cardItemLink = formAddInputLink.value;
// здесь создается объект, который будет передаваться в createCard. Он содержит два свойства: name и link. Их заполняют значениями из переменных, которые определены выше.
const itemData = {
  name: cardItemName,
  link: cardItemLink,
};

function createCard(itemData) {  //...Здесь код, создающий карточку
  //создать карточку
  const newElement = elementTemplate.content.querySelector('.element').cloneNode(true);
  const newElementImage = newElement.querySelector('.element__image');
  const newElementTitle = newElement.querySelector('.element__title');
  newElementImage.src = itemData.link;
  newElementImage.alt = itemData.name;
  newElementTitle.textContent = itemData.name;
  //newElement.querySelector('.element__title').textContent = itemData.name;
  //ставить, снимать лайк
  const elementLike = newElement.querySelector('.element__like');
  elementLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
 //показать попап с картинкой
  //const newElementTitle = newElement.querySelector('.element__title');
  newElementImage.addEventListener('click', function (itemData) {  //...Слушатель кликов по картинке:
    popupImage.src = newElementImage.src;     // Заменить src у img в попапе на src img в карточке
    popupImage.alt = newElementImage.alt;     // Заменить alt у img в попапе на alt img в карточке
    popupTitle.textContent = newElementTitle; // Заменить текст у подписи в попапе на текст заголовка в карточке
    togglePopup(popupShowImage);              // Сделать попап с картинкой видимым
  });
  //удалить карточку
  const elementTrash = newElement.querySelector('.element__trash');
  elementTrash.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });

  return newElement;
};

//динамически добавить карточки на страницу
initialCards.forEach(function(currentItem) {
  const newCard = createCard(currentItem);
  elements.append(newCard);
});

// открытие/закрытие любого попапа
function togglePopup(popup) {
  formEditInputName.value = profileName.textContent;
  formEditInputJob.value = profileJob.textContent;
  popup.classList.toggle('popup_is-opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

                                                // Получите значение полей jobInput и nameInput из свойства value
                                                // Выберите элементы, куда должны быть вставлены значения полей
    profileName.textContent = formEditInputName.value; // Вставьте новые значения с помощью textContent
    profileJob.textContent = formEditInputJob.value;

    togglePopup(popupEdit);
}

function handleAddFormSubmit (evt) {
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
  formAddElement.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', handleEditFormSubmit);
//Мы должны вешать обработчик сабмита на тег формы. Повесила на <button type="submit" class="popup__save">
formAddElement.addEventListener('submit', handleAddFormSubmit);


buttonOpenPopupEdit.addEventListener('click', () => togglePopup(popupEdit));
buttonClosePopupEdit.addEventListener('click', () => togglePopup(popupEdit));

buttonOpenPopupAdd.addEventListener('click', () => togglePopup(popupAdd));
buttonClosePopupAdd.addEventListener('click', () => togglePopup(popupAdd));

buttonClosePopupImage.addEventListener('click', () => togglePopup(popupShowImage));


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
