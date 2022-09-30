//Объявляем переменные и константы
export const content = document.querySelector('.content');
export const editButton = content.querySelector('.button_type_edit');
export const addButton = content.querySelector('.button_type_add');
export const editAvatarButton = content.querySelector('.button_type_avatar');
export const profileName = content.querySelector('.profile__name');
export const profileAbout = content.querySelector('.profile__about');
export const profileAvatar = content.querySelector('.profile__avatar');

export const profilePopup = document.querySelector('.profile-popup');
export const cardPopup = document.querySelector('.card-popup');
export const imagePopup = document.querySelector('.image-popup');
export const deletePopup = document.querySelector('.delete-popup');
export const avatarPopup = document.querySelector('.avatar-popup');

export const popups = document.querySelectorAll('.popup');
export const forms = document.querySelectorAll('.popup__form');

export const profilePopupName = profilePopup.querySelector('#name');
export const profilePopupAbout = profilePopup.querySelector('#about-yourself');

export const cardPopupName = cardPopup.querySelector('#name-card');
export const cardPopupLink = cardPopup.querySelector('#link-card');

export const avatarPopupLink = avatarPopup.querySelector('#link-avatar');

export const itemTemplate = document.querySelector('#item-template').content;

export const figureImage = imagePopup.querySelector('.figure__image');
export const figureCaption = imagePopup.querySelector('.figure__caption');

export const galleryList = content.querySelector('.gallery__list');
