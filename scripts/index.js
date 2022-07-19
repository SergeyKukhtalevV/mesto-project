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

//Обработка события click при нажитии на кпонку закрыть
closeButtons.forEach((button) => {
	// находим 1 раз ближайший к крестику попап
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
//Обработка события error при загрузки изображения
function loadDefaultImage(imageItem) {
	imageItem.setAttribute('src', './images/image-placeholder.jpg');
}


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
	const itemElement = getCard(link, name);
	galleryList.prepend(itemElement);
}
//***************************************************************************** */
function getCard(link, name) {
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
