const DEFAULT_COUNT_COMMENTS = 5;
const bigPicture = document.querySelector('.big-picture');
const cancel = bigPicture.querySelector('.big-picture__cancel');
const commentsShowCount = bigPicture.querySelector('.comments-show');
const loadMoreButton = bigPicture.querySelector('.comments-loader');
const socialCommentsBlock = bigPicture.querySelector('.social__comments');
const commentsListFragment = document.createDocumentFragment();
let cardComments = [];
let counter = 0;

const renderBigPicture = (card) => {
  bigPicture.querySelector('.big-picture__img img').src = card.url;
  bigPicture.querySelector('.likes-count').textContent = card.likes;
  bigPicture.querySelector('.comments-count').textContent = card.comments.length;
  bigPicture.querySelector('.social__caption').textContent = card.description;
  loadMoreButton.classList.remove('hidden');

  counter = 0;
  cardComments = card.comments;

  renderCommentsForCard (cardComments, counter);

  socialCommentsBlock.innerHTML = '';
  socialCommentsBlock.appendChild(commentsListFragment);

};

const openBigPicture = (card) => {
  renderBigPicture(card);

  document.querySelector('body').classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
  document.addEventListener('keydown', onPopupEscKeydown);
  cancel.addEventListener('click', onClickCancel);
};

function closePopup () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  cancel.removeEventListener('click', onClickCancel);
  loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
}

function renderCommentsForCard (array, count) {
  for (let i = count; i < count + DEFAULT_COUNT_COMMENTS; i++) {
    if (i >= array.length - 1) {
      loadMoreButton.classList.add('hidden');
    }
    if (i >= array.length) {
      break;
    }

    const newComment = socialCommentsBlock.children[0].cloneNode(true);

    newComment.querySelector('.social__picture').src = array[i].avatar;
    newComment.querySelector('.social__picture').alt = array[i].name;
    newComment.querySelector('.social__text').textContent = array[i].message;

    commentsListFragment.appendChild(newComment);

    counter++;
    commentsShowCount.textContent = counter;
  }
}

function onLoadMoreButtonClick () {
  renderCommentsForCard (cardComments, counter);
  socialCommentsBlock.appendChild(commentsListFragment);
}

function onPopupEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
}

function onClickCancel () {
  closePopup ();
}

export {openBigPicture};
