const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add-card');
const popupShowImage = document.querySelector('.popup_type_image'); // Найти в DOM попап с картинкой

const buttonOpenPopupEdit = document.querySelector('.profile-info__edit-button');
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close_edit');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close_add-card');
const buttonClosePopupImage = popupShowImage.querySelector('.popup__close_image');

// Для профиля
// находим форму в DOM
const formEditElement = popupEdit.querySelector('.popup__form_edit'); /*либо не document, а popupElement - если попапов несколько https://learn.javascript.ru/form-elements*/
// находим поля формы в DOM
const formEditInputName = formEditElement.querySelector('.popup__input_user_name');
const formEditInputJob = formEditElement.querySelector('.popup__input_user_job');
//находим элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__activity');

//Для +
const formAddElement = popupAdd.querySelector('.popup__form_add');
const formAddInputName = formAddElement.querySelector('.popup__input_card_name');
const formAddInputLink = formAddElement.querySelector('.popup__input_card_image-link');

//Для попапа с картинкой
const popupImage = popupShowImage.querySelector('.popup__image'); // Найти в попапе класс для картинки img
const popupTitle = popupShowImage.querySelector('.popup__title-image'); // Найти в попапе класс для картинки подпись к картинке

//Для template
const elementTemplate = document.querySelector('#element-template');
const elements = document.querySelector('.elements');

//Для создания карточки
/* вызываются всего раз при первой компиляции*/
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
  //ставить, снимать лайк
  const elementLike = newElement.querySelector('.element__like');
  elementLike.addEventListener('click', handleLikeCardSubmit);
  /*elementLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });*/
 //показать попап с картинкой
 newElementImage.addEventListener('click', handleShowPopupImageSubmit);
  /*newElementImage.addEventListener('click', function () {  //...Слушатель кликов по картинке:
    popupImage.src = newElementImage.src;     // Заменить src у img в попапе на src img в карточке
    popupImage.alt = newElementImage.alt;     // Заменить alt у img в попапе на alt img в карточке
    popupTitle.textContent = newElementTitle.textContent; // Заменить текст у подписи в попапе на текст заголовка в карточке
    togglePopup(popupShowImage);              // Сделать попап с картинкой видимым
  });*/
  //удалить карточку
  const elementTrash = newElement.querySelector('.element__trash');
  elementTrash.addEventListener('click', handleDeliteCard);
  /*elementTrash.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });*/

  return newElement;
};

//динамически добавить карточки на страницу
initialCards.forEach(function(currentItem) {
  const newCard = createCard(currentItem);
  elements.append(newCard);
});

function handleLikeCardSubmit(evt) {
  evt.target.classList.toggle('element__like_active');
};

function handleShowPopupImageSubmit(evt) {
  popupImage.src = evt.target.getAttribute('src');
  popupImage.alt = evt.target.getAttribute('alt');
  cardElement = evt.target.closest('.element');
  popupTitle.textContent = cardElement.querySelector('.element__title').textContent;
  //togglePopup(popupShowImage);
  openPopup(popupShowImage);
}

function handleDeliteCard(evt) {
  evt.target.closest('.element').remove();
};

// открытие/закрытие любого попапа
/*function togglePopup(popup) {
  popup.classList.toggle('popup_is-opened');
}*/

//функция закрытия по клавише esc:
function handleKeydownPopup(event) {
  const key = event.key;
  if(key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
    }
  }

//универсальная функция открытия любого попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleKeydownPopup);
}

//универсальная функция закрытия любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleKeydownPopup);
  //formAddElement.reset(); //сброс того что ввели в инпуты. Чтобы после закрытия попапа без сохранения, при повторном открытии инпуты были пустыми
}

//функция открытия попапа редактирования профиля
function openPopupEdit() {
  formEditInputName.value = profileName.textContent;
  formEditInputJob.value = profileJob.textContent;
  //togglePopup(popupEdit);
  openPopup(popupEdit);
  hideInputError(formEditElement, config);
};

//функция открытия попапа добавления карточки на стр
function openPopupAdd() {
  openPopup(popupAdd);
  hideInputError(formAddElement, config);
  formAddElement.reset(); //сброс того что ввели в инпуты. Чтобы после закрытия попапа без сохранения, при повторном открытии инпуты были пустыми
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

    //togglePopup(popupEdit);
    formAddElement.reset();
    closePopup(popupEdit);

}

function handleAddFormSubmit (evt) {
  evt.preventDefault();

    //Здесь каждый раз при вызове функции добавления новой карточки считываются данные из полей формы, т.е. в соответствующие поля созданной карточки вставляются значения из инпутов.
  // 1-й способ рациональный:
  elements.prepend(createCard({
    name: formAddInputName.value,
    link: formAddInputLink.value,
  }));
  // 1-й способ:
/*itemData.name = formAddInputName.value;
  itemData.link = formAddInputLink.value;
  elements.prepend(createCard(itemData));*/
  // 2-й способ:
  /*const card = createCard(itemData);
  card.querySelector('.element__image').src = formAddInputLink.value;
  card.querySelector('.element__image').alt = formAddInputName.value;
  card.querySelector('.element__title').textContent = formAddInputName.value;
  elements.prepend(card);*/
  //togglePopup(popupAdd);
  closePopup(popupAdd);

  formAddElement.reset(); //сброс значений инпутов
  const form = evt.currentTarget;
  setSubmitButtonInactiveState(form, config); //чтобы после введении валидных данных форма заново открывалась с неактивной кнопкой
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', handleEditFormSubmit);
//Мы должны вешать обработчик сабмита на тег формы. Повесила на <button type="submit" class="popup__save">
formAddElement.addEventListener('submit', handleAddFormSubmit);

buttonOpenPopupEdit.addEventListener('click', () => openPopupEdit(popupEdit, config));

//buttonClosePopupEdit.addEventListener('click', () => togglePopup(popupEdit));
buttonClosePopupEdit.addEventListener('click', () => closePopup(popupEdit));

//buttonOpenPopupAdd.addEventListener('click', () => togglePopup(popupAdd));
//buttonOpenPopupAdd.addEventListener('click', () => openPopup(popupAdd)); // если не добавлять функции прятания ошибок и сброса формы
buttonOpenPopupAdd.addEventListener('click', (evt) => openPopupAdd(popupAdd, config));

//buttonClosePopupAdd.addEventListener('click', () => togglePopup(popupAdd));
buttonClosePopupAdd.addEventListener('click', () => closePopup(popupAdd));

//buttonClosePopupImage.addEventListener('click', () => togglePopup(popupShowImage));
buttonClosePopupImage.addEventListener('click', () => closePopup(popupShowImage));

function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
      //togglePopup(evt.target);
      closePopup(evt.target);
    };
}

popupEdit.addEventListener('mousedown', closePopupOverlay);
popupAdd.addEventListener('mousedown', closePopupOverlay);
popupShowImage.addEventListener('mousedown', closePopupOverlay);


