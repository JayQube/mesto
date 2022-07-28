export const content = document.querySelector('.content');
export const buttonEdit = content.querySelector('.profile__edit-btn');
export const buttonAdd = content.querySelector('.profile__add-btn');

export const formEditElement = document.querySelector('.popup__container_type_edit');
export const formAddElement = document.querySelector('.popup__container_type_add');

export const userNameSelector = '.profile__username';
export const userDescriptionSelector = '.profile__description';

export const formEditSelector = '.popup__container_type_edit';
export const formAddSelector = '.popup__container_type_add';
export const formConfirmSelector = '.popup__container_type_confirm';

export const containerSelector = '.cards__list';
export const popupEditSelector = '.popup_profile';
export const popupAddSelector = '.popup_place';
export const popupFullscreenSelector = '.popup_fullscreen';
export const popupConfirmSelector = '.popup_confirm';

export const popupConfig = {
  popupImageSelector: '.popup__image',
  popupCaptionSelector: '.popup__caption'
}

export const cardConfig = {
  cardTemplateSelector: '#card-template',
  cardElementSelector: '.card',
  cardImageSelector: '.card__image',
  cardTitleSelector: '.card__title',
  cardLikeButtonSelector: '.card__like-btn',
  cardTrashButtonSelector: '.card__trash-btn',
  cardLikeButtonClass: 'card__like-btn_active'
}

export const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__confirm-btn',
  inactiveButtonClass: 'popup__confirm-btn_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
}