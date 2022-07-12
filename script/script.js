//Объявляем переменные и константы
let content = document.querySelector('.content');
const editButton = content.querySelector('.button_type_edit');
let profileName = content.querySelector('.profile__name');
let profileAbout = content.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let popup__container = popup.querySelector('.popup__container');
const closeButton = popup__container.querySelector('.button_type_сlose');
let popupName = popup.querySelector('#name');
let popupAboutYourself = popup.querySelector('#about-yourself');

//Обработка события click при нажитии на кпонку редактировать
function popupOpened() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupAboutYourself.value = profileAbout.textContent;
}
editButton.addEventListener('click', popupOpened);
//Обработка события click при нажитии на кпонку закрыть
closeButton.addEventListener('click', function () {
  // profileName.textContent = popupName.value;
  // profileAbout.textContent = profileAbout.value;
  popup.classList.remove('popup_opened');
});
