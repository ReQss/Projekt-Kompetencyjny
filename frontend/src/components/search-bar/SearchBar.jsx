import { useState } from 'react';
import './searchBar.css';
import Button from '../button/Button';
import { Link, useLocation } from 'react-router-dom';

const SearchBar = () => {
  const [showItems, setShowItems] = useState(false);

  const toggleItems = () => {
    setShowItems(!showItems);
  };

  const location = useLocation();
  const token = localStorage.getItem('token');

  return (
    <div className="search-bar">
      {/* <form>
        <input
          className="search-window"
          type="text"
          id="search"
          name="search"
          placeholder="Szukaj"
        />
      </form> */}
      {localStorage.getItem('token') === null ? (
            <></>
          ) : (
            location.pathname === '/modify' ? (
              <Link to="/">
                <Button> Wróć na stronę główną </Button>
              </Link>
            ) : (
              <>
                <Link to="/modify">
                  <Button> Modyfikuj </Button>
                </Link>
            </>
            )
          )}

      <Link to="/deletion-form">
        <Button> Usuń przedmiot </Button>
      </Link>


      <Link to="/rent-form">
        <Button> Wypożycz </Button>
      </Link>

      <Link to={"/history-form/"}>
        <Button>Historia wypożyczeń</Button>
      </Link>

      {/* <form className="sort-window">
        <label>Sortuj:</label>
        <button
          className="sort-window__btn sort-window__btn-first"
          type="button"
          onClick={toggleItems}
        >
          Pokaż/Ukryj elementy
        </button>
        {showItems && (
          <div className="sort-window__options">
            <button className="sort-window__btn">Element1</button>
            <button className="sort-window__btn">Element2</button>
            <button className="sort-window__btn">Element3</button>
            <button className="sort-window__btn">Element4</button>
          </div>
        )}
      </form> */}
    </div>
  );
};

export default SearchBar;
