import {hasDuplicates, showAlert} from './util.js';
import {form, hashtagsInput, commentArea} from './form-display.js';
import {sendData} from './api.js';

const AMOUNT_HASHTAGS = 5;
const AMOUNT_COMMENT_SYMBOLS = 140;
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const submitButton = form.querySelector('.img-upload__submit');
const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const renderMessage = (typeError, template) => {
  const messageFragment = document.createDocumentFragment();
  const message = template.cloneNode(true);
  const button = message.querySelector(`.${typeError}__button`);

  message.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(typeError)) {
      closeMessage();
    }
  });

  button.addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('keydown', onPopupEscKeydown);

  function onPopupEscKeydown (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  }

  function closeMessage () {
    message.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  messageFragment.appendChild(message);
  body.appendChild(messageFragment);
};

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

const setUserFormSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          renderMessage('success', successTemplate);
        },
        () => {
          onError();
          unblockSubmitButton();
          renderMessage('error', errorTemplate);
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit};
