//Объявляем переменные и константы
let content = document.querySelector('.content');
const editButton = content.querySelector('.button_type_edit');
const addButton = content.querySelector('.button_type_add');
let profileName = content.querySelector('.profile__name');
let profileAbout = content.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelectorAll('.popup__container');
//console.dir(popupContainer);

console.dir(popupContainer[0]);


// const formElement = popup.querySelectorAll('.popup__form');
// const closeButton = popupContainer.querySelectorAll('.button_type_сlose');
// const submitButton = popupContainer.querySelectorAll('.button_type_submit');



// const popupName = popup.querySelector('#name');
// const popupAboutYourself = popup.querySelector('#about-yourself');
//console.log(profileAbout.textContent);

//Обработка события click при нажитии на кпонку редактировать
function popupOpened(popupContainerType) {
  popup.classList.add('popup_opened');
  popupContainerType.classList.add('popup__container_opened');
  popupName.value = profileName.textContent;
  popupAboutYourself.value = profileAbout.textContent;
}
editButton.addEventListener('click', popupOpened);
//Обработка события click при нажитии на кпонку закрыть
closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

///////////////////////////////////////////////
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAboutYourself.value;
  popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', formSubmitHandler);
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

