const DEFAULT_COUNT_COMMENTS = 5;
const bigPicture = document.querySelector('.big-picture');
const cancel = bigPicture.querySelector('.big-picture__cancel');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsShowCount = bigPicture.querySelector('.comments-show');
const commentsCount = bigPicture.querySelector('.comments-count');
const loadMoreButton = bigPicture.querySelector('.comments-loader');
let countCommentsForShow = DEFAULT_COUNT_COMMENTS;

const renderBigPicture = (card) => {
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

  countCommentsForShow = DEFAULT_COUNT_COMMENTS;
  commentsShowCount.textContent = countCommentsForShow;

  socialCommentsBlock.innerHTML = '';

  socialCommentsBlock.appendChild(commentsListFragment);
};

const openBigPicture = (card) => {
  renderBigPicture(card);

  const usersCommentsBlocks = document.querySelectorAll('.social__comment');

  showDefaultCountComments(usersCommentsBlocks);
  loadMoreButton.addEventListener('click', onShowMoreClick);

  document.querySelector('body').classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);
  cancel.addEventListener('click', onClickCancel);
};

function closePopup () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  cancel.removeEventListener('click', onClickCancel);
  loadMoreButton.removeEventListener('click', onShowMoreClick);
}

function showDefaultCountComments (commentBlocksCollection) {
  if (commentBlocksCollection.length <= DEFAULT_COUNT_COMMENTS) {
    commentCountBlock.classList.add('hidden');
    loadMoreButton.classList.add('hidden');
  } else {
    commentCountBlock.classList.remove('hidden');
    loadMoreButton.classList.remove('hidden');
    commentsCount.textContent = commentBlocksCollection.length;

    for (let i = DEFAULT_COUNT_COMMENTS; i < commentBlocksCollection.length; i++) {
      commentBlocksCollection[i].classList.add('hidden');
    }
  }
}

function onShowMoreClick () {
  const usersCommentsBlocks = document.querySelectorAll('.social__comment');

  for (let i = 0; i < DEFAULT_COUNT_COMMENTS; i++) {
    if (countCommentsForShow < usersCommentsBlocks.length) {
      usersCommentsBlocks[countCommentsForShow].classList.remove('hidden');
      countCommentsForShow++;

    } else {
      loadMoreButton.classList.add('hidden');
      break;
    }
  }

  commentsShowCount.textContent = countCommentsForShow;
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
