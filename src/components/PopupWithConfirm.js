import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, formSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(formSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardItem);
    });
  }

  open(cardItem) {
    this._cardItem = cardItem;
    super.open();
  }
}