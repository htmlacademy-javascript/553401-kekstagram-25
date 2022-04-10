import {getRandomPositiveInteger, getRandomArrayElement, createShuffleArray} from './util.js';

const AMOUNT_AVATARS = 6;
const AMOUNT_COMMENTS_MAX = 6;
const AMOUNT_LIKES_MIN = 15;
const AMOUNT_LIKES_MAX = 200;
const AMOUNT_PHOTOCARDS = 25;
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
const createPhotoCard = (number) => (
  {
    id: number,
    url: `photos/${  number  }.jpg`,
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
    const photoCard = createPhotoCard(idArray[i]);
    photoCards.push(photoCard);
  }

  return photoCards;
};

export {AMOUNT_PHOTOCARDS, getPhotoArray};
