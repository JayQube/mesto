import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import {
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  formEditElement,
  formAddElement,
  formAvatarElement,
  userNameSelector,
  userAboutSelector,
  userAvatarSelector,
  formEditSelector,
  formAddSelector,
  formAvatarSelector,
  formConfirmSelector,
  containerSelector,
  popupEditSelector,
  popupAddSelector,
  popupFullscreenSelector,
  popupAvatarSelector,
  popupConfirmSelector,
  popupConfig,
  cardConfig,
  validationConfig,
} from '../utils/constants.js';

let myId = null;
let cardTemporary = null;

const formEditValidator = new FormValidator(validationConfig, formEditElement);
const formAddValidator = new FormValidator(validationConfig, formAddElement);
const formAvatarValidator = new FormValidator(validationConfig, formAvatarElement);
const popupWithImage = new PopupWithImage(popupFullscreenSelector, popupConfig);
const userInfo = new UserInfo(userNameSelector, userAboutSelector, userAvatarSelector);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: '27812169-906a-4979-a2e1-91654db30e03',
    'Content-Type': 'application/json'
  }
});

const section = new Section({
  renderer: (cardItem) => {
    section.addItem(createCard(cardItem));
  }
},
  containerSelector
);

api.getInitialInformation()
  .then(([userData, cardsData]) => {
    cardsData.reverse();
    myId = userData._id;
    userInfo.setUserInfo(userData);
    section.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  })

const popupEdit = new PopupWithForm({
  popupSelector: popupEditSelector,
  formSelector: formEditSelector,
  handleFormSubmit: (inputValues) => {
    popupEdit.renderLoading(true);

    api.setUserInfo(inputValues)
      .then((info) => {
        userInfo.setUserInfo(info);
      })
      .then(() => {
        popupEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEdit.renderLoading(false);
      })
  }
});

const popupAvatar = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  formSelector: formAvatarSelector,
  handleFormSubmit: (inputValue) => {
    popupAvatar.renderLoading(true);

    api.setUserAvatar(inputValue)
      .then((info) => {
        userInfo.setUserInfo(info);
      })
      .then(() => {
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      })
  }
});

const popupAdd = new PopupWithForm({
  popupSelector: popupAddSelector,
  formSelector: formAddSelector,
  handleFormSubmit: (inputValues) => {
    popupAdd.renderLoading(true);

    api.addCard(inputValues)
      .then((cardItem) => {
        section.addItem(createCard(cardItem));
      })
      .then(() => {
        popupAdd.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAdd.renderLoading(false);
      })
  }
});

const popupConfirm = new PopupWithConfirmation({
  popupSelector: popupConfirmSelector,
  formSelector: formConfirmSelector,
  handleFormSubmit: (cardItem) => {
    api.deleteCard(cardItem)
      .then(() => {
        cardTemporary.deleteCard();
      })
      .then(() => {
        popupConfirm.close();
      })
      .catch(res => console.log(res))
  }
});

const createCard = (cardItem) => {
  const card = new Card({
    cardItem,
    myId,
    handleCardClick: () => {
      popupWithImage.open(cardItem);
    },
    handleLikeClick: (cardItem) => {
      api.likeCard(cardItem)
        .then((res) => {
          card.toggleLike();
          card.setLikes(res);
        })
        .catch(res => console.log(res))
    },
    handkeUnlikeClick: (cardItem) => {
      api.unlikeCard(cardItem)
        .then((res) => {
          card.toggleLike();
          card.setLikes(res);
        })
        .catch(res => console.log(res))
    },
    handleDeleteClick: (cardItem) => {
      cardTemporary = card;
      popupConfirm.open(cardItem);
    }
  },
    cardConfig
  );
  const cardElement = card.generateCard();
  return cardElement;
}


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

buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
  formAvatarValidator.resetErrors();
  formAvatarValidator.disableButton();
})

popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
popupConfirm.setEventListeners();


formEditValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();