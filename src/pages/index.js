import './index.css';
import Card from '../components/Card.js';
import { initialCards } from '../utils/initialCards.js'; 
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  buttonEdit,
  buttonAdd,
  formEditElement,
  formAddElement,
  userNameSelector,
  userDescriptionSelector,
  formEditSelector,
  formAddSelector,
  containerSelector,
  popupEditSelector,
  popupAddSelector,
  popupFullscreenSelector,
  popupConfig,
  cardConfig,
  validationConfig
 } from '../utils/constants.js';


const formEditValidator = new FormValidator(validationConfig, formEditElement);
const formAddValidator = new FormValidator(validationConfig, formAddElement);

const popupWithImage = new PopupWithImage(popupFullscreenSelector, popupConfig);

const userInfo = new UserInfo({ userNameSelector, userDescriptionSelector });

const popupEdit = new PopupWithForm({
  popupSelector: popupEditSelector,
  formSelector: formEditSelector,
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues);
  }
});

const popupAdd = new PopupWithForm({
  popupSelector: popupAddSelector,
  formSelector: formAddSelector,
  handleFormSubmit: (item) => {
    section.addItem(createCard({ item }));
  }
});

const createCard = ({ item }) => {
  const card = new Card({
    titlePlace: item.place,
    imageUrl: item.url,
    handleCardClick: () => {
      popupWithImage.open({ item });
    }
  },
    cardConfig
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    section.addItem(createCard({ item }));
  }
},
  containerSelector
);

section.renderItems();

buttonEdit.addEventListener('click', () => {
  popupEdit.setInputsValues(userInfo.getUserInfo());
  popupEdit.open();
  formEditValidator.resetErrors();
  formEditValidator.enableButton();
});

buttonAdd.addEventListener('click', () => {
  popupAdd.open();
  formAddValidator.resetErrors();
  formAddValidator.disableButton();
});

popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();


formEditValidator.enableValidation();
formAddValidator.enableValidation();