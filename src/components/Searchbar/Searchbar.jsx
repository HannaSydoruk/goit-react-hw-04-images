import css from './Searchbar.module.css';
import { ReactComponent as IconButton } from '../../icons/search-svgrepo-com.svg';

const Searchbar = ({ onSubmit }) => {
  const onSubmitHandler = e => {
    e.preventDefault();
    onSubmit({
      searchValue: e.currentTarget.elements.searchValue.value,
    });
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={onSubmitHandler} className={css.form}>
        <button type="submit" className={css.button}>
          <IconButton width="15" height="15" />
        </button>

        <input
          className={css.input}
          type="text"
          name="searchValue"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
