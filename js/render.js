import {AMOUNT_PHOTOCARDS, getPhotoArray} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

const renderCards = (cardsArray) => {
  cardsArray.forEach((card) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = card.url;
    pictureItem.querySelector('.picture__comments').textContent = card.comments.length;
    pictureItem.querySelector('.picture__likes').textContent = card.likes;
    pictureListFragment.appendChild(pictureItem);
  });

  picturesContainer.appendChild(pictureListFragment);
};

export {renderCards};
