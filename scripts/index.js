//Объявляем переменные и константы
const content = document.querySelector('.content');
const editButton = content.querySelector('.button_type_edit');
const addButton = content.querySelector('.button_type_add');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

const popup = document.querySelector('.popup');
const popupContainer = popup.querySelectorAll('.popup__container');
const profilePopup = document.querySelector('.popup__container_type_user-info');
const cardPopup = document.querySelector('.popup__container_type_card-add');
const imagePopup = document.querySelector('.popup__container_type_photo');

const profilePopupCloseButton = profilePopup.querySelector('.button_type_сlose');
const cardPopupCloseButton = cardPopup.querySelector('.button_type_сlose');
const imagePopupCloseButton = imagePopup.querySelector('.button_type_сlose');

const profilePopupSubmitButton = profilePopup.querySelector('.button_type_submit');
const CardPopupSubmitButton = cardPopup.querySelector('.button_type_submit');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const cardPopupForm = cardPopup.querySelector('.popup__form');

const profilePopupName = profilePopup.querySelector('#name');
const profilePopupAbout = profilePopup.querySelector('#about-yourself');
const cardPopupName = cardPopup.querySelector('#name-card');
const cardPopupLink = cardPopup.querySelector('#link-card');

//Обработка события click при нажитии на кпонку редактировать и добавить
function openProfilePopup() {
  popup.classList.add('popup_opened');
  profilePopup.classList.add('popup__container_opened');
  profilePopupName.value = profileName.textContent;
  profilePopupAbout.value = profileAbout.textContent;
}
function openCardPopup() {
  popup.classList.add('popup_opened');
  cardPopup.classList.add('popup__container_opened');
}
//Обработка события click при закрытии окна
function closePopup(popupContainerType) {
  popup.classList.remove('popup_opened');
  popupContainerType.classList.remove('popup__container_opened');
}
editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openCardPopup);
//Обработка события click при нажитии на кпонку закрыть
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));
cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup));
imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));
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
const galleryList = content.querySelector('.gallery__list');
function addPhoto(link, name) {

  link = link.trim();
  name = name.trim();

  const itemTemplate = document.querySelector('#item-template').content;
  const itemElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);

  itemElement.querySelector('.gallery__photo').src = link;
  itemElement.querySelector('.gallery__photo').alt = name;
  
  itemElement.querySelector('.gallery__title').textContent = name;
  ///////////////////////////////////////
  // Обработка нажатия лайка изображения
  itemElement.querySelector('.button_type_like').addEventListener('click', function (event) {
    event.target.classList.toggle('button_type_like-active');
  });
  ///////////////////////////////////////////////////
  // Обработка удаления изображения
  const deleteButton = itemElement.querySelector('.button_type_delete');
  deleteButton.addEventListener('click', function (event) {
    const listItem = event.target.closest('.gallery__item');
    listItem.remove();
  });
  galleryList.prepend(itemElement);
  ///////////////////////////////////////////////////
  // Обработка нажатия на изображение
  const imageItem = itemElement.querySelector('.gallery__photo');
  //Обработка события error при загрузки изображения
  imageItem.addEventListener('error', function () {
    console.log("./images/image-placeholder.jpg");
    imageItem.setAttribute('src', './images/image-placeholder.jpg');
  });

  imageItem.addEventListener('click', function (event) {
    const listItem = event.target.closest('.gallery__item');
    popup.classList.add('popup_opened');
    imagePopup.classList.add('popup__container_opened');
    imagePopup.querySelector('.figure__image').src = listItem.querySelector('.gallery__photo').src;
    imagePopup.querySelector('.figure__image').alt = listItem.querySelector('.gallery__photo').alt;
    imagePopup.querySelector('.figure__caption').textContent = listItem.querySelector('.gallery__title').textContent;
  });
}
for (let i = 0; i < initialCards.length; i++) {

  addPhoto(initialCards[i].link, initialCards[i].name);

}
///////////////////////////////////////////////
// Обработка формы добавления изображения
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  addPhoto(cardPopupLink.value, cardPopupName.value);

  popup.classList.remove('popup_opened');
  cardPopup.classList.remove('popup__container_opened');
  cardPopupLink.value = '';
  cardPopupName.value = '';
}
cardPopupForm.addEventListener('submit', cardFormSubmitHandler);
