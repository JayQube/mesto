import { closeButtonSelector, popupOpenedClass } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeButton = this._popupSelector.querySelector(closeButtonSelector);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleMousedownClose = this._handleMousedownClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add(popupOpenedClass);
  }

  close() {
    this._popupSelector.classList.remove(popupOpenedClass);
    this._closeButton.removeEventListener('click', this.close);
    this._popupSelector.removeEventListener('mousedown', this._handleMousedownClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleMousedownClose(evt) {
    if (evt.target.classList.contains(popupOpenedClass)) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close);
    this._popupSelector.addEventListener('mousedown', this._handleMousedownClose);
    document.addEventListener('keydown', this._handleEscClose);
  }
}