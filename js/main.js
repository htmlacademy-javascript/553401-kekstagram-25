const MAX_LENGTH_COMMENT = 140;
const COMMENT = 'Это временная константа';

// Функция, возвращающая случайное целое число из переданного диапазона включительно, последовательность не важна
function getRandomInRange (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let result = min;

  if (min < 0 || max < 0 || max < min) {
    throw new Error('Отрицательные значения не допустимы, конечное значение не может быть меньше начального');
  }

  if (min !== max) {
    result = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return result;
}

//Функция для проверки максимальной длины строки
function isStringLength (string, maxLength) {
  return string.length <= maxLength;
}

getRandomInRange (0, 15);

isStringLength (COMMENT, MAX_LENGTH_COMMENT);

