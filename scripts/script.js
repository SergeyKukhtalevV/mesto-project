//Объявляем переменные и константы
const content = document.querySelector('.content');
const editButton = content.querySelector('.button_type_edit');
const addButton = content.querySelector('.button_type_add');
let profileName = content.querySelector('.profile__name');
let profileAbout = content.querySelector('.profile__about');

const popup = document.querySelector('.popup');
const popupContainer = popup.querySelectorAll('.popup__container');
let profilePopup = document.querySelector('.popup__container_type_user-info');
let cardPopup = document.querySelector('.popup__container_type_card-add');
console.log(profilePopup);

const profilePopupCloseButton = profilePopup.querySelector('.button_type_сlose');
console.dir(profilePopupCloseButton);
const cardPopupCloseButton = cardPopup.querySelector('.button_type_сlose');
console.dir(cardPopupCloseButton);

const profilePopupSubmitButton = profilePopup.querySelector('.button_type_submit');
const CardPopupSubmitButton = cardPopup.querySelector('.button_type_submit');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const cardPopupForm = cardPopup.querySelector('.popup__form');

const profilePopupName = profilePopup.querySelector('#name');
const profilePopupAbout = profilePopup.querySelector('#about-yourself');
const cardPopupName = cardPopup.querySelector('#name-card');
const cardPopupLink = cardPopup.querySelector('#link-card');

// console.log(profilePopupName.textContent);
// console.log(profilePopupAbout.textContent);

//Обработка события click при нажитии на кпонку редактировать и добавить
function profilePopupOpened() {
  popup.classList.add('popup_opened');
  profilePopup.classList.add('popup__container_opened');
  profilePopupName.value = profileName.textContent;
  profilePopupAbout.value = profileAbout.textContent;
}
function cardPopupOpened() {
  popup.classList.add('popup_opened');
  cardPopup.classList.add('popup__container_opened');
}
function popupClose(popupContainerType) {
  popup.classList.remove('popup_opened');
  popupContainerType.classList.remove('popup__container_opened');
}
editButton.addEventListener('click', profilePopupOpened);
addButton.addEventListener('click', cardPopupOpened);
//Обработка события click при нажитии на кпонку закрыть
profilePopupCloseButton.addEventListener('click', () => popupClose(profilePopup));
cardPopupCloseButton.addEventListener('click', () => popupClose(cardPopup));

///////////////////////////////////////////////
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileAbout.textContent = profilePopupAbout.value;
  popup.classList.remove('popup_opened');
  profilePopup.classList.remove('popup__container_opened');
}
profilePopupForm.addEventListener('submit', profileFormSubmitHandler);
////////////////////////////////////////////////
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
let galleryList = content.querySelector('.gallery__list');
function addPhoto(link, name) {

  link = link.trim();
  name = name.trim().replace(/[^a-zA-ZА-ЯЁа-яё0-9\s]/gi, '');

  let itemTemplate = document.querySelector('#item-template').content;
  let itemElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);

  itemElement.querySelector('.gallery__photo').src = link;
  itemElement.querySelector('.gallery__photo').alt = name;

  itemElement.querySelector('.gallery__title').textContent = name;
  galleryList.prepend(itemElement);

}
for (let i = 0; i < initialCards.length; i++) {

  addPhoto(initialCards[i].link, initialCards[i].name);

}
///////////////////////////////////////////////
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  addPhoto(cardPopupLink.value, cardPopupName.value);
  popup.classList.remove('popup_opened');
  cardPopup.classList.remove('popup__container_opened');
  cardPopupLink.value = '';
  cardPopupName.value = '';
}
cardPopupForm.addEventListener('submit', cardFormSubmitHandler);
////////////////////////////////////////////////////////////////
const likeButtons = content.querySelectorAll('.button_type_like');
console.dir(likeButtons);
// likeButtons.addEventListener('click', function () {
// 	console.log('LIKE!');
// });
