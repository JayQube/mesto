import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

const content = document.querySelector('.content');
const buttonEdit = content.querySelector('.profile__edit-btn');
const buttonAdd = content.querySelector('.profile__add-btn');
const nameContent = content.querySelector('.profile__username');
const jobContent = content.querySelector('.profile__description');
const cardsContainer = content.querySelector('.cards__list');

const popupEdit = document.querySelector('.popup_profile');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-btn');

const popupPlace = document.querySelector('.popup_place');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-btn');

const popupFullscreen = document.querySelector('.popup_fullscreen');
const popupFullscreenCloseButton = popupFullscreen.querySelector('.popup__close-btn');

const formElementEdit = document.forms.editProfileForm;
const nameInput = formElementEdit.elements.username;
const jobInput = formElementEdit.elements.description;

const formElementAdd = document.forms.addCardForm;
const placeInput = formElementAdd.elements.place;
const placeUrl = formElementAdd.elements.url;

const cardConfig = {
  cardTemplateSelector: '#card-template',
  cardElementSelector: '.card',
  cardImageSelector: '.card__image',
  cardTitleSelector: '.card__title',
  cardLikeButtonSelector: '.card__like-btn',
  cardTrashButtonSelector: '.card__trash-btn',
  popupFullscreenSelector: '.popup_fullscreen',
  popupImageSelector: '.popup__image',
  popupCaptionSelector: '.popup__caption',
  cardLikeButtonClass: 'card__like-btn_active',
  popupOpenedClass: 'popup_opened',
}

const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__confirm-btn',
  inactiveButtonClass: 'popup__confirm-btn_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
}

const formEditValidator = new FormValidator(validationConfig, formElementEdit);
const formAddValidator = new FormValidator(validationConfig, formElementAdd);

const createCard = (name, link) => {
  const card = new Card(name, link, cardConfig);
  const cardElement = card.generateCard();
  return cardElement;
}

const addCard = (name, link) => {
  const cardElement = createCard(name, link);
  cardsContainer.prepend(cardElement);
}

initialCards.forEach((element) => {
  addCard(element.name, element.link);
});

const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const closePopupMousedown = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  nameContent.textContent = nameInput.value;
  jobContent.textContent = jobInput.value;
  closePopup(popupEdit);
}

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  addCard(placeInput.value, placeUrl.value);
  closePopup(popupPlace);
}

const checkProfileInfo = () => {
  nameInput.value = nameContent.textContent;
  jobInput.value = jobContent.textContent;
}


popupEdit.addEventListener('mousedown', closePopupMousedown);

buttonEdit.addEventListener('click', () => {
  checkProfileInfo();
  openPopup(popupEdit);
  formEditValidator.resetErrors();
  formEditValidator.enableButton();
});

formElementEdit.addEventListener('submit', (evt) => {
  editFormSubmitHandler(evt);
});

popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEdit);
});


popupPlace.addEventListener('mousedown', closePopupMousedown);

buttonAdd.addEventListener('click', () => {
  formElementAdd.reset();
  openPopup(popupPlace);
  formAddValidator.resetErrors();
  formAddValidator.disableButton();
});

formElementAdd.addEventListener('submit', (evt) => {
  addFormSubmitHandler(evt);
});

popupPlaceCloseButton.addEventListener('click', () => {
  closePopup(popupPlace);
})



popupFullscreen.addEventListener('mousedown', closePopupMousedown);

popupFullscreenCloseButton.addEventListener('click', () => {
  closePopup(popupFullscreen);
})

formEditValidator.enableValidation();
formAddValidator.enableValidation();

export { openPopup };