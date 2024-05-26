import React from "react";
import Search from "./Search";
import AnimeList from "./AnimeList";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="logo">AnimeList</div>
        <button className="auth-button">Login</button>
      </div>
      <div className="search-container">
        <Search />
      </div>
      <div className="anime-list">
        <AnimeList />
      </div>
    </div>
  );
};

export default HomePage;
