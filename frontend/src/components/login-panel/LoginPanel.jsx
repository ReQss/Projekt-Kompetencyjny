import React from "react";
import "./loginPanel.css";
import logo from "../../assets/logo.png";
import Button from "../button/Button";

const LoginPanel = () => {
  return (
    <div className="login_panel">
      <form>
        <h1>Logowanie</h1>

        <a href="#" className="logo_holder">
          <img src={logo} alt="Logo" />
        </a>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Hasło" />
        <a href="#">Zapomniałeś hasła?</a>
        <Button>Zaloguj się</Button>
      </form>
    </div>
  );
};

export default LoginPanel;
