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
}
//Функция закрытии popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileAbout.textContent = profilePopupAbout.value;
  closePopup(profilePopup);
}
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

//*******************************************************************************/
// Обработка нажатия лайка изображения
function toggleLike(event) {
  event.target.classList.toggle('button_type_like-active');
}
///////////////////////////////////////////////////
// Обработка удаления изображения
function deleteCard(event) {
  const listItem = event.target.closest('.gallery__item');
  listItem.remove();
}

///////////////////////////////////////////////////
//Обработка события error при загрузке изображения
function loadDefaultImage(imageItem) {
  imageItem.setAttribute('src', './images/image-placeholder.jpg');
}
/****************************************************************************/
// Функция отображения сообщения об ошибках
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input-text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}
// Функция скрытия сообщения об ошибках
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input-text_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}
// Функция для проверки валидности коллекции validity input-ов
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
// Функция для переключения состояния кнопки типа "submit"
function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
    buttonElement.setAttribute('disabled','disabled');
  } else {
    buttonElement.classList.remove('button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}
// Функция для скрытия и отображения сообщения об ошибках
function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
// Функция для добавления слушателя 'input' в каждое поле ввода формы
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(`.popup__input-text`));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.button_type_submit');
  //toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}
// Функция для обработки валидации всем формам
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));
    fieldsetList.forEach((fieldsetElement) => {
      setEventListeners(fieldsetElement);
    });
  });
}
enableValidation();
/****************************************************************************/
// Обработка нажатия на изображение
function openImage(event) {
  const listItem = event.target.closest('.gallery__item');
  const photoGallery = listItem.querySelector('.gallery__photo');
  const titleGallery = listItem.querySelector('.gallery__title');

  openPopup(imagePopup);
  figureImage.src = photoGallery.src;
  figureImage.alt = photoGallery.alt;
  figureCaption.textContent = titleGallery.textContent;
}

//***************************************************************************** */
function createCard(link, name) {
  const itemElement = getCard(link, name, itemTemplate);
  galleryList.prepend(itemElement);
}
//***************************************************************************** */
function getCard(link, name, itemTemplate) {
  link = link.trim();
  name = name.trim();

  const itemElement = itemTemplate.querySelector('.gallery__item').cloneNode(true);
  const imageItem = itemElement.querySelector('.gallery__photo');
  const titleItem = itemElement.querySelector('.gallery__title');
  const likeItem = itemElement.querySelector('.button_type_like');
  const deleteItem = itemElement.querySelector('.button_type_delete');

  imageItem.src = link;
  imageItem.alt = name;
  titleItem.textContent = name;

  likeItem.addEventListener('click', toggleLike);
  deleteItem.addEventListener('click', deleteCard);
  imageItem.addEventListener('error', () => loadDefaultImage(imageItem));
  imageItem.addEventListener('click', openImage);

  return itemElement;
}
//Начальная вставка карточек "из коробки"
for (let i = 0; i < initialCards.length; i++) {

  createCard(initialCards[i].link, initialCards[i].name);

}
///////////////////////////////////////////////
// Обработка формы добавления изображения
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  createCard(cardPopupLink.value, cardPopupName.value);
  closePopup(cardPopup);
  evt.target.reset();
}
cardPopupForm.addEventListener('submit', handleCardFormSubmit);
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
