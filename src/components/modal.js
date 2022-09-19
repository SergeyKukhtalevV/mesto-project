import {imagePopup, figureImage, figureCaption} from "./index.js";

//Функция открытия popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//Функция закрытия popup
export function closePopup(popup) {
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
