# Проект 4: Место

### Обзор

* Описание проекта
* Примененные технологии
* Картинки
* Figma
* Ссылка  на GitHub Pages
* Планы по доработке
**Описание проекта**

Mesto: интерактивная страница. куда можно добавлять фотографии, удалять их и ставить лайки.
При нажатии на кнопку “Edit” появляется всплывающее окно. Информация из профиля пользователя загружается в соответствующие поля.
При открытом попапе нажатие на клавишу “Enter” или кнопку «Сохранить» изменяет на странице информацию о пользователе.
При нажатии на крестик попап закрывается.

**Примененные технологии**

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
* text-overflow
* Все ссылки и интерактивные элементы имеют состояние наведения :hover (применен эффект плавного перехода при трансформации);
* Контентные изображения имеют alt с корректным описанием, соответствующим языку страницы.

JS

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

 * К элементу формы попапа прикреплен обработчик. С помощью метода addEventListener он следит за событием “submit” - «отправка» и, когда оно произойдет, вызывает функцию formSubmitHandler. Функция-обработчик formSubmitHandler перезаписывает текстовое содержимое элементов профиля на странице новыми значениями полей формы с помощью свойства textContentвставляет, закрывает попап.
 Таким образом реализовано редактирование профиля на странице.

**Картинки**

* Картинки взяты из Фигмы. [Картинки оптимизированы](https://tinypng.com/), чтобы сайт загружался быстрее.

**Figma**

* [Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)

**Ссылка  на GitHub Pages**
*


**Планы по доработке проекта:**
возможность добавлять фотографии, удалять их и ставить лайки. Сохранять данные после перезагрузки страницы.
