import css from './Button.module.css';

const Button = ({ onLoadMoreClick }) => {
  return (
    <button
      type="button"
      className={css['load-more-btn']}
      onClick={onLoadMoreClick}
    >
      Load more
    </button>
  );
};

export default Button;
