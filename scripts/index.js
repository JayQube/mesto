import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

const cardTemplateSelector = document.querySelector('#card-template');

const cardConfig = {
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

const initialCards = [
  {
    name: 'Вашингтон',
    link: 'https://images.unsplash.com/photo-1581097543550-b3cbe2e6ea6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Лондон',
    link: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80'
  },
  {
    name: 'Пекин',
    link: 'https://images.unsplash.com/photo-1611416517780-eff3a13b0359?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2098&q=80'
  },
  {
    name: 'Берлин',
    link: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Париж',
    link: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80'
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  }
];

const createCard = (name, link) => {
  const card = new Card(name, link, cardTemplateSelector, cardConfig);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

initialCards.forEach((element) => {
  createCard(element.name, element.link);
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

const setFormValidator = (validationConfig, formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
}

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  nameContent.textContent = nameInput.value;
  jobContent.textContent = jobInput.value;
  closePopup(popupEdit);
}

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  createCard(placeInput.value, placeUrl.value);
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
  setFormValidator(validationConfig, formElementEdit);
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
  setFormValidator(validationConfig, formElementAdd);
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