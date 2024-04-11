import React, { useState } from 'react';
import './searchBar.css';

const SearchBar = () => {
 const [showItems, setShowItems] = useState(false);

 const toggleItems = () => {
    setShowItems(!showItems);
 };

 return (
    <div className='search-bar'>
      <form>
        <input className='search-window'
          type="text"
          id="search"
          name="search"
          placeholder="Szukaj"
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <form className='sort-window'>
        <label>Sortuj:</label>
        <button className='sort-window__btn sort-window__btn-first' type="button" onClick={toggleItems}>Pokaż/Ukryj elementy</button>
        {showItems && (
          <div className='sort-window__options'>
            <button className='sort-window__btn'>Element1</button>
            <button className='sort-window__btn'>Element2</button>
            <button className='sort-window__btn'>Element3</button>
            <button className='sort-window__btn'>Element4</button>
          </div>
        )}
      </form>
    </div>
 );
}

export default SearchBar;
