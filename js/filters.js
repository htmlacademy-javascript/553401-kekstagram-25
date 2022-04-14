import {getShuffleArray} from './util.js';

const AMOUNT_PHOTOCARDS = 25;
const AMOUNT_RANDOM_PHOTOCARDS = 10;

const filtersBlock = document.querySelector('.img-filters');

const compareCommentsLength = (imgA, imgB) => imgB.comments.length - imgA.comments.length;

const setActiveFilterClick = (callback) => {
  filtersBlock.addEventListener('click',  (evt) => {
    if (evt.target.nodeName === 'BUTTON') {
      const activeFilter = filtersBlock.querySelector('.img-filters__button--active');

      if (!evt.target.classList.contains('img-filters__button--active')) {
        activeFilter.classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
      }

      callback();
    }
  });
};

const getFilteredArray = (activeElement, array) => {
  const cardsArrayDefault = array.slice();
  let cardsArrayFiltered;

  if (activeElement.id === 'filter-default') {
    cardsArrayFiltered = cardsArrayDefault;
  }

  if (activeElement.id === 'filter-random') {
    cardsArrayFiltered = getShuffleArray(cardsArrayDefault)
      .slice(0, AMOUNT_RANDOM_PHOTOCARDS);
  }

  if (activeElement.id === 'filter-discussed') {
    cardsArrayFiltered = cardsArrayDefault
      .sort(compareCommentsLength)
      .slice(0, AMOUNT_PHOTOCARDS);
  }
  return cardsArrayFiltered;
};

export {filtersBlock, compareCommentsLength, setActiveFilterClick, getFilteredArray};
