import enableValidation from "./validate.js";
import createCard from "./card.js";
import {openPopup, closePopup} from "./modal.js";
import '../styles/index.css'; // добавьте импорт главного файла стилей

//Объявляем переменные и константы
const content = document.querySelector('.content');
const editButton = content.querySelector('.button_type_edit');
const addButton = content.querySelector('.button_type_add');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');

const closeButtons = document.querySelectorAll('.button_type_сlose');

const profilePopupForm = profilePopup.querySelector('.popup__form');
const cardPopupForm = cardPopup.querySelector('.popup__form');

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

//Обработка события click при нажатии на кнопку закрыть
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику popup
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

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
export function handleCardFormSubmit(evt) {
  evt.preventDefault();
  createCard(cardPopupLink.value, cardPopupName.value);
  closePopup(cardPopup);
  evt.target.reset();
}
//////////////////////////////////////////////////////////////////////////////
// закрытие модального окна по нажатию на Escape
document.addEventListener('keydown', function (evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if(evt.key === 'Escape' &&  popupOpened !== null) {
    closePopup(popupOpened);
  }
});
// закрытие модального окна по клику на оверлей
document.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
});

/****************************************************************************/
enableValidation();
/****************************************************************************/
