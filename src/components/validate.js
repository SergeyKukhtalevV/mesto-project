import {handleCardFormSubmit, handleProfileFormSubmit} from "./index.js";

// Функция для обработки валидации всех форм
export default function enableValidation({
                                           formSelector, fieldsetSelector, inputSelector,
                                           submitButtonSelector, inactiveButtonClass, inputErrorClass,
                                           errorClass
                                         }) {
  // Функция отображения сообщения об ошибках
  function showInputError(fieldsetElement, inputElement, inputErrorClass, errorMessage, errorClass) {
    const errorElement = fieldsetElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

// Функция скрытия сообщения об ошибках
  function hideInputError(fieldsetSelector, inputElement, inputErrorClass, errorClass) {
    const errorElement = fieldsetSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

// Функция для скрытия и отображения сообщения об ошибках
  function checkInputValidity(fieldsetElement, inputElement, inputErrorClass, errorClass) {
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
      showInputError(fieldsetElement, inputElement, inputErrorClass, inputElement.validationMessage, errorClass);
    } else {
      hideInputError(fieldsetElement, inputElement, inputErrorClass, errorClass);
    }
  }

// Функция для проверки валидности коллекции validity input-ов
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Функция для переключения состояния кнопки типа "submit"
  function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  // Функция для добавления слушателя 'input' в каждое поле ввода формы
  function setEventListeners(fieldsetElement, inputSelector, submitButtonSelector, inactiveButtonClass,
                             inputErrorClass, errorClass) {
    const inputList = Array.from(fieldsetElement.querySelectorAll(inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = fieldsetElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(fieldsetElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  }

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      if (formElement.getAttribute('name') === 'edit-profile') {
        handleProfileFormSubmit(evt);
      }
      if (formElement.getAttribute('name') === 'card-add') {
        handleCardFormSubmit(evt);
      }
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(fieldsetSelector));
    fieldsetList.forEach((fieldsetElement) => {
      setEventListeners(fieldsetElement, inputSelector, submitButtonSelector, inactiveButtonClass,
        inputErrorClass, errorClass);
    });
  });
}
