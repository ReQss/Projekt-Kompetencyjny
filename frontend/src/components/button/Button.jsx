import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({ children, onClick }) => {
  return <button className="btn" onClick={onClick}>{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
