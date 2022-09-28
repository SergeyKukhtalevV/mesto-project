import {itemTemplate, galleryList} from "./index.js";
import {toggleLike, loadDefaultImage} from "./utils.js";
import {openImage} from "./modal.js";

/********************************************************************************/
// Функция создания карточки
export default function createCard(link, name, counter) {
  const itemElement = getCard(link, name, counter, itemTemplate);
  galleryList.prepend(itemElement);
}
//***************************************************************************** */
// Обработка удаления карточки
function deleteCard(event) {
  const listItem = event.target.closest('.gallery__item');
  listItem.remove();
}
// Функция получения свойств карточки
function getCard(link, name, counter, itemTemplate) {
  link = link.trim();
  name = name.trim();

  const itemElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);
  const imageItem = itemElement.querySelector('.gallery__photo');
  const titleItem = itemElement.querySelector('.gallery__title');
  const likeItem = itemElement.querySelector('.button_type_like');
  const counterLikes = itemElement.querySelector('.gallery__counter-likes');
  const deleteItem = itemElement.querySelector('.button_type_delete');

  imageItem.src = link;
  imageItem.alt = name;
  titleItem.textContent = name;
  counterLikes.textContent = counter;

  likeItem.addEventListener('click', toggleLike);
  deleteItem.addEventListener('click', deleteCard);
  imageItem.addEventListener('error', () => loadDefaultImage(imageItem));
  imageItem.addEventListener('click', openImage);

  return itemElement;
}

