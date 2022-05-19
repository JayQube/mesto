const popup = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-btn');
const closeIconButton = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__item_type_name');
const nameContent = document.querySelector('.profile__username');
const jobInput = document.querySelector('.popup__item_type_description');
const jobContent = document.querySelector('.profile__description');

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