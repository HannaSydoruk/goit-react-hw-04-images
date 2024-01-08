import css from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ onClose, url }) => {
  useEffect(() => {
    const handleEscapeKey = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={css.overlay} onClick={onOverlayClick}>
      <div className={css.modal}>
        <img src={url} alt="" />
      </div>
    </div>
  );
};

export default Modal;
