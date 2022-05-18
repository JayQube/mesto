let popup = document.querySelector('.popup');
let editProfileButton = document.querySelector('.profile__edit-btn');
let closeIconButton = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__item_type_name');
let nameContent = document.querySelector('.profile__username');
let jobInput = document.querySelector('.popup__item_type_description');
let jobContent = document.querySelector('.profile__description');

function editProfile() {
  popup.classList.add('popup_opened');
  nameInput.value = nameContent.textContent;
  jobInput.value = jobContent.textContent;
}

function closeIcon() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameContent.textContent = nameInput.value;
  jobContent.textContent = jobInput.value;
  closeIcon()
}


editProfileButton.addEventListener('click', editProfile);
closeIconButton.addEventListener('click', closeIcon);
formElement.addEventListener('submit', formSubmitHandler);