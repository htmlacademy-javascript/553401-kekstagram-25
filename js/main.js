import {renderPictures, AMOUNT_PHOTOCARDS} from './render-pictures.js';
import {closePopup} from './form-display.js';
import {setUserFormSubmit} from './form-validate.js';
import {getData} from './api.js';

getData((photos) => {
  renderPictures(photos.slice(0, AMOUNT_PHOTOCARDS));
});

setUserFormSubmit(closePopup);
