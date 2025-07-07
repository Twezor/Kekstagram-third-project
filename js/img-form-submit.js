import {isEscapeKey} from './utils';
import {postData} from './api';
import {validateForm, closeModal} from './img-form-validate';

const imgUploadSubmitButton = document.querySelector('.img-upload__submit');
const imgUploadForm = document.querySelector('.img-upload__form');

const blockSubmitButton = () => {
  imgUploadSubmitButton.disabled = true;
  imgUploadSubmitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  imgUploadSubmitButton.disabled = false;
  imgUploadSubmitButton.textContent = 'Опубликовать';
};

function showErrorMessageData() {
  const errorMessageTemplate = document.querySelector('#data-error');
  const errorMessage = errorMessageTemplate.content.cloneNode(true);
  const errorContainer = document.createElement('div');
  errorContainer.appendChild(errorMessage);
  document.body.appendChild(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
}

function showSuccessMessage() {
  const successMessage = document.querySelector('#success').content.cloneNode(true);
  const successContainer = document.createElement('div');
  successContainer.appendChild(successMessage);
  document.body.appendChild(successContainer);
  const successButton = successContainer.querySelector('.success__button');
  const successInner = successContainer.querySelector('.success__inner');

  const onSuccessMessageEscapeKeydown = function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successContainer.remove();
    }
  };

  const onOutsideSuccessMessageClick = function (evt) {
    if (!successInner.contains(evt.target)) {
      successContainer.remove();
    }
  };

  successButton.addEventListener('click', () => {
    successContainer.remove();
  });

  document.addEventListener('keydown', onSuccessMessageEscapeKeydown);
  document.addEventListener('click', onOutsideSuccessMessageClick);
}

function showErrorMessage(){
  const errorMessage = document.querySelector('#error').content.cloneNode(true);
  const errorContainer = document.createElement('div');
  errorContainer.appendChild(errorMessage);
  document.body.appendChild(errorContainer);
  const errorButton = errorContainer.querySelector('.error__button');
  const errorInner = errorContainer.querySelector('.error__inner');

  function onEscapeKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      errorContainer.remove();
      document.body.removeEventListener('keydown', onEscapeKeydown);
      document.removeEventListener('click', onOutsideErrorMessageClick);
    }
  }

  function onOutsideErrorMessageClick (evt) {
    if (!errorInner.contains(evt.target)) {
      errorContainer.remove();
      document.body.removeEventListener('keydown', onEscapeKeydown);
      document.removeEventListener('click', onOutsideErrorMessageClick);
    }
  }

  errorButton.addEventListener('click', () => {
    errorContainer.remove();
  });

  document.body.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('click', onOutsideErrorMessageClick);
}

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!validateForm()) {
    return;
  }
  blockSubmitButton();
  const formData = new FormData(evt.target);
  postData (formData,
    () => {
      showSuccessMessage();
      unblockSubmitButton();
      closeModal();
    },
    () => {
      showErrorMessage();
      unblockSubmitButton();
    }
  );
});


export {showErrorMessageData};
