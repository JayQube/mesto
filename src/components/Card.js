export default class Card {
  constructor({ titlePlace, imageUrl, handleCardClick }, cardConfig) {
    this._titlePlace = titlePlace;
    this._imageUrl = imageUrl;
    this._template = document.querySelector(cardConfig.cardTemplateSelector);
    this._cardConfig = cardConfig;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._template
      .content
      .querySelector(this._cardConfig.cardElementSelector)
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeClick() {
    this._cardLikeButton.classList
      .toggle(this._cardConfig.cardLikeButtonClass);
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardTrashButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardConfig.cardImageSelector);
    this._cardTitle = this._element.querySelector(this._cardConfig.cardTitleSelector);
    this._cardLikeButton = this._element.querySelector(this._cardConfig.cardLikeButtonSelector);
    this._cardTrashButton = this._element.querySelector(this._cardConfig.cardTrashButtonSelector);
    this._setEventListeners();

    this._cardImage.src = this._imageUrl;
    this._cardImage.alt = this._titlePlace;
    this._cardTitle.textContent = this._titlePlace;

    return this._element;
  }
}