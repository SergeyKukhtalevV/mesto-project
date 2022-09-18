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
    //console.log(inputElement.validity);
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
  toggleButtonState(inputList, buttonElement);

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
      if(formElement.getAttribute('name') === 'edit-profile') {
        handleProfileFormSubmit(evt);
      }
      if(formElement.getAttribute('name') === 'card-add') {
        handleCardFormSubmit(evt);
      }
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));
    fieldsetList.forEach((fieldsetElement) => {
      setEventListeners(fieldsetElement);
    });
  });
}

export default enableValidation;
