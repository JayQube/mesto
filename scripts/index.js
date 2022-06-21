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
const popupImage = popupFullscreen.querySelector('.popup__image');
const popupCaption = popupFullscreen.querySelector('.popup__caption');

const formElementEdit = document.forms.editProfileForm;
const nameInput = formElementEdit.elements.username;
const jobInput = formElementEdit.elements.description;

const formElementAdd = document.forms.addCardForm;
const placeInput = formElementAdd.elements.place;
const placeUrl = formElementAdd.elements.url;


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

const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-btn_active');
}

const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
}

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

const zoomImage = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(popupFullscreen);
}

const createCard = (name, link) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-btn');
  const cardTrashButton = cardElement.querySelector('.card__trash-btn_action_delete');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

  cardLikeButton.addEventListener('click', likeCard)
  cardTrashButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => {
      zoomImage(name, link)
    });

  return cardElement
}

initialCards.forEach((element) => {
  const card = createCard(element.name, element.link);
  cardsContainer.prepend(card);
});

const editFormSubmitHandler = (evt) => {
    nameContent.textContent = nameInput.value;
    jobContent.textContent = jobInput.value;
  closePopup(popupEdit);
}

const addFormSubmitHandler = (evt) => {
  const card = createCard(placeInput.value, placeUrl.value);
  cardsContainer.prepend(card);
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
