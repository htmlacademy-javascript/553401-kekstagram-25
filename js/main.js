const MAX_LENGTH_COMMENT = 140;
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

// Создаем комментарий для карточки
const createCommentForCard = () => (
  {
    id: '',
    avatar: `img/avatar-${  getRandomPositiveInteger (1, 6)  }.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
);

// Получаем массив с комментариями к карточке
const getCommentArray = (arrayLength) => {
  const comments = [];

  for (let i = 1; i <= arrayLength; i++) {
    const comment = createCommentForCard();
    comment.id = i;
    comments.push(comment);
  }

  return comments;
};

//Создаем Случайную Фотокарточку
const createPhotoCard = () => (
  {
    id: '',
    url: '',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger (15, 300), /** количество лайков от 15 до 300 */
    comments: getCommentArray(getRandomPositiveInteger(1, 6)), /** количество комментариев от 1 до 6 */
  }
);

// Получаем массив из Фотокарточек
const getPhotoArray = (arrayLength) => {
  const photoCards = []; // наш массив объектов с данными, который мы будем заполнять полученными объектами

  for (let i = 1; i <= arrayLength; i++) {
    const photoCard = createPhotoCard();
    photoCard.id = i;
    photoCard.url = `photos/${  i  }.jpg`;
    photoCards.push(photoCard);
  }

  return photoCards;
};

getPhotoArray(25);
