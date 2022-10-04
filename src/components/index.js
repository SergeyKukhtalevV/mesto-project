import {
  profilePopup,
  avatarPopup,
  cardAddPopup,
  profileAvatar,
  profileName,
  profileAbout,
  profilePopupName,
  profilePopupAbout,
  buttonOpenPopupAvatar,
  avatarPopupLink,
  cardPopupName,
  cardPopupLink,
  buttonOpenPopupNewCard,
  popups,
  forms,
  cardDeletePopup,
  buttonOpenPopupEditProfile,
} from "./config.js";

import {enableValidation, turnOffSubmitButton} from "./validate.js";
import {createCard, deleteLocalCard, toggleLike, idCardToDelete} from "./card.js";
import {openPopup, closePopup} from "./modal.js";
import {
  getCards, getUserInfo, setUserInfo, addedCard, deleteCardOnServer, setUserAvatar, putLike, removeLike
} from "./api.js";
import '../styles/index.css';

let userId;
let cards;
let idCardToToggleLike;
///////////////////////////////////////////////////////////////
// Получение информации о пользователе и массива карточек от сервера и создание разметки
Promise.all([getUserInfo(), getCards()])
  .then((results) => {
    profileName.textContent = results[0].name;
    profileAbout.textContent = results[0].about;
    profileAvatar.src = results[0].avatar;
    userId = results[0]["_id"];
    console.log("Получены данные пользователя и список карточек", results);
    //***********************************************************************
    cards = Array.from(results[1]);
    cards.forEach((card) => {
      let flagLike = false;
      createCard(card.link, card.name, card.likes.length, userId, card.owner["_id"], card["_id"], () => {
        const likeItem = event.target;
        const cardGallery = likeItem.closest('.gallery__item');
        const counterLikes = cardGallery.querySelector('.gallery__counter-likes');
        idCardToToggleLike = cardGallery.id;
        if (!flagLike) {
          putLike(idCardToToggleLike)
            .then((res) => {
              console.log("Сервер прислал карточку с увеличенным счетчиком лайков", res);
              toggleLike(likeItem);
              flagLike = true;
              counterLikes.textContent = res.likes.length;
            })
            .catch((err) => {
              console.log('Ошибка, запрос на увеличение количества лайков не выполнен', err);
            });
        } else {
          removeLike(idCardToToggleLike)
            .then((res) => {
              console.log("Сервер прислал карточку с уменьшенным счетчиком лайков", res);
              toggleLike(likeItem);
              flagLike = false;
              counterLikes.textContent = res.likes.length;
            })
            .catch((err) => {
              console.log('Ошибка, запрос на уменьшение количества лайков не выполнен', err);
            });
        }
      });
    });
  })
  .catch((err) => {
    console.log('Ошибка, запрос на получение данных пользователя и список карточек не выполнен', err);
  });
///////////////////////////////////////////////////////////////
// Обработчик формы редактирования данных о пользователе
function handleProfileFormSubmit(evt) {

  const submitButton = evt.target.querySelector('.button_type_submit');
  submitButton.classList.add('button_loading');

  setUserInfo(profilePopupName.value, profilePopupAbout.value)
    .then((result) => {
      submitButton.classList.add('button_loaded');
      profileName.textContent = result.name;
      profileAbout.textContent = result.about;
      console.log('Запрос на изменение данных пользователя выполнен успешно.');
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err);
    })
    .finally(() => {
      setTimeout(() => {
        submitButton.classList.remove('button_loading');
        submitButton.classList.remove('button_loaded');
      }, 500);
    });
}

