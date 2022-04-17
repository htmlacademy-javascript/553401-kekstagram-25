import {getShuffleArray} from './util.js';

const AMOUNT_PHOTOCARDS = 25;
const AMOUNT_RANDOM_PHOTOCARDS = 10;

const filtersBlock = document.querySelector('.img-filters');
let activeFilter = filtersBlock.querySelector('.img-filters__button--active');

const compareCommentsLength = (imgA, imgB) => imgB.comments.length - imgA.comments.length;

const setActiveFilterClick = (callback) => {
  filtersBlock.addEventListener('click',  (evt) => {
    if (evt.target.nodeName === 'BUTTON') {
      if (!evt.target.classList.contains('img-filters__button--active')) {
        activeFilter.classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
        activeFilter = document.querySelector('.img-filters__button--active');
      }

      callback();
    }
  });
};

const getFilteredArray = (array) => {
  const arrayDefault = array.slice();
  let arrayFiltered;

  switch (activeFilter.id) {
    case 'filter-default':
      arrayFiltered = arrayDefault;
      break;
    case 'filter-random':
      arrayFiltered = getShuffleArray(arrayDefault)
        .slice(0, AMOUNT_RANDOM_PHOTOCARDS);
      break;
    case 'filter-discussed':
      arrayFiltered = arrayDefault
        .sort(compareCommentsLength)
        .slice(0, AMOUNT_PHOTOCARDS);
      break;
  }

  return arrayFiltered;
};

export {filtersBlock, compareCommentsLength, setActiveFilterClick, getFilteredArray};
