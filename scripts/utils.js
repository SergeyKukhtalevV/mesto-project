// Обработка нажатия лайка изображения
export function toggleLike(event) {
  event.target.classList.toggle('button_type_like-active');
}
//Обработка события error при загрузке изображения
export function loadDefaultImage(imageItem) {
  imageItem.setAttribute('src', './images/image-placeholder.jpg');
}
