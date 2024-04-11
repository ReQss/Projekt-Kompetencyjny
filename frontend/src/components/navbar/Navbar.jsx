import React from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import Button from "../button/Button";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="#">
        <img src={logo} alt="Logo" />
      </a>
      <Link to="/login"><Button> Zaloguj się </Button></Link>
    </div>
  );
};

export default Navbar;
