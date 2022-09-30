import {itemTemplate, galleryList, deletePopup} from "./index.js";
import {loadDefaultImage} from "./utils.js";
import {openPopup, openImage} from "./modal.js";
import {putLike, removeLike} from "./api.js";

export let idCardToDelete;
export let idCardToToggleLike;
/********************************************************************************/
// Изменение цвета лайка
function toggleLike(evt) {
  event.target.classList.toggle('button_type_like-active');
}

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
  let flagLike = false;

  imageItem.src = link;
  imageItem.alt = name;
  titleItem.textContent = name;
  counterLikes.textContent = counter;
  itemElement.id = cardId;

  if (userId === ownerId) {
    deleteItem.classList.add('button_visible');
    deleteItem.addEventListener('click', (evt) => {
      idCardToDelete = evt.target.closest('.gallery__item').id;
      openPopup(deletePopup);
    });
  }

  likeItem.addEventListener('click', (evt) => {
    idCardToToggleLike = evt.target.closest('.gallery__item').id;
    toggleLike(evt);
    if (!flagLike) {
      putLike(idCardToToggleLike)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так с постановкой лайка: ${res.status}`);
        })
        .then((result) => {
          console.log("Сервер прислал карточку с увеличенным счетчиком лайков", result);
          flagLike = true;
          counterLikes.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log('Ошибка, запрос на увеличение количества лайков не выполнен', err);
        });
    } else {
      removeLike(idCardToToggleLike)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так с удалением лайка: ${res.status}`);
        })
        .then((result) => {
          console.log("Сервер прислал карточку с уменьшенным счетчиком лайков", result);
          flagLike = false;
          counterLikes.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log('Ошибка, запрос на уменьшение количества лайков не выполнен', err);
        });
    }
  });

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



