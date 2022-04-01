import {hasDuplicates} from './util.js';

const form = document.querySelector('.img-upload__form');
const formPopup = form.querySelector('.img-upload__overlay');
const uploadButton = form.querySelector('#upload-file');
const cancel = form.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentArea = form.querySelector('.text__description');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

uploadButton.addEventListener('change', () => {
  openUploadForm ();
});

function openUploadForm () {
  formPopup.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  uploadButton.value = '';
}

function closePopup () {
  formPopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function onPopupEscKeydown (evt) {
  if (evt.key === 'Escape' && hashtagsInput !== document.activeElement && commentArea !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
}

cancel.addEventListener('click', () => {
  closePopup ();
});

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'text',
  errorTextTag: 'p',
  errorTextClass: 'text__error'
});

// сравниваем поле хештегов на соответствие правилам, значение поля
// переводим в верхний регистр и записываем значения разделенные пробелом в массив,
// пустые значения массива (пробел) отбрасываем
function validateHashtags () {
  const arrayOfHashtags = hashtagsInput.value
    .toUpperCase()
    .split(' ')
    .filter(String);
  // проверка регулярного выражения
  for (let i = 0; i < arrayOfHashtags.length; i++) {
    if (!re.test(arrayOfHashtags[i])) {
      return false;
    }
  }
  // проверка на количество и дубликаты (регистр не важен)
  if (arrayOfHashtags.length > 5 || hasDuplicates(arrayOfHashtags)) {
    return false;
  }

  return true;
}

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Максимум 5 хештегов до 20 символов, разделяются пробелом'
);

function validateComment (value) {
  return value.length <= 140;
}

pristine.addValidator(
  commentArea,
  validateComment,
  'До 140 символов'
);

const validateForm = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      console.log('форма валидна');
    } else {
      console.log('форма невалидна');
    }
  });
};

export {validateForm};
