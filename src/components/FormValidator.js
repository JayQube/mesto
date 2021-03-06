export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._submitButtonSelector = this._formElement.querySelector(validationConfig.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(validationConfig.inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  disableButton() {
    this._submitButtonSelector.classList.add(this._validationConfig.inactiveButtonClass);
    this._submitButtonSelector.setAttribute('disabled', true);
  };

  enableButton() {
    this._submitButtonSelector.classList.remove(this._validationConfig.inactiveButtonClass);
    this._submitButtonSelector.removeAttribute('disabled');
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  resetErrors() {
      this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  };

  enableValidation() {
    this._setEventListeners();
  };
}