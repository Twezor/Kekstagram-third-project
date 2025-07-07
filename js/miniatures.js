import {renderBigPicture, onModalEscapeKeywdown, bigPicture} from './render-fullPhoto';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const miniatures = document.createDocumentFragment();

const createMiniatures = (picturesData) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  picturesData.forEach(({id, url, description, likes, comments}) => {
    const minature = pictureTemplate.cloneNode(true);
    minature.querySelector('.picture__img').src = url;
    minature.querySelector('.picture__img').alt = description;
    minature.querySelector('.picture__likes').textContent = likes;
    minature.querySelector('.picture__comments').textContent = comments.length;
    minature.dataset.pictureId = id;

    miniatures.appendChild(minature);
  });

  picturesContainer.append(miniatures);

  picturesContainer.addEventListener('click', (evt) => {
    const currentDomPictureElement = evt.target.closest('.picture');

    if (currentDomPictureElement) {
      evt.preventDefault();
      const currentPicture = picturesData.find((picture) => picture.id === Number(currentDomPictureElement.dataset.pictureId));
      renderBigPicture(currentPicture);
      document.addEventListener('keydown', onModalEscapeKeywdown);
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  });
};

export {createMiniatures};
