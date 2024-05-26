import React, { useState } from "react";
import AnimeList from "../components/AnimeList";
import Search from "../components/Search";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/Login";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <Header onLoginClick={handleLoginClick} />
      {showLogin && <Login onClose={handleCloseLogin} />}
      <Search />
      <AnimeList />
      <Footer />
    </div>
  );
};

export default Home;
