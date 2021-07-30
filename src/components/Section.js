//отвечает за отрисовку элементов на странице
export default
class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    //this._container = document.querySelector(containerSelector);
    this._container = containerSelector;
  }

   //отрисовка всех элементов
   /*initialCards() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }*/

  initialCards(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }


  //принимает DOM-элемент и добавляет его в контейнер. Получает разметку через функцию-колбэк и вставляет её в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

}