///////////////////////////////////////////////////////////////
buttonOpenPopupAvatar.addEventListener('click', () => {
  openPopup(avatarPopup);
})
///////////////////////////////////////////////////////////////
// Обработка формы изменения аватара
function handleEditAvatarFormSubmit(evt) {
  const submitButton = evt.target.querySelector('.button_type_submit');
  submitButton.classList.add('button_loading');
  setUserAvatar(avatarPopupLink.value)
    .then((result) => {
      submitButton.classList.add('button_loaded');
      console.log('Запрос на изменение аватара пользователя выполнен успешно.', result);
      profileAvatar.src = result.avatar;
      closePopup(avatarPopup);
      avatarPopupLink.value = '';
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err);
    })
    .finally(() => {
      turnOffSubmitButton(submitButton);
      setTimeout(() => {
        submitButton.classList.remove('button_loading');
        submitButton.classList.remove('button_loaded');
      }, 500);
    });
}

///////////////////////////////////////////////////////////////
// Обработка формы добавления изображения
function handleCardFormSubmit(evt) {

  const submitButton = evt.target.querySelector('.button_type_submit');
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.classList.add('button_loading');

  addedCard(cardPopupName.value, cardPopupLink.value)
    .then((result) => {
      submitButton.classList.add('button_loaded');
      console.log("Сервер прислал созданный объект карточка", result);
      let flagLike = false;
      createCard(result.link, result.name, result.likes.length, userId, result.owner["_id"], result["_id"], () => {
        const likeItem = event.target;
        const cardGallery = likeItem.closest('.gallery__item');
        const counterLikes = cardGallery.querySelector('.gallery__counter-likes');
        idCardToToggleLike = cardGallery.id;
        if (!flagLike) {
          putLike(idCardToToggleLike)
            .then((result) => {
              toggleLike(likeItem);
              console.log("Сервер прислал карточку с увеличенным счетчиком лайков", result);
              flagLike = true;
              counterLikes.textContent = result.likes.length;
            })
            .catch((err) => {
              console.log('Ошибка, запрос на увеличение количества лайков не выполнен', err);
            });
        } else {
          removeLike(idCardToToggleLike)
            .then((result) => {
              toggleLike(likeItem);
              console.log("Сервер прислал карточку с уменьшенным счетчиком лайков", result);
              flagLike = false;
              counterLikes.textContent = result.likes.length;
            })
            .catch((err) => {
              console.log('Ошибка, запрос на уменьшение количества лайков не выполнен', err);
            });
        }
      });
      closePopup(cardAddPopup);
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err);
    })
    .finally(() => {
      turnOffSubmitButton(submitButton);
      evt.target.reset();
      setTimeout(() => {
        submitButton.classList.remove('button_loading');
        submitButton.classList.remove('button_loaded');
      }, 500);
    });
}

////////////////////////////////////////////////////////
buttonOpenPopupEditProfile.addEventListener('click', () => {
  openPopup(profilePopup);
  profilePopupName.value = profileName.textContent;
  profilePopupAbout.value = profileAbout.textContent;
});
///////////////////////////////////////////////////////////////
buttonOpenPopupNewCard.addEventListener('click', () => openPopup(cardAddPopup));
//////////////////////////////////////////////////////////////////////////////
//Обработка события click при нажатии на кнопку закрыть и закрытие модального окна по клику на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('button_type_сlose')) {
      closePopup(popup);
    }
  });
});

//////////////////////////////////////////////
function handleDeleteFormSubmit(CardId) {
  deleteCardOnServer(CardId)
    .then((result) => {
      console.log("Удалено с результатом ", result);
      deleteLocalCard(CardId);
      closePopup(cardDeletePopup);
    })
    .catch((err) => {
      console.log('Ошибка, запрос на удаление не выполнен', err);
    });
}

//////////////////////////////////////////////////
forms.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (formElement.getAttribute('name') === 'edit-profile') {
      handleProfileFormSubmit(evt);
    }
    if (formElement.getAttribute('name') === 'card-add') {
      handleCardFormSubmit(evt);
    }
    if (formElement.getAttribute('name') === 'delete-card') {
      handleDeleteFormSubmit(idCardToDelete);
    }
    if (formElement.getAttribute('name') === 'edit-avatar') {
      handleEditAvatarFormSubmit(evt);
    }
  });
});

/****************************************************************************/
enableValidation({
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active'
});
