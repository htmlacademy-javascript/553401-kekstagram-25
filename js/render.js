const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderCards = (cardsArray) => {
  const pictureListFragment = document.createDocumentFragment();

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
