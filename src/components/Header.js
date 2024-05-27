import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ onLoginClick }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="logo" />
      </Link>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
        </ul>
      </nav>
      <button onClick={onLoginClick} className="login-button">
        Login
      </button>
    </header>
  );
};

export default Header;
