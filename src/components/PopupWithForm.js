import Popup from "./Popup.js";
import { inputSelector } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector(formSelector);
    this._setHandleFormSubmit = this._setHandleFormSubmit.bind(this);
  }

  close() {
    this._form.removeEventListener('submit', this._setHandleFormSubmit);
    this._form.reset();
    super.close();
  }

  checkProfileInfo(values) {
    this._inputList = this._form.querySelectorAll(inputSelector);
    this._inputList.forEach(input => {
      input.value = values[input.name];
    });
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(inputSelector);
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _setHandleFormSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._setHandleFormSubmit);
  } 
}