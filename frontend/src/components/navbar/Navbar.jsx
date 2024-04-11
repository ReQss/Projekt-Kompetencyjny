import React from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import Button from "../button/Button";

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="#">
        <img src={logo} alt="Logo" />
      </a>
      <Button> Zaloguj się </Button>
    </div>
  );
};

export default Navbar;
