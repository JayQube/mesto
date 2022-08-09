export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }

  renderItems(cardsData) {
    cardsData.forEach(cardItem => {
      this._renderer(cardItem);
    });
  }
}