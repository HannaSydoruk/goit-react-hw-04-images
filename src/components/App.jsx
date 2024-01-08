import { useEffect, useState } from 'react';
import css from './App.module.css';
import * as Api from 'api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [status, setStatus] = useState('idle');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(0);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  useEffect(() => {
    async function getImages() {
      try {
        if (!searchValue) return;

        setStatus(_ => 'pending');

        const data = await Api.getImages(searchValue, currentPage);
        const images = data.hits.map(hit => {
          return {
            id: hit.id,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          };
        });
        setImages(prevState => [...prevState, ...images]);
        setStatus(_ => 'success');
        setTotal(_ => data.total);
      } catch (error) {
        setError(_ => error.message);
        setStatus(_ => 'error');
      }
    }
    getImages();
  }, [searchValue, currentPage]);

  const onSearchSubmit = async formData => {
    if (formData.searchValue.toLowerCase() === searchValue) {
      return alert('The query is the same. Change your query.');
    }
    setSearchValue(_ => formData.searchValue.toLowerCase());
    setImages(_ => []);
    setCurrentPage(_ => 1);
  };

  const onLoadMoreClick = async e => {
    setCurrentPage(prevState => prevState + 1);
  };

  const onImageSelected = image => {
    setLargeImage(_ => image);
    setShowModal(_ => true);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSearchSubmit} />
      {status === 'error' && <p>Something went wrong. {error}</p>}
      {(status === 'success' || status === 'pending') && (
        <ImageGallery images={images} onImageSelected={onImageSelected} />
      )}
      {status === 'pending' && <Loader />}
      {images?.length >= 12 && images?.length < total && (
        <Button onLoadMoreClick={onLoadMoreClick} />
      )}
      {showModal && <Modal url={largeImage} onClose={toggleModal} />}
    </div>
  );
};
