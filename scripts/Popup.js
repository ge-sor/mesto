export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }
  open(popupElement) {
    popupElement.classList.add('popup_opened');
  }
  close() {

  }
  _handleEscClose() {

  }
  setEventListeners() {
    
  }
}
