import {imageWatchPopup, figureImage, figureCaption} from "./config.js";

// закрытие модального окна по нажатию на Escape
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//Функция открытия popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

//Функция закрытия popup
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
