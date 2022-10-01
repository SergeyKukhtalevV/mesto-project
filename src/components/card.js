import {itemTemplate, galleryList, cardDeletePopup, content} from "./config.js";
import {loadDefaultImage} from "./utils.js";
import {openPopup, openImage} from "./modal.js";

export let idCardToDelete;
/********************************************************************************/

// Изменение цвета лайка
export function toggleLike(like) {
  like.classList.toggle('button_type_like-active');
}

// Функция создания карточки
export function createCard(link, name, counter, userId, ownerId, cardId, handleLike) {
  const itemElement = getCard(link, name, counter, userId, ownerId, cardId, itemTemplate);
  const likeElement = itemElement.querySelector('.button_type_like');
  likeElement.addEventListener('click', handleLike);
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
  const counterLikes = itemElement.querySelector('.gallery__counter-likes');
  const deleteItem = itemElement.querySelector('.button_type_delete');

  imageItem.src = link;
  imageItem.alt = name;
  titleItem.textContent = name;
  counterLikes.textContent = counter;
  itemElement.id = cardId;

  if (userId === ownerId) {
    deleteItem.classList.add('button_visible');
    deleteItem.addEventListener('click', (evt) => {
      idCardToDelete = evt.target.closest('.gallery__item').id;
      openPopup(cardDeletePopup);
    });
  }
  imageItem.addEventListener('error', () => loadDefaultImage(imageItem));
  imageItem.addEventListener('click', () => openImage(link, name));

  return itemElement;
}

//*******************************************************************************/
// Обработка локального удаления карточки
export function deleteLocalCard(CardId) {
  const listItem = document.getElementById(CardId);
  listItem.remove();
}



