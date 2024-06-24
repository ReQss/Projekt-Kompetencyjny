import React from "react";
import "./itemsSection.css";
import SearchBar from "../../components/search-bar/SearchBar";
import ItemsWrapper from "../../components/items-wrapper/ItemsWrapper";

/**
 * Komponent ItemsSection - sekcja zawierająca pasek wyszukiwania i listę przedmiotów.
 *
 * @component
 * @returns {JSX.Element}
 */
const ItemsSection = () => {
  return (
    <div className="items-section">
      <div className="items-section__right">
        <SearchBar />
        <ItemsWrapper />
      </div>
    </div>
  );
};

export default ItemsSection;
