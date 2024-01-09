import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageSelected }) => {
  return (
    <ul className={css.gallery}>
      {images?.map(image => (
        <ImageGalleryItem
          key={image.id}
          url={image.smallImage}
          largeImageURL={image.largeImage}
          onImageSelected={onImageSelected}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
