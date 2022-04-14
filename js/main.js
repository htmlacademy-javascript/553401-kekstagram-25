import {renderPictures, AMOUNT_PHOTOCARDS} from './render-pictures.js';
import {closePopup} from './form-display.js';
import {showAlert} from './util.js';
import {setUserFormSubmit} from './form-validate.js';
import {getData} from './api.js';

getData(
  (photos) => {
    renderPictures(photos.slice(0, AMOUNT_PHOTOCARDS));
  },
  () => showAlert('Не удалось получить данные. Попробуйте обновить страницу')
);

setUserFormSubmit(closePopup, closePopup);
