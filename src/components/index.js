import enableValidation from "./validate.js";
import createCard from "./card.js";
import {openPopup, closePopup} from "./modal.js";
import '../styles/index.css';

//Объявляем переменные и константы
const content = document.querySelector('.content');
const editButton = content.querySelector('.button_type_edit');
const addButton = content.querySelector('.button_type_add');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');

const popups = document.querySelectorAll('.popup');

const profilePopupName = profilePopup.querySelector('#name');
const profilePopupAbout = profilePopup.querySelector('#about-yourself');

const cardPopupName = cardPopup.querySelector('#name-card');
const cardPopupLink = cardPopup.querySelector('#link-card');

const itemTemplate = document.querySelector('#item-template').content;

const figureImage = imagePopup.querySelector('.figure__image');
const figureCaption = imagePopup.querySelector('.figure__caption');


const galleryList = content.querySelector('.gallery__list');

export {itemTemplate, galleryList, imagePopup, figureImage, figureCaption};
///////////////////////////////////////////////////////////////
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

editButton.addEventListener('click', () => {
  openPopup(profilePopup);
  profilePopupName.value = profileName.textContent;
  profilePopupAbout.value = profileAbout.textContent;
});
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
//////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileAbout.textContent = profilePopupAbout.value;
  closePopup(profilePopup);
}

//*******************************************************************************/
//Начальная вставка карточек "из коробки"
for (let i = 0; i < initialCards.length; i++) {
  createCard(initialCards[i].link, initialCards[i].name);
}
///////////////////////////////////////////////
// Обработка формы добавления изображения
export function handleCardFormSubmit(evt, inactiveButtonClass) {
  evt.preventDefault();
  createCard(cardPopupLink.value, cardPopupName.value);
  const submitButton = cardPopup.querySelector('.button_type_submit');
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute('disabled', 'disabled');
  closePopup(cardPopup);
  evt.target.reset();
}


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
