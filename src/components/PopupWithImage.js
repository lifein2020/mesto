import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImageElement, popupTitleElement) {
    super(popupSelector);
    this._popupImageElement = popupImageElement;
    this._popupTitleElement = popupTitleElement;
  }

  openPopup({ linkElement, titleElement }) {
    this._popupImageElement.src = linkElement;
    this._popupImageElement.alt = titleElement;
    this._popupTitleElement.textContent = titleElement;

    super.openPopup();
}

}



/*export default class PopupWithImage extends Popup {

    openPopup({linkElement, titleElement}, popupImageSelector, popupTitleSelector) {

      // Шаблонные строки использовать нет необходимости
      //this._popupImageElement = this._popupElement.querySelector(`${popupImageSelector}`); // this._popupElement унаследован от класса Popup
      //this._popupTitleElement = this._popupElement.querySelector(`${popupTitleSelector}`);

      this._popupImageElement = popupImageSelector;
      this._popupTitleElement = popupTitleSelector;

      this._popupImageElement.src = linkElement;
      this._popupImageElement.alt = titleElement;
      this._popupTitleElement.textContent = titleElement;

      super.openPopup();
  }

}*/
