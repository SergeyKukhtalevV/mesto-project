import {itemTemplate, galleryList, deletePopup} from "./index.js";
import {toggleLike, loadDefaultImage} from "./utils.js";
import {openPopup, openImage} from "./modal.js";

export let idCardToDelete;
/********************************************************************************/
// Функция создания карточки
export function createCard(link, name, counter, userId, ownerId, cardId) {
  const itemElement = getCard(link, name, counter, userId, ownerId, cardId, itemTemplate);
  galleryList.prepend(itemElement);
}
//*******************************************************************************/
// Функция получения свойств карточки
function getCard(link, name, counter, userId, ownerId, cardId, itemTemplate) {
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
  itemElement.id = '';

  if (userId === ownerId) {
    deleteItem.classList.add('button_visible');
    itemElement.id = cardId;
    deleteItem.addEventListener('click', (evt) => {
      console.log(evt.target.closest('.gallery__item').id);
      idCardToDelete = evt.target.closest('.gallery__item').id;
      openPopup(deletePopup);
    });
  }

  likeItem.addEventListener('click', toggleLike);
  imageItem.addEventListener('error', () => loadDefaultImage(imageItem));
  imageItem.addEventListener('click', openImage);

  return itemElement;
}
//*******************************************************************************/
// Обработка локального удаления карточки
export function deleteLocalCard(CardId) {
  const listItem = document.getElementById(CardId);
  listItem.remove();
}



