const content = document.querySelector('.content');
const buttonEdit = content.querySelector('.profile__edit-btn_action_edit');
const buttonAdd = content.querySelector('.profile__add-btn_action_add');
const nameContent = content.querySelector('.profile__username');
const jobContent = content.querySelector('.profile__description');
const cardsContainer = content.querySelector('.cards__list');



const popupEdit = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupFullscreen = document.querySelector('.popup_fullscreen');

const formElementEdit = document.querySelector('.popup__container_type_edit');
const nameInput = formElementEdit.querySelector('.popup__item_type_name');
const jobInput = formElementEdit.querySelector('.popup__item_type_description');

const formElementAdd = document.querySelector('.popup__container_type_add');
const placeInput = formElementAdd.querySelector('.popup__item_type_place');
const placeUrl = formElementAdd.querySelector('.popup__item_type_place-url');


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

function addCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').addEventListener('click', function(evt) {
    openPopup(popupFullscreen);
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');

    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
  });
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__like-btn').addEventListener('click', likeCard)
  cardElement.querySelector('.card__trash-btn_action_delete').addEventListener('click', deleteCard);
  cardsContainer.prepend(cardElement);
}

initialCards.forEach(function(element) {
  addCard(element.name, element.link);
});

function likeCard(evt) {
  evt.target.classList.toggle('card__like-btn_active');
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  popupElement.querySelector('.popup__close-btn').addEventListener('click', closePopup);
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
    nameContent.textContent = nameInput.value;
    jobContent.textContent = jobInput.value;
  closePopup(evt)
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard(placeInput.value, placeUrl.value);
    placeInput.value = '';
    placeUrl.value = '';
  closePopup(evt)
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}


buttonEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  nameInput.value = nameContent.textContent;
  jobInput.value = jobContent.textContent;
});

formElementEdit.addEventListener('submit', function (evt) {
  editFormSubmitHandler(evt);
});


buttonAdd.addEventListener('click', function () {
  openPopup(popupPlace);
});

formElementAdd.addEventListener('submit', function (evt) {
  addFormSubmitHandler(evt);
});