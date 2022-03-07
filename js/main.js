const MAX_LENGTH_COMMENT = 140;
const AMOUNT_AVATARS = 6;
const AMOUNT_COMMENTS_MAX = 6;
const AMOUNT_LIKES_MIN = 15;
const AMOUNT_LIKES_MAX = 200;
const AMOUNT_PHOTOCARDS = 25;
const COMMENT = 'Это временная константа';
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const DESCRIPTIONS = [
  'Горы',
  'Город',
  'Поле',
  'Облака',
  'Авто',
  'Лес',
  'Утро',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
];


// Функция, возвращающая случайное целое положительное число из переданного диапазона включительно, последовательность не важна
const getRandomPositiveInteger = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  let result = min;

  if (min !== max) {
    result = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return result;
};

// Получаем случайный элемент массива
const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

//Функция для проверки максимальной длины строки
const isStringLength = (string, maxLength) =>
  string.length <= maxLength;

// !!!Временно!!! используем функцию максимальной длины
isStringLength (COMMENT, MAX_LENGTH_COMMENT);

// Создает массив перемешанных чисел в заданном диапазоне
const createShuffleArray = (start, end) => {
  const array = [];

  for (let i = start; i <= end; i ++) {
    array.push(i);
  }

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    const swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }

  return array;
};

// Создаем комментарий для карточки
const createCommentForCard = (id) => (
  {
    id: id,
    avatar: `img/avatar-${  getRandomPositiveInteger (1, AMOUNT_AVATARS)  }.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
);

// Получаем массив с комментариями к карточке
const getCommentArray = (arrayLength) => {
  const comments = [];
  const idArray = createShuffleArray(1, arrayLength);

  for (let i = 0; i < arrayLength; i++) {
    const comment = createCommentForCard(idArray[i]);
    comments.push(comment);
  }

  return comments;
};

//Создаем Случайную Фотокарточку
const createPhotoCard = (id, url) => (
  {
    id: id,
    url: `photos/${  url  }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger (AMOUNT_LIKES_MIN, AMOUNT_LIKES_MAX), /** количество лайков от 15 до 300 */
    comments: getCommentArray(getRandomPositiveInteger(1, AMOUNT_COMMENTS_MAX)), /** количество комментариев от 1 до 6 */
  }
);

// Получаем массив из Фотокарточек
const getPhotoArray = (arrayLength) => {
  const photoCards = []; // наш массив объектов с данными, который мы будем заполнять полученными объектами
  const idArray = createShuffleArray(1, arrayLength);

  for (let i = 0; i < arrayLength; i++) {
    const photoCard = createPhotoCard(idArray[i], i + 1);
    photoCards.push(photoCard);
  }

  return photoCards;
};

getPhotoArray(AMOUNT_PHOTOCARDS);
