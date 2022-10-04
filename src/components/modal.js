import {imageWatchPopup, figureImage, figureCaption} from "./config.js";

// закрытие модального окна по нажатию на Escape
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Функция открытия popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

// Функция закрытия popup
export function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEscape);
  popup.classList.remove('popup_opened');
}

// Обработка нажатия на изображение
export function openImage(imageSrc, imageName) {
  figureImage.src = imageSrc;
  figureImage.alt = imageName;
  figureCaption.textContent = imageName;
  openPopup(imageWatchPopup);
}
// Функция изменения кнопки Сохранить на Сохранение...
export function makeSavingButton(submitButtonSelector) {
  submitButtonSelector.setAttribute('disabled', 'disabled');
  submitButtonSelector.classList.add('button_loading');
}
// Функция изменения кнопки Сохрание... на Сохранено!
export function makeSavedButton(submitButtonSelector) {
  submitButtonSelector.classList.add('button_loaded');
}

// Функция изменения кнопки Сохранено! на Сохранить
export function makeSaveButton(submitButtonSelector) {
  submitButtonSelector.classList.remove('button_loading');
  submitButtonSelector.classList.remove('button_loaded');
}
