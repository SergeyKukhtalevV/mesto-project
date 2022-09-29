// Обработка нажатия лайка изображения
export function toggleLike(evt) {
  event.target.classList.toggle('button_type_like-active');
}
//Обработка события error при загрузке изображения
export function loadDefaultImage(imageItem) {
  console.log('Ошибка загрузки изображения', imageItem.src);

}
