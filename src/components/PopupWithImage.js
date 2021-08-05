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
