import {onScaleSmallerClick, onScaleBiggerClick, onEffectChange, resetEffect} from './upload-image-effects.js';

const form = document.querySelector('.img-upload__form');
const formPopup = form.querySelector('.img-upload__overlay');
const uploadButton = form.querySelector('#upload-file');
const cancel = form.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentArea = form.querySelector('.text__description');
const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');
const effectsBlock = form.querySelector('.effects');

uploadButton.addEventListener('change', () => {
  openUploadForm ();
});

function openUploadForm () {
  formPopup.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  cancel.addEventListener('click', onClickCancel);
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  effectsBlock.addEventListener('change', onEffectChange);
}

function closePopup () {
  formPopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  cancel.removeEventListener('click',onClickCancel);
  scaleSmaller.removeEventListener('click', onScaleSmallerClick);
  scaleBigger.removeEventListener('click', onScaleBiggerClick);
  effectsBlock.removeEventListener('change', onEffectChange);
  resetForm();
}

function resetForm () {
  uploadButton.value = '';
  hashtagsInput.textContent = '';
  commentArea.textContent = '';
  resetEffect();
}

function onPopupEscKeydown (evt) {
  if (evt.key === 'Escape' && hashtagsInput !== document.activeElement && commentArea !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
}

function onClickCancel () {
  closePopup ();
}

export {form, hashtagsInput, commentArea, closePopup};
