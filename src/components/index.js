import enableValidation from "./validate.js";
import {createCard, deleteLocalCard, idCardToDelete} from "./card.js";
import {openPopup, closePopup} from "./modal.js";
import {
  getCards, getUserInfo, setUserInfo, addedCard, deleteCardOnServer, setUserAvatar
} from "./api.js";
import '../styles/index.css';

//Объявляем переменные и константы
const content = document.querySelector('.content');
const editButton = content.querySelector('.button_type_edit');
const addButton = content.querySelector('.button_type_add');
const editAvatarButton = content.querySelector('.button_type_avatar');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');
const profileAvatar = content.querySelector('.profile__avatar');

const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');
const deletePopup = document.querySelector('.delete-popup');
const avatarPopup = document.querySelector('.avatar-popup');

const popups = document.querySelectorAll('.popup');
const forms = document.querySelectorAll('.popup__form');

const profilePopupName = profilePopup.querySelector('#name');
const profilePopupAbout = profilePopup.querySelector('#about-yourself');

const cardPopupName = cardPopup.querySelector('#name-card');
const cardPopupLink = cardPopup.querySelector('#link-card');

const avatarPopupLink = avatarPopup.querySelector('#link-avatar');

const itemTemplate = document.querySelector('#item-template').content;

const figureImage = imagePopup.querySelector('.figure__image');
const figureCaption = imagePopup.querySelector('.figure__caption');

let userId;
let cards;

const galleryList = content.querySelector('.gallery__list');

export {itemTemplate, galleryList, imagePopup, figureImage, figureCaption, deletePopup};
///////////////////////////////////////////////////////////////
// Получение информации о пользователе с сервера
getUserInfo()
  .then(res => res.json())
  .then((result) => {
    profileName.textContent = result.name;
    profileAbout.textContent = result.about;
    profileAvatar.src = result.avatar;
    userId = result["_id"];
  });
///////////////////////////////////////////////////////////////
// Обработчик формы редактирования данных о пользователе
function handleProfileFormSubmit(evt) {

  const submitButton = evt.target.querySelector('.button_type_submit');
  submitButton.classList.add('button_loading');
  profileName.textContent = profilePopupName.value;
  profileAbout.textContent = profilePopupAbout.value;

  setUserInfo(profilePopupName.value, profilePopupAbout.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      submitButton.classList.add('button_loaded');
      console.log('Запрос на изменение данных пользователя выполнен успешно.');
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err);
    })
    .finally(() => {
      closePopup(profilePopup);
      setTimeout(() => {
        submitButton.classList.remove('button_loading');
        submitButton.classList.remove('button_loaded');
      }, 500);
    });
}

///////////////////////////////////////////////////////////////
editAvatarButton.addEventListener('click', () => {
  openPopup(avatarPopup);
})
///////////////////////////////////////////////////////////////
// Обработка формы изменения аватара
function handleEditAvatarFormSubmit(evt, inactiveButtonClass) {

  const submitButton = evt.target.querySelector('.button_type_submit');
  submitButton.classList.add('button_loading');
  setUserAvatar(avatarPopupLink.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      submitButton.classList.add('button_loaded');
      console.log('Запрос на изменение аватара пользователя выполнен успешно.', result);
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err);
    })
    .finally(() => {
      closePopup(avatarPopup);
      submitButton.classList.add(inactiveButtonClass);
      submitButton.setAttribute('disabled', 'disabled');
      setTimeout(() => {
        submitButton.classList.remove('button_loading');
        submitButton.classList.remove('button_loaded');
      }, 500);
    });
}

///////////////////////////////////////////////////////////////
// Получения массива карточек от сервера и создание разметки
getCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .then((result) => {
    cards = Array.from(result);
    cards.forEach((card) => {
      createCard(card.link, card.name, card.likes.length, userId, card.owner["_id"], card["_id"]);
    });
  })
  .catch((err) => {
    console.log('Ошибка, запрос не выполнен', err);
  });

///////////////////////////////////////////////////////////////
// Обработка формы добавления изображения
function handleCardFormSubmit(evt, inactiveButtonClass) {

  const submitButton = evt.target.querySelector('.button_type_submit');
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.classList.add('button_loading');

  addedCard(cardPopupName.value, cardPopupLink.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      submitButton.classList.add('button_loaded');
      console.log("Сервер прислал созданный объект карточка", result);
      createCard(result.link, result.name, result.likes.length, userId, result.owner["_id"], result["_id"]);
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err);
    })
    .finally(() => {
      closePopup(cardPopup);
      submitButton.classList.add(inactiveButtonClass);
      submitButton.setAttribute('disabled', 'disabled');
      evt.target.reset();
      setTimeout(() => {
        submitButton.classList.remove('button_loading');
        submitButton.classList.remove('button_loaded');
      }, 500);
    });
}

////////////////////////////////////////////////////////
editButton.addEventListener('click', () => {
  openPopup(profilePopup);
  profilePopupName.value = profileName.textContent;
  profilePopupAbout.value = profileAbout.textContent;
});
///////////////////////////////////////////////////////////////
addButton.addEventListener('click', () => openPopup(cardPopup));
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      console.log("Удалено с результатом ", result);
      deleteLocalCard(CardId);
    })
    .catch((err) => {
      console.log('Ошибка, запрос на удаление не выполнен', err);
    });
  closePopup(deletePopup);
}

//////////////////////////////////////////////////
forms.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (formElement.getAttribute('name') === 'edit-profile') {
      handleProfileFormSubmit(evt);
    }
    if (formElement.getAttribute('name') === 'card-add') {
      handleCardFormSubmit(evt, 'button_inactive');
    }
    if (formElement.getAttribute('name') === 'delete-card') {
      submitButton.classList.remove('button_loading');
      handleDeleteFormSubmit(idCardToDelete);
    }
    if (formElement.getAttribute('name') === 'edit-avatar') {
      handleEditAvatarFormSubmit(evt, 'button_inactive');
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
