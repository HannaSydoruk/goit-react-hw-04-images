import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ onImageSelected, largeImageURL, url }) => {
  const onImgClickHandler = e => {
    onImageSelected(largeImageURL);
  };

  return (
    <li className={css['gallery-item']}>
      <img
        className={css['gallery-item-image']}
        src={url}
        alt=""
        onClick={onImgClickHandler}
      />
    </li>
  );
};

export default ImageGalleryItem;
