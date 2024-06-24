import React from "react";
import "./header.css";
import bg from "../../assets/politechnika_bg.jpg";

/**
 * Komponent nagłówka wyświetlający obraz tła.
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
const Header = () => {
  return (
    <div className="header">
      <img src={bg} alt="Politechnika Background" />
    </div>
  );
};

export default Header;
