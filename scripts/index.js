const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-btn');
const closePopupButton = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__item_type_name');
const nameContent = document.querySelector('.profile__username');
const jobInput = document.querySelector('.popup__item_type_description');
const jobContent = document.querySelector('.profile__description');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameContent.textContent;
  jobInput.value = jobContent.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameContent.textContent = nameInput.value;
  jobContent.textContent = jobInput.value;
  closePopup()
}


openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);