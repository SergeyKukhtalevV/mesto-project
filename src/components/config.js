//Объявляем переменные и константы
export const content = document.querySelector('.content');
export const buttonOpenPopupEditProfile = content.querySelector('.button_type_edit');
export const buttonOpenPopupNewCard = content.querySelector('.button_type_add');

export const buttonOpenPopupAvatar = content.querySelector('.button_type_avatar');
export const profileName = content.querySelector('.profile__name');
export const profileAbout = content.querySelector('.profile__about');
export const profileAvatar = content.querySelector('.profile__avatar');

export const profilePopup = document.querySelector('.profile-popup');
export const cardAddPopup = document.querySelector('.card-popup');
export const imageWatchPopup = document.querySelector('.image-popup');
export const cardDeletePopup = document.querySelector('.delete-popup');
export const avatarPopup = document.querySelector('.avatar-popup');

export const popups = document.querySelectorAll('.popup');
export const forms = document.querySelectorAll('.popup__form');

export const profilePopupName = profilePopup.querySelector('#name');
export const profilePopupAbout = profilePopup.querySelector('#about-yourself');

export const cardPopupName = cardAddPopup.querySelector('#name-card');
export const cardPopupLink = cardAddPopup.querySelector('#link-card');

export const avatarPopupLink = avatarPopup.querySelector('#link-avatar');

export const itemTemplate = document.querySelector('#item-template').content;

export const figureImage = imageWatchPopup.querySelector('.figure__image');
export const figureCaption = imageWatchPopup.querySelector('.figure__caption');

export const galleryList = content.querySelector('.gallery__list');
