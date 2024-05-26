import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ onLoginClick }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="logo" />
      </Link>
      <button onClick={onLoginClick} className="login-button">
        Login
      </button>
    </header>
  );
};

export default Header;
