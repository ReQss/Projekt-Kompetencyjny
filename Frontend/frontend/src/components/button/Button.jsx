import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const Button = ({ children, onClick, className }) => {
  return (
    <button className={`btn ${className ? className : ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
