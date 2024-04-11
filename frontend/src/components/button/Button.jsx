import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const Button = ({ children }) => {
  return <button className="btn">{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
