import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector, popupFormSelector, popupInputSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(`${popupFormSelector}`);
    this._popupInputList = this._popupForm.querySelectorAll(`${popupInputSelector}`);
    this.handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._popupInputList.forEach(input => {
      this._formValues[input.name] = input.value; //[input.name] - ключ, которым является значение name в разметке; input.value - это значение ключа, то что содержится в инпут
    });
    //console.log(this._formValues);
    return this._formValues;

  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues());
      //this.close();
    })

    super.setEventListeners();
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupForm.querySelector('.popup__button').textContent =
        "Сохранение...";
    } else {
      this._popupForm.querySelector('.popup__button').textContent = "Сохранить";
    }
  }

}


