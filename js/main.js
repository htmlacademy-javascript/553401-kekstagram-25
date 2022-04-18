import {renderPictures} from './render-pictures.js';
import {closePopup} from './form-display.js';
import {showAlert, debouncing, RERENDER_DELAY} from './util.js';
import {setUserFormSubmit} from './form-validate.js';
import {getData} from './api.js';
import {filtersBlock, setActiveFilterClick, getFilteredArray} from './filters.js';

getData(
  (photos) => {
    renderPictures(photos);
    setActiveFilterClick(debouncing(
      () => renderPictures(getFilteredArray(photos)),
      RERENDER_DELAY,
    ));
    filtersBlock.classList.remove('img-filters--inactive');
  },
  () => showAlert('Не удалось получить данные. Попробуйте обновить страницу')
);

setUserFormSubmit(closePopup, closePopup);
