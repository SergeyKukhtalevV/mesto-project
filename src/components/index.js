import  enableValidation from "./validate.js";
import {createCard, deleteLocalCard, idCardToDelete} from "./card.js";
import {openPopup, closePopup} from "./modal.js";
import {getCards, getUserInfo, setUserInfo, addedCard, deleteCardOnServer} from "./connect.js";
import '../styles/index.css';

//Объявляем переменные и константы
const content = document.querySelector('.content');
const editButton = content.querySelector('.button_type_edit');
const addButton = content.querySelector('.button_type_add');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');
const profileAvatar = content.querySelector('.profile__avatar');

const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');
const deletePopup = document.querySelector('.delete-popup');

const popups = document.querySelectorAll('.popup');
const forms = document.querySelectorAll('.popup__form');

const profilePopupName = profilePopup.querySelector('#name');
const profilePopupAbout = profilePopup.querySelector('#about-yourself');

const cardPopupName = cardPopup.querySelector('#name-card');
const cardPopupLink = cardPopup.querySelector('#link-card');

const itemTemplate = document.querySelector('#item-template').content;

const figureImage = imagePopup.querySelector('.figure__image');
const figureCaption = imagePopup.querySelector('.figure__caption');

let userId;
let cards;

const galleryList = content.querySelector('.gallery__list');

const groupId = 'plus-cohort-15';
const token = 'c362a370-694e-40e1-b195-d72fbbfd69f7';

export {itemTemplate, galleryList, imagePopup, figureImage, figureCaption, deletePopup};
///////////////////////////////////////////////////////////////
// Получение информации о пользователе с сервера
getUserInfo(groupId, token)
  .then(res => res.json())
  .then((result) => {
    profileName.textContent = result.name;
    profileAbout.textContent = result.about;
    profileAvatar.src = result.avatar;
    userId = result["_id"];
    console.log("userId: ", result["_id"]);
  });
///////////////////////////////////////////////////////////////
// Обработчик формы редактирования данных о пользователе
function handleProfileFormSubmit() {
  profileName.textContent = profilePopupName.value;
  profileAbout.textContent = profilePopupAbout.value;

  setUserInfo(groupId, token, profilePopupName.value, profilePopupAbout.value)
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      console.log('Запрос на изменение данных пользователя выполнен успешно.');
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err);
    });
  closePopup(profilePopup);
}
///////////////////////////////////////////////////////////////
// Получения массива карточек от сервера и создание разметки
function drawCards(groupId, token) {
  getCards(groupId, token)
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
}
drawCards(groupId, token);
///////////////////////////////////////////////////////////////
// Обработка формы добавления изображения
function handleCardFormSubmit(evt, inactiveButtonClass) {

  const submitButton = cardPopup.querySelector('.button_type_submit');
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute('disabled', 'disabled');

  addedCard(groupId, token, cardPopupName.value, cardPopupLink.value)
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      console.log("Сервер прислал созданный объект карточка", result);
      createCard(result.link, result.name, result.likes.length, userId, result.owner["_id"], result["_id"]);
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err);
    });
  closePopup(cardPopup);
  evt.target.reset();
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
  deleteCardOnServer(groupId, token, CardId)
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      console.log("Удалено с результатом ",result);
      deleteLocalCard(CardId);
    })
    .catch((err) => {
      console.log('Ошибка, запрос на удаление не выполнен', err);
    });
  closePopup(deletePopup);
}
//*******************************************************************************/


//////////////////////////////////////////////////
forms.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (formElement.getAttribute('name') === 'edit-profile') {
      handleProfileFormSubmit();
    }
    if (formElement.getAttribute('name') === 'card-add') {
      handleCardFormSubmit(evt, 'button_inactive');
    }
    if (formElement.getAttribute('name') === 'delete-card') {
      handleDeleteFormSubmit(idCardToDelete);
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
