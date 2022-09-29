import {imagePopup, figureImage, figureCaption} from "./index.js";

// закрытие модального окна по нажатию на Escape
function closePopupByEscape (evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
//Функция открытия popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  const submitButton = popup.querySelector('.button_type_submit');
  submitButton.classList.remove('button_loading');
  submitButton.classList.remove('button_loaded');
  document.addEventListener('keydown', closePopupByEscape);
}
//Функция закрытия popup
export function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEscape);
  popup.classList.remove('popup_opened');
}
// Обработка нажатия на изображение
export function openImage(event) {
  const listItem = event.target.closest('.gallery__item');
  const photoGallery = listItem.querySelector('.gallery__photo');
  const titleGallery = listItem.querySelector('.gallery__title');

  openPopup(imagePopup);
  figureImage.src = photoGallery.src;
  figureImage.alt = photoGallery.alt;
  figureCaption.textContent = titleGallery.textContent;
}
