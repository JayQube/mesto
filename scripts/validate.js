const showInputError = (keys, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(keys.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(keys.errorClass);
};

const hideInputError = (keys, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(keys.inputErrorClass);
  errorElement.classList.remove(keys.errorClass);
  errorElement.textContent = '';
};

const isValid = (keys, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(keys, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(keys, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const disableButton = (keys, buttonElement) => {
  buttonElement.classList.add(keys.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
} 

const toggleButtonState = (keys, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(keys, buttonElement);
  } else {
    buttonElement.classList.remove(keys.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}; 
 
const setEventListeners = (keys, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(keys.inputSelector));
  const buttonElement = formElement.querySelector(keys.submitButtonSelector);
  toggleButtonState(keys, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(keys, formElement, inputElement);
      toggleButtonState(keys, inputList, buttonElement);
    });
  });
}; 

const enableValidation = ({...keys}) => {
  const formList = Array.from(document.querySelectorAll(keys.formSelector));
  formList.forEach((formElement) => { 
    setEventListeners(keys, formElement);
  }); 
}; 

enableValidation ({
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__confirm-btn',
  inactiveButtonClass: 'popup__confirm-btn_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
});