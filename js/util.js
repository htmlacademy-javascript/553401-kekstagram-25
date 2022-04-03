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

// Возвращает случайный элемент массива
const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

//Функция для проверки максимальной длины строки
const isStringLength = (string, maxLength) =>
  string.length <= maxLength;

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

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

export {getRandomPositiveInteger, getRandomArrayElement, createShuffleArray, isStringLength, hasDuplicates};
