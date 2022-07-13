//Объявляем переменные и константы
let content = document.querySelector('.content');
const editButton = content.querySelector('.button_type_edit');
const addButton = content.querySelector('.button_type_add');
let profileName = content.querySelector('.profile__name');
let profileAbout = content.querySelector('.profile__about');

let popup = document.querySelector('.popup');
let popupContainer = popup.querySelectorAll('.popup__container');
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
for (let i = 0; i < initialCards.length; i++) {
  galleryList.insertAdjacentHTML('beforeend', `
  <li class="gallery__item">
          <img src=${initialCards[i].link} alt=${initialCards[i].name} class="gallery__photo" />
          <div class="gallery__name">
            <h2 class="gallery__title">${initialCards[i].name}</h2>
            <button class="button button_type_like" type="button"></button>
          </div>
        </li>`);
}
///////////////////////////////////////////////
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  galleryList.insertAdjacentHTML('afterbegin', `
  <li class="gallery__item">
          <img src=${cardPopupLink.value} alt=${cardPopupName.value} class="gallery__photo" />
          <div class="gallery__name">
            <h2 class="gallery__title">${cardPopupName.value}</h2>
            <button class="button button_type_like" type="button"></button>
          </div>
        </li>`);
  popup.classList.remove('popup_opened');
  cardPopup.classList.remove('popup__container_opened');
}
cardPopupForm.addEventListener('submit', cardFormSubmitHandler);
