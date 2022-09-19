import {itemTemplate, galleryList} from "./index.js";
import {toggleLike, loadDefaultImage} from "./utils.js";
import {openImage} from "./modal.js";

/********************************************************************************/
// Функция создания карточки
export default function createCard(link, name) {
  const itemElement = getCard(link, name, itemTemplate);
  galleryList.prepend(itemElement);
}
//***************************************************************************** */
// Обработка удаления карточки
function deleteCard(event) {
  const listItem = event.target.closest('.gallery__item');
  listItem.remove();
}
// Функция получения свойств карточки
function getCard(link, name, itemTemplate) {
  link = link.trim();
  name = name.trim();

  const itemElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);
  const imageItem = itemElement.querySelector('.gallery__photo');
  const titleItem = itemElement.querySelector('.gallery__title');
  const likeItem = itemElement.querySelector('.button_type_like');
  const deleteItem = itemElement.querySelector('.button_type_delete');

  imageItem.src = link;
  imageItem.alt = name;
  titleItem.textContent = name;

  likeItem.addEventListener('click', toggleLike);
  deleteItem.addEventListener('click', deleteCard);
  imageItem.addEventListener('error', () => loadDefaultImage(imageItem));
  imageItem.addEventListener('click', openImage);

  return itemElement;
}

