import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(formSelector);
    this._inputList = this._form.querySelectorAll('.popup__item');
    this._submitButton = this._popupElement.querySelector('.popup__confirm-btn');
    this._submitButtonValue = this._submitButton.value;
    console.log(this._submitButtonValue)
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.value = 'Сохранение...';
    } else {
      this._submitButton.value = this._submitButtonValue;
    }
  }

  close() {
    this._form.reset();
    super.close();
  }

  setInputsValues(values) {
    this._inputList.forEach(input => {
      input.value = values[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}