#  Место (проект 9)

**Ссылка  на GitHub Pages**
*  https://lifein2020.github.io/mesto/
### Обзор

* Ссылка  на GitHub Pages
* Описание проекта
* Примененные технологии
* Инструкция по развёртыванию (Quick Start)
* Figma

**Описание проекта**

Mesto: интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки, просматривать фотографии.
При нажатии на кнопку “Edit” появляется всплывающее окно. Информация из профиля пользователя загружается в соответствующие поля.
При открытом попапе можно редактировать соответствующие поля страницы. После внесения изменений и нажатия кнопки «Сохранить» или клавишы “Enter” информация на странице обновляетя, а попап автоматически закрывается.
При нажатии на крестик попап закрывается.
Данные сохраняются на сервере.

**Примененные технологии**

Webpack
* Сборка проекта

HTML
* Соблюдена семантика
* Создана Nested файловая структура по БЭМ:
  - В файле каждого блока, элемента и модификатора описаны только относящиеся к ним стили;
  - Директории с блоками не вложены в другие блоки;
  - Модификаторы содержат только изменяющиеся стили. Модифицируемый элемент или блок не содержит изменяющееся в модификаторе CSS-свойство;
  - Модификаторы импортированы только в те блоки и элементы, которые они модифицируют.
* Для отображения активного всплывающего окна (попапа) используется БЭМ-модификатор с необходимыми CSS-свойствами.

CSS
* Адаптивная верстка;
* Стили подключены в отдельном файле;
* Гриды;
* Flexbox-верстка;
* Чтобы реализовать переполнение блока с появляющимся многоточием в конце применяется text-overflow;
* Все ссылки и интерактивные элементы имеют состояние наведения :hover (применен эффект плавного перехода при трансформации);
* Все диалоговые окна плавно открываются - проявляются из прозрачности и уходят в неё при закрытии.
* Контентные изображения имеют alt с корректным описанием, соответствующим языку страницы.

JavaScript

Функциональность сайта реализована с помощью JavaScript следующим образом:

* 6 карточек на сайте добавляются автоматически с помощью JavaScript.
* У пользователя есть возможность добавить новые карточки на сайт через диалоговое окно, написав имя карточки и ссылки на картинку. Диалоговое окно открывается нажатием на знак "+". При клике на «сохранить» новая карточка попадает в начало контейнера с ними. А диалоговое окно после добавления автоматически закрывается. А также закрывается нажатием на знак "х", клавише esc и по оверлею.
* У пользователя есть возможность редактировать профиль через диалоговое окно, изменив имя и род деятельности. Диалоговое окно открывается нажатием на знак "карандаш". При клике на «сохранить» данные профиля перезаписываются, а диалоговое окно - автоматически закрывается. Также закрывается нажатием на знак "х", клавише esc и по оверлею.
* У пользователя есть возможность просмотра фотографий. Они открываются нажатием на картинку и закрываются кликом на крестик, клавише esc и по оверлею.
* Если лайкнуть карточку, сердечко поменяет цвет.
* При клике на эту иконку карзины карточка удаляется.
* Формы редактирования профиля и добавления карточки на страницу валидируются.
* ООП.
* Код разбит на модули.

* С помощью querySelector найдены элементы:
    попап,
    открывающая его кнопка,
    закрывающая его кнопка,
    форма редактирования профиля,
    поля текстового ввода формы,
    элементы на странице, куда должны быть вставлены значения полей формы.

 * К элементам кнопок открытия и закрытия попапа прикреплен обработчик (слушатель события "клик"). С помощью метода addEventListener он следит за событием "клик" и, когда оно произойдет, вызовет функцию togglePopup.
 Функция-обработчик togglePopup переключает классы попапа методом toggle, отвечающих за состояние открытого и закрытого попапа, берет значения полей value формы из соответствующих элеменов на странице методом textContent.
 Таким образом реализовано открытие, закрытие попапа, отображение данных профиля в полях ввода.

 * К элементу формы попапа прикреплен обработчик. С помощью метода addEventListener он следит за событием “submit” - «отправка» и, когда оно произойдет, вызывает функцию formSubmitHandler. Функция-обработчик formSubmitHandler перезаписывает текстовое содержимое элементов профиля на странице новыми значениями полей формы с помощью свойства textContent вставляет, закрывает попап.
 Таким образом реализовано редактирование профиля на странице.

**Инструкция по развёртыванию (Quick Start)**
Если вы хотите работать с проектом локально:

1. Сделайте fork этого репозитория и клонируйте свою версию репозитория.
2. Установите npm-зависимости:
```sh
npm install
```
3. Запустите сборку проекта. Каждый раз, когда вы вносите изменения в проект будет скомпилирован в папку `dist`
```sh
npm run build
```
4. Запустите сервер локально
```sh
npm run dev
```
Если всё хорошо, то проект запустится на `http://localhost:3000`

**Figma**
* [Ссылки на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1) (https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=14975%3A305)
