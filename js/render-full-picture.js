const bigPicture = document.querySelector('.big-picture');
const cancel = bigPicture.querySelector('.big-picture__cancel');

const openBigPicture = (card) => {
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');  // временно
  bigPicture.querySelector('.comments-loader').classList.add('hidden');   // временно

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
