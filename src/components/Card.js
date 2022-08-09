export default class Card {
  constructor({ cardItem, myId, handleCardClick, handleLikeClick, handkeUnlikeClick, handleDeleteClick}, cardConfig) {
    this._cardItem = cardItem;
    this._myId = myId;
    this._cardOwner = this._cardItem.owner._id;
    this._titlePlace = this._cardItem.name;
    this._imageUrl = this._cardItem.link;
    this._likeCount = this._cardItem.likes;
    this._template = document.querySelector(cardConfig.cardTemplateSelector);
    this._cardConfig = cardConfig;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handkeUnlikeClick = handkeUnlikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = this._template
      .content
      .querySelector(this._cardConfig.cardElementSelector)
      .cloneNode(true);

    return cardElement;
  }

  _checkOwner() {
    if(this._cardOwner !== this._myId) {
      this._cardTrashButton.remove();
    }
  }

  _checkSelfLikes() {
    this._cardItem.likes.forEach(owner => {
      if(owner._id === this._myId) {
        this._cardLikeButton.classList.add(this._cardConfig.cardLikeButtonClass);
      }
    });
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      if(this._cardLikeButton.classList.contains(this._cardConfig.cardLikeButtonClass)) {
        this._handkeUnlikeClick(this._cardItem);
      } else {
        this._handleLikeClick(this._cardItem);
      }
    });

    this._cardTrashButton.addEventListener('click', () => {
      this._handleDeleteClick(this._cardItem);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  deleteCard() {
    this._element.remove();
  }

  setLikes(res) {
    this._cardLikesCount.textContent = String(res.likes.length);
  }

  toggleLike() {
    this._cardLikeButton.classList.toggle(this._cardConfig.cardLikeButtonClass);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardConfig.cardImageSelector);
    this._cardTitle = this._element.querySelector(this._cardConfig.cardTitleSelector);
    this._cardLikeButton = this._element.querySelector(this._cardConfig.cardLikeButtonSelector);
    this._cardTrashButton = this._element.querySelector(this._cardConfig.cardTrashButtonSelector);
    this._cardLikesCount = this._element.querySelector(this._cardConfig.cardLikesCount);
    this._checkOwner();
    this.setLikes(this._cardItem);
    this._checkSelfLikes();
    this._setEventListeners();
    

    this._cardImage.src = this._imageUrl;
    this._cardImage.alt = this._titlePlace;
    this._cardTitle.textContent = this._titlePlace;

    return this._element;
  }
}