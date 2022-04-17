import {openBigPicture} from './render-full-picture.js';

const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (cardsArray) => {
  const pictureListFragment = document.createDocumentFragment();

  cardsArray
    .forEach((card) => {
      const pictureItem = pictureTemplate.cloneNode(true);
      pictureItem.querySelector('.picture__img').src = card.url;
      pictureItem.querySelector('.picture__comments').textContent = card.comments.length;
      pictureItem.querySelector('.picture__likes').textContent = card.likes;

      pictureItem.addEventListener('click', () => {
        openBigPicture(card);
      });

      pictureListFragment.appendChild(pictureItem);
    });

  while (picturesBlock.querySelector('.picture')) {
    picturesBlock.removeChild(picturesBlock.querySelector('.picture'));
  }

  picturesBlock.appendChild(pictureListFragment);
};

export {renderPictures};
