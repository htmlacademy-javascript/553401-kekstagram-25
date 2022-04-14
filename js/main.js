import {renderPictures} from './render-pictures.js';
import {closePopup} from './form-display.js';
import {showAlert} from './util.js';
import {setUserFormSubmit} from './form-validate.js';
import {getData} from './api.js';
import {filtersBlock, setActiveFilterClick} from './filters.js';

getData(
  (photos) => {
    renderPictures(photos);
    setActiveFilterClick(() => renderPictures(photos));
    filtersBlock.classList.remove('img-filters--inactive');
  },
  () => showAlert('Не удалось получить данные. Попробуйте обновить страницу')
);

setUserFormSubmit(closePopup, closePopup);
