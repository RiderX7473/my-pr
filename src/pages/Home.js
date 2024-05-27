import React, { useState } from "react";
import AnimeList from "../components/AnimeList";
import Search from "../components/Search";
import Footer from "../components/Footer";
import Wishlist from "../components/Wishlist";
import "./Home.css";

const Home = ({ onClose }) => {
  // Нет необходимости в showLogin и setShowLogin здесь, они управляются в App.js через prop
  return (
    <div>
      <Search />
      <AnimeList />
      <Footer />
    </div>
  );
};

export default Home;
