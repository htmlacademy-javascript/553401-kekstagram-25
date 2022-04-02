import {hasDuplicates} from './util.js';
const AMOUNT_HASHTAGS = 5;
const AMOUNT_COMMENT_SYMBOLS = 140;
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
  classTo: 'text__label',
  errorClass: 'text__label--invalid',
  successClass: 'text__label--valid',
  errorTextParent: 'text__label',
  errorTextTag: 'p',
  errorTextClass: 'text__error'
});

// Value переводим в верхний регистр и записываем значения разделенные пробелом в массив
// пустые значения массива (пробел) отбрасываем
const getArrayOfValues = (value) => value.toUpperCase().split(' ').filter(String);

// сравниваем поле хештегов на соответствие регулярного выражения
function validateHashtagsRe (value) {
  // при пустом поле возвращаем true
  if (value.length === 0) {
    return true;
  }

  const arrayOfHashtags = getArrayOfValues(value);

  // проверка регулярного выражения если поле не пустое
  for (let i = 0; i < arrayOfHashtags.length; i++) {
    if (!re.test(arrayOfHashtags[i])) {
      return false;
    }
  }

  return true;
}

// проверка на дубликаты хэштегов (регистр не важен)
function validateHashtagsDublicates (value) {
  return !hasDuplicates(getArrayOfValues(value));
}

// проверка на максимальное количество хэштегов
function validateHashtagsLength (value) {
  return getArrayOfValues(value).length <= AMOUNT_HASHTAGS;
}

pristine.addValidator(
  hashtagsInput,
  validateHashtagsRe,
  'Хештеги начинаются с #, разделяются пробелом'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsDublicates,
  'Хештеги не должны повторяться'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsLength,
  `Максимум можно ${ AMOUNT_HASHTAGS } хештегов`
);

function validateComment (value) {
  return value.length <= AMOUNT_COMMENT_SYMBOLS;
}

pristine.addValidator(
  commentArea,
  validateComment,
  `До ${  AMOUNT_COMMENT_SYMBOLS  } символов`
);

const validateForm = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {validateForm};
