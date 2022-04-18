import {onClickScaleSmaller, onClickScaleBigger, onEffectChange, resetEffect, showPreviewImage} from './upload-image-effects.js';

const form = document.querySelector('.img-upload__form');
const formPopup = form.querySelector('.img-upload__overlay');
const uploadButton = form.querySelector('#upload-file');
const cancel = form.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentArea = form.querySelector('.text__description');
const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');
const effectsBlock = form.querySelector('.effects');

const resetForm = () => {
  uploadButton.value = '';
  hashtagsInput.textContent = '';
  commentArea.textContent = '';
  resetEffect();
};

const openUploadForm = () => {
  formPopup.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  cancel.addEventListener('click', onClickCancel);
  scaleSmaller.addEventListener('click', onClickScaleSmaller);
  scaleBigger.addEventListener('click', onClickScaleBigger);
  effectsBlock.addEventListener('change', onEffectChange);
};

const closePopup = () => {
  formPopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  cancel.removeEventListener('click',onClickCancel);
  scaleSmaller.removeEventListener('click', onClickScaleSmaller);
  scaleBigger.removeEventListener('click', onClickScaleBigger);
  effectsBlock.removeEventListener('change', onEffectChange);
  resetForm();
};

function onPopupEscKeydown (evt) {
  if (evt.key === 'Escape' && hashtagsInput !== document.activeElement && commentArea !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
}

function onClickCancel () {
  closePopup ();
}

uploadButton.addEventListener('change', () => {
  showPreviewImage (uploadButton);
  openUploadForm ();
});

export {form, hashtagsInput, commentArea, closePopup};
