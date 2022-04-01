import {renderPictures} from './render-pictures.js';
import {AMOUNT_PHOTOCARDS, getPhotoArray} from './data.js';
import {validateForm} from './form.js';

validateForm();
renderPictures(getPhotoArray(AMOUNT_PHOTOCARDS));
