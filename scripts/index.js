//Объявляем переменные и константы
const content = document.querySelector('.content');
const editButton = content.querySelector('.button_type_edit');
const addButton = content.querySelector('.button_type_add');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');

const profilePopupCloseButton = profilePopup.querySelector('.button_type_сlose');
const cardPopupCloseButton = cardPopup.querySelector('.button_type_сlose');
const imagePopupCloseButton = imagePopup.querySelector('.button_type_сlose');

const profilePopupForm = profilePopup.querySelector('.popup__form');
const cardPopupForm = cardPopup.querySelector('.popup__form');

const profilePopupName = profilePopup.querySelector('#name');
const profilePopupAbout = profilePopup.querySelector('#about-yourself');

const cardPopupName = cardPopup.querySelector('#name-card');
const cardPopupLink = cardPopup.querySelector('#link-card');

const galleryList = content.querySelector('.gallery__list');
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
//Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  profilePopupName.value = profileName.textContent;
  profilePopupAbout.value = profileAbout.textContent;
}
//Функция закрытии popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', () => openPopup(profilePopup));
addButton.addEventListener('click', () => openPopup(cardPopup));

//Обработка события click при нажитии на кпонку закрыть
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));
cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup));
imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));
///////////////////////////////////////////////
function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileAbout.textContent = profilePopupAbout.value;
  profilePopup.classList.remove('popup_opened');
}
profilePopupForm.addEventListener('submit', formProfileSubmitHandler);

//*******************************************************************************/
// Обработка нажатия лайка изображения
function takeLike(event) {
  event.target.classList.toggle('button_type_like-active');
}
///////////////////////////////////////////////////
// Обработка удаления изображения
function deleteCard(event) {
  const listItem = event.target.closest('.gallery__item');
  listItem.remove();
}

///////////////////////////////////////////////////
//Обработка события error при загрузки изображения
function noLoadImage(imageItem) {
  imageItem.setAttribute('src', './images/image-placeholder.jpg');
}


// Обработка нажатия на изображение
function openImage(event) {
  const listItem = event.target.closest('.gallery__item');
  const photoGallery = listItem.querySelector('.gallery__photo');
  const titleGallery = listItem.querySelector('.gallery__title');

  const figureImage = imagePopup.querySelector('.figure__image');
  const figureCaption = imagePopup.querySelector('.figure__caption');

  openPopup(imagePopup);
  figureImage.src = photoGallery.src;
  figureImage.alt = photoGallery.alt;
  figureCaption.textContent = titleGallery.textContent;
}

//***************************************************************************** */

function createCard(link, name) {
  link = link.trim();
  name = name.trim();

  const itemTemplate = document.querySelector('#item-template').content;
  const itemElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);
  const imageItem = itemElement.querySelector('.gallery__photo');
  const titleItem = itemElement.querySelector('.gallery__title');
  const likeItem = itemElement.querySelector('.button_type_like');
  const deleteItem = itemElement.querySelector('.button_type_delete');

  imageItem.src = link;
  imageItem.alt = name;
  titleItem.textContent = name;

  likeItem.addEventListener('click', takeLike);
  deleteItem.addEventListener('click', deleteCard);
  imageItem.addEventListener('error', () => noLoadImage(imageItem));
  imageItem.addEventListener('click', openImage);

  galleryList.prepend(itemElement);
}

for (let i = 0; i < initialCards.length; i++) {

  createCard(initialCards[i].link, initialCards[i].name);

}
///////////////////////////////////////////////
// Обработка формы добавления изображения
function formCardSubmitHandler(evt) {
  evt.preventDefault();
  createCard(cardPopupLink.value, cardPopupName.value);

  cardPopup.classList.remove('popup_opened');
  cardPopupLink.value = '';
  cardPopupName.value = '';
}
cardPopupForm.addEventListener('submit', formCardSubmitHandler);
