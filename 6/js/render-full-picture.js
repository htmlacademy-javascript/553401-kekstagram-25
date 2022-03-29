import {photoArray} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const renderFullPicture = () => {
  const picturesCollection = picturesContainer.querySelectorAll('.picture');

  const addPictureClickHandler = (picture, card) => {
    picture.addEventListener('click', () => {
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');

      bigPicture.querySelector('.big-picture__img img').src = card.url;
      bigPicture.querySelector('.likes-count').textContent = card.likes;
      bigPicture.querySelector('.comments-count').textContent = card.comments.length;
      bigPicture.querySelector('.social__caption').textContent = card.description;

      const socialCommentsBlock = bigPicture.querySelector('.social__comments');
      const commentsListFragment = document.createDocumentFragment();

      card.comments.forEach((comment) => {
        const newComment = socialCommentsBlock.children[0].cloneNode(true);

        newComment.querySelector('.social__picture').src = comment.avatar;
        newComment.querySelector('.social__picture').alt = comment.name;
        newComment.querySelector('.social__text').textContent = comment.message;

        commentsListFragment.appendChild(newComment);
      });

      socialCommentsBlock.innerHTML = '';

      socialCommentsBlock.appendChild(commentsListFragment);
    });
  };

  for (let i = 0; i < picturesCollection.length; i++) {
    addPictureClickHandler(picturesCollection[i], photoArray[i]);
  }

  const cancel = document.querySelector('.big-picture__cancel');

  cancel.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if ((evt.keyCode === 27)  && !bigPicture.classList.contains('hidden')) {
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};

export {renderFullPicture};
