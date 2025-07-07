import {isEscapeKey, hasDuplicates} from './utils';
import {imageResize, resetEffects} from './img-editor';

const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_COUNT = 5;
const HASHTAGREGEX = /^(#[a-zа-яё0-9]{1,19})(\s+#[a-zа-яё0-9]{1,19})*$/i;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');
const imgUploadClose = document.querySelector('.img-upload__cancel');
const commentAreaErrorMessage = `Длина комментария больше ${COMMENT_MAX_LENGTH} символов`;

const onModalEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && !hashtagsInput.matches(':focus') && !commentArea.matches(':focus')) {
    evt.preventDefault();
    closeModal();
  }
};

const onCloseButtonClick = () => {
  closeModal();
};

const onImgUploadClick = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  hashtagsInput.value = '';
  commentArea.value = '';

  document.addEventListener('keydown', onModalEscapeKeydown);
  imgUploadClose.addEventListener('click', onCloseButtonClick);
};

const validateComments = (value) => value.length <= COMMENT_MAX_LENGTH;

function closeModal () {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imgUploadForm.reset();
  imageResize.resetEditor();
  resetEffects();

  document.removeEventListener('keydown', onModalEscapeKeydown);
  imgUploadClose.removeEventListener('click', onCloseButtonClick);
}

const pristineImgUpload = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
});

const validateForm = () => pristineImgUpload.validate();

pristineImgUpload.addValidator(hashtagsInput, validateWritingHashtags, 'Введён невалидный хэштег');

function validateWritingHashtags (value) {
  const hashtags = value.trim().toLowerCase();
  if (hashtags === '') {
    return true;
  }

  return HASHTAGREGEX.test(hashtags);
}

pristineImgUpload.addValidator(hashtagsInput, validateDuplicatesHashtags, 'Хэштеги повторяются');

function validateDuplicatesHashtags (value) {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  return !hasDuplicates(hashtags);
}

pristineImgUpload.addValidator(hashtagsInput, validateQuantityHashtags, 'Превышено количество хэштегов');

function validateQuantityHashtags (value) {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  return !(hashtags.length > HASHTAGS_MAX_COUNT);
}

pristineImgUpload.addValidator(commentArea, validateComments, commentAreaErrorMessage);

imgUploadInput.addEventListener('change', onImgUploadClick);

export {validateForm, closeModal};

