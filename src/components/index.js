import {
  profilePopup,
  avatarPopup,
  cardAddPopup,
  profileAvatar,
  profileName,
  profileAbout,
  profilePopupName,
  profilePopupAbout,
  buttonOpenPopupAvatar,
  avatarPopupLink,
  cardPopupName,
  cardPopupLink,
  buttonOpenPopupNewCard,
  popups,
  forms,
  cardDeletePopup,
  buttonOpenPopupEditProfile,
} from "./config.js";

import enableValidation from "./validate.js";
import {createCard, deleteLocalCard, idCardToDelete} from "./card.js";
import {openPopup, closePopup} from "./modal.js";
import {
  getCards, getUserInfo, setUserInfo, addedCard, deleteCardOnServer, setUserAvatar
} from "./api.js";
import '../styles/index.css';

let userId;
let cards;

///////////////////////////////////////////////////////////////
// Получение информации о пользователе с сервера
getUserInfo()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .then((result) => {
    profileName.textContent = result.name;
    profileAbout.textContent = result.about;
    profileAvatar.src = result.avatar;
    userId = result["_id"];
  })
  .catch((err) => {
    console.log('Ошибка, запрос не выполнен', err);
  });
///////////////////////////////////////////////////////////////
// Обработчик формы редактирования данных о пользователе
function handleProfileFormSubmit(evt) {

  const submitButton = evt.target.querySelector('.button_type_submit');
  submitButton.classList.add('button_loading');
  profileName.textContent = profilePopupName.value;
  profileAbout.textContent = profilePopupAbout.value;

  setUserInfo(profilePopupName.value, profilePopupAbout.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      submitButton.classList.add('button_loaded');
      console.log('Запрос на изменение данных пользователя выполнен успешно.');
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err);
    })
    .finally(() => {
      closePopup(profilePopup);
      setTimeout(() => {
        submitButton.classList.remove('button_loading');
        submitButton.classList.remove('button_loaded');
      }, 500);
    });
}

///////////////////////////////////////////////////////////////
buttonOpenPopupAvatar.addEventListener('click', () => {
  openPopup(avatarPopup);
})
///////////////////////////////////////////////////////////////
// Обработка формы изменения аватара
function handleEditAvatarFormSubmit(evt, inactiveButtonClass) {

  const submitButton = evt.target.querySelector('.button_type_submit');
  submitButton.classList.add('button_loading');
  setUserAvatar(avatarPopupLink.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      submitButton.classList.add('button_loaded');
      console.log('Запрос на изменение аватара пользователя выполнен успешно.', result);
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err);
    })
    .finally(() => {
      closePopup(avatarPopup);
      submitButton.classList.add(inactiveButtonClass);
      submitButton.setAttribute('disabled', 'disabled');
      setTimeout(() => {
        submitButton.classList.remove('button_loading');
        submitButton.classList.remove('button_loaded');
      }, 500);
    });
}

///////////////////////////////////////////////////////////////
// Получения массива карточек от сервера и создание разметки
getCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .then((result) => {
    cards = Array.from(result);
    cards.forEach((card) => {
      createCard(card.link, card.name, card.likes.length, userId, card.owner["_id"], card["_id"]);
    });
  })
  .catch((err) => {
    console.log('Ошибка, запрос не выполнен', err);
  });

///////////////////////////////////////////////////////////////
// Обработка формы добавления изображения
function handleCardFormSubmit(evt, inactiveButtonClass) {

  const submitButton = evt.target.querySelector('.button_type_submit');
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.classList.add('button_loading');

  addedCard(cardPopupName.value, cardPopupLink.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      submitButton.classList.add('button_loaded');
      console.log("Сервер прислал созданный объект карточка", result);
      createCard(result.link, result.name, result.likes.length, userId, result.owner["_id"], result["_id"]);
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err);
    })
    .finally(() => {
      closePopup(cardAddPopup);
      submitButton.classList.add(inactiveButtonClass);
      submitButton.setAttribute('disabled', 'disabled');
      evt.target.reset();
      setTimeout(() => {
        submitButton.classList.remove('button_loading');
        submitButton.classList.remove('button_loaded');
      }, 500);
    });
}

////////////////////////////////////////////////////////
buttonOpenPopupEditProfile.addEventListener('click', () => {
  openPopup(profilePopup);
  profilePopupName.value = profileName.textContent;
  profilePopupAbout.value = profileAbout.textContent;
});
///////////////////////////////////////////////////////////////
buttonOpenPopupNewCard.addEventListener('click', () => openPopup(cardAddPopup));
//////////////////////////////////////////////////////////////////////////////
//Обработка события click при нажатии на кнопку закрыть и закрытие модального окна по клику на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('button_type_сlose')) {
      closePopup(popup);
    }
  });
});

//////////////////////////////////////////////
function handleDeleteFormSubmit(CardId) {
  deleteCardOnServer(CardId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((result) => {
      console.log("Удалено с результатом ", result);
      deleteLocalCard(CardId);
    })
    .catch((err) => {
      console.log('Ошибка, запрос на удаление не выполнен', err);
    });
  closePopup(cardDeletePopup);
}

//////////////////////////////////////////////////
forms.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (formElement.getAttribute('name') === 'edit-profile') {
      handleProfileFormSubmit(evt);
    }
    if (formElement.getAttribute('name') === 'card-add') {
      handleCardFormSubmit(evt, 'button_inactive');
    }
    if (formElement.getAttribute('name') === 'delete-card') {
      handleDeleteFormSubmit(idCardToDelete);
    }
    if (formElement.getAttribute('name') === 'edit-avatar') {
      handleEditAvatarFormSubmit(evt, 'button_inactive');
    }
  });
});

/****************************************************************************/
enableValidation({
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active'
});
