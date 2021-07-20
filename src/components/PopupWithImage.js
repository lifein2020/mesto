import Popup from './Popup.js';
export default class PopupWithImage extends Popup {

    openPopup({linkElement, titleElement}, popupImageSelector, popupTitleSelector) {

      this._popupImageElement = this._popupElement.querySelector(`${popupImageSelector}`); // this._popupElement унаследован от класса Popup
      this._popupTitleElement = this._popupElement.querySelector(`${popupTitleSelector}`);

      this._popupImageElement.src = linkElement;
      this._popupImageElement.alt = titleElement;
      this._popupTitleElement.textContent = titleElement;

      super.openPopup();
      super.setEventListeners();
  }

}
