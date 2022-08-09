import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupConfig) {
    super(popupSelector);
    this._popupConfig = popupConfig;
    this._popupImage = this._popupElement.querySelector(this._popupConfig.popupImageSelector);
    this._popupTitle = this._popupElement.querySelector(this._popupConfig.popupCaptionSelector);
  }

  open(item) {
    this._popupImage.src = item.link;
    this._popupImage.alt = item.name;
    this._popupTitle.textContent = item.name;
    super.open();
  }
}