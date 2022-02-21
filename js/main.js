const MAX_LENGTH_COMMENT = 140;
const COMMENT = 'Это временная константа';

// Функция, возвращающая случайное целое число из переданного диапазона включительно, последовательность не важна
function getRandomInRange (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0) {
    return console.log('Введите положительные числа от ноля включительно');
  }

  if (max < min) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Функция для проверки максимальной длины строки
function isStringLength (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }

  return false;
}

getRandomInRange (0, 15);

isStringLength (COMMENT, MAX_LENGTH_COMMENT);

