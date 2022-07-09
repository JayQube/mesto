import { openPopup } from './index.js';

class Card {
  constructor(cardTitle, cardImage, cardConfig) {
    this._cardTitle = cardTitle;
    this._cardImage = cardImage;
    this._template = document.querySelector(cardConfig.cardTemplateSelector);
    this._cardConfig = cardConfig;
  }

  _getTemplate() {
    const cardElement = this._template
      .content
      .querySelector(this._cardConfig.cardElementSelector)
      .cloneNode(true);

    return cardElement;
  }

  _getFullscreenPopup() {
    const popupElement = document
      .querySelector(this._cardConfig.popupFullscreenSelector);

    return popupElement;
  }

  _handleLikeClick() {
    this._element
      .querySelector(this._cardConfig.cardLikeButtonSelector)
      .classList
      .toggle(this._cardConfig.cardLikeButtonClass);
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    this._popup = this._getFullscreenPopup();
    this._popup.querySelector(this._cardConfig.popupImageSelector).src = this._cardImage;
    this._popup.querySelector(this._cardConfig.popupImageSelector).alt = this._cardTitle;
    this._popup.querySelector(this._cardConfig.popupCaptionSelector).textContent = this._cardTitle;
    openPopup(this._popup);
  }

  _setEventListeners() {
    this._element.querySelector(this._cardConfig.cardLikeButtonSelector)
      .addEventListener('click', () => {
        this._handleLikeClick();
      });

    this._element.querySelector(this._cardConfig.cardTrashButtonSelector)
      .addEventListener('click', () => {
        this._handleDeleteClick();
      });

    this._element.querySelector(this._cardConfig.cardImageSelector)
      .addEventListener('click', () => {
        this._handleImageClick();
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(this._cardConfig.cardImageSelector).src = this._cardImage;
    this._element.querySelector(this._cardConfig.cardImageSelector).alt = this._cardTitle;
    this._element.querySelector(this._cardConfig.cardTitleSelector).textContent = this._cardTitle;
  

    return this._element;
  }
}

export { Card };