import React from "react";
import PropTypes from "prop-types";
import "./button.css";

/**
 * Komponent przycisku.
 *
 * @component
 * @example
 * const handleClick = () => console.log('Button clicked');
 * return (
 *   <Button onClick={handleClick} className="my-custom-class">
 *     Click Me
 *   </Button>
 * )
 */
const Button = ({ children, onClick, className }) => {
  return (
    <button className={`btn ${className ? className : ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  /**
   * Dzieci komponentu przycisku, które będą wyświetlane wewnątrz przycisku.
   */
  children: PropTypes.node.isRequired,

  /**
   * Funkcja obsługująca kliknięcie przycisku.
   */
  onClick: PropTypes.func,

  /**
   * Dodatkowa klasa CSS do nadania niestandardowego stylu.
   */
  className: PropTypes.string,
};

export default Button;
